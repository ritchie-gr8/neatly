"use client";

import { useEffect, useState, useRef } from "react";
import AdminLayout from "@/layouts/admin.layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { SENDER } from "@/constants/chatbot";
import { useAdminChatbot } from "@/contexts/admin-chatbot-context";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase/client";
import api from "@/lib/axios";
import { toast } from "sonner";
import { normalizeSupabaseChatSession } from "@/lib/supabase/utils";

const ChatContent = () => {
  const {
    pendingSessions: sessions,
    loading,
    joinChat,
    leaveChat,
  } = useAdminChatbot();

  // Local state for session and messages
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [sessionLoading, setSessionLoading] = useState(false);

  const messageContainerRef = useRef(null);
  const messageSubscriptionRef = useRef(null);
  const router = useRouter();

  // Load session data from URL parameter
  // useEffect(() => {
  //   const { sessionId } = router.query;
  //   if (sessionId && !selectedSession) {
  //     async function fetchData() {
  //       const session = await fetchSessionData(sessionId);
  //       console.log("Session data:", session);
  //       handleJoinChat(session);
  //     }

  //     fetchData();
  //   }
  // }, []);

  // Fetch session data and messages
  const fetchSessionData = async (sessionId) => {
    try {
      setSessionLoading(true);
      const response = await api.get(`/chat/sessions/${sessionId}`);

      if (response.data.success) {
        const normalizedSession = normalizeSupabaseChatSession(
          response.data.session
        );
        setSelectedSession(normalizedSession);
        fetchMessages(sessionId);
        setupMessageSubscription(normalizedSession);
        // return normalizedSession;
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
      toast({
        title: "Error",
        description: "Failed to load chat session",
        variant: "destructive",
      });
    } finally {
      setSessionLoading(false);
    }
  };

  const fetchMessages = async (sessionId) => {
    try {
      const response = await api.get(`/chat/messages?sessionId=${sessionId}`);
      if (response.data.success) {
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const setupMessageSubscription = (session) => {
    // Unsubscribe from any existing subscription
    if (messageSubscriptionRef.current) {
      messageSubscriptionRef.current.unsubscribe();
    }

    // Set up message subscription
    const channel = supabase
      .channel(session.sessionId)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ChatMessages",
          filter: `session_id=eq.${session.id}`,
        },
        (payload) => {
          if (!payload.new) return;
          if (payload.new.sender === SENDER.ADMIN) return;

          const newMessage = {
            id: payload.new.chat_message_id,
            content: payload.new.content,
            sender: payload.new.sender,
            timestamp: payload.new.timestamp,
          };

          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    messageSubscriptionRef.current = channel;
  };

  useEffect(() => {
    return () => {
      if (messageSubscriptionRef.current) {
        messageSubscriptionRef.current.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (messageContainerRef.current && messages.length > 0) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedSession) return;

    const newMessage = {
      content: messageInput,
      sender: SENDER.ADMIN,
      timestamp: new Date().toISOString(),
    };

    // Optimistically add to UI
    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");

    try {
      await api.post("/chat/messages", {
        sessionId: selectedSession.sessionId,
        content: messageInput,
        sender: SENDER.ADMIN,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      // Remove the message from UI if it failed to send
      setMessages((prev) => prev.filter((msg) => msg !== newMessage));
    }
  };

  const handleJoinChat = async (session) => {
    try {
      // Use context method to join chat (only updates notification state)
      await joinChat(session);

      // Update local state
      setSelectedSession(session);
      fetchMessages(session.sessionId);
      setupMessageSubscription(session);

      // Update URL
      router.push(`/admin/chat?sessionId=${session.sessionId}`, undefined, {
        shallow: true,
      });
    } catch (error) {
      console.error("Error joining chat:", error);
      toast({
        title: "Error",
        description: "Failed to join chat session",
        variant: "destructive",
      });
    }
  };

  const handleLeaveChat = async () => {
    if (!selectedSession) return;
    try {
      await api.post(`/chat/messages`, {
        sessionId: selectedSession.sessionId,
        content: "Admin has left the chat.",
        sender: SENDER.ADMIN,
      });

      await leaveChat(selectedSession);

      if (messageSubscriptionRef.current) {
        messageSubscriptionRef.current.unsubscribe();
        messageSubscriptionRef.current = null;
      }

      router.push("/admin/chat", undefined, { shallow: true });

      setSelectedSession(null);
      setMessages([]);
    } catch (error) {
      console.error("Error leaving chat:", error);
      toast({
        title: "Error",
        description: "Failed to leave chat session",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b border-brown-300 px-16 py-4 bg-util-white">
        <h5 className="text-h5 font-semibold text-gray-900">Chat Support</h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-16 pt-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="p-4 text-center">Loading...</div>
            ) : sessions.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No active sessions requiring assistance
              </div>
            ) : (
              <div className="space-y-2">
                {sessions.map((session) => (
                  <div
                    key={session.sessionId}
                    className={`p-3 rounded-md cursor-pointer hover:bg-gray-100 ${
                      selectedSession?.sessionId === session.sessionId
                        ? "bg-gray-100 border-l-4 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleJoinChat(session)}
                  >
                    <div className="font-medium line-clamp-2">
                      {session?.user
                        ? session?.user?.firstName +
                          " " +
                          session?.user?.lastName
                        : "Guest " + session.sessionId}
                    </div>
                    <div className="text-sm text-gray-500">
                      Last activity:{" "}
                      {new Date(session.lastMessageAt).toLocaleString()}
                    </div>
                    {router.query.sessionId === session?.sessionId && !selectedSession && (
                        <div className="mt-1 text-xs inline-block px-2 py-1 bg-red-100 text-red-800 rounded-full">
                          Needs assistance
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {selectedSession
                    ? selectedSession?.user
                      ? selectedSession?.user?.firstName +
                        " " +
                        selectedSession?.user?.lastName
                      : "Guest " + selectedSession.sessionId
                    : null}
                  <div className="text-sm text-gray-500 mt-1">
                    {selectedSession && selectedSession.handoffReason}
                  </div>
                </div>
                {selectedSession && (
                  <Button
                    size="sm"
                    onClick={handleLeaveChat}
                    className="btn-outline"
                  >
                    Close Chat
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedSession ? (
              <>
                <div
                  className="h-96 overflow-y-auto mb-4 p-4 border rounded-md space-y-4"
                  ref={messageContainerRef}
                >
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500">
                      No messages yet
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.sender === SENDER.ADMIN
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.sender === SENDER.ADMIN
                              ? "bg-blue-500 text-white"
                              : message.sender === SENDER.BOT
                              ? "bg-gray-200 text-gray-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <div className="break-words">{message.content}</div>
                          <div className="flex justify-end mt-1">
                            <div
                              className={`text-xs ${
                                message.sender === SENDER.ADMIN
                                  ? "text-blue-200"
                                  : "text-gray-500"
                              }`}
                            >
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 mr-2"
                  />
                  <Button
                    className="rounded-full bg-inherit h-8 w-8 flex items-center justify-center cursor-pointer shadow-none group hover:bg-orange-500"
                    onClick={handleSendMessage}
                  >
                    <Send
                      size={16}
                      className="text-orange-500 fill-orange-500 group-hover:text-util-white"
                    />
                  </Button>
                </div>
              </>
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-500">
                Select a session to start chatting
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ChatPage = () => {
  return (
    <AdminLayout>
      <ChatContent />
    </AdminLayout>
  );
};

export default ChatPage;
