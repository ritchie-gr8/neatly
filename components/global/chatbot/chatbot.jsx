"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, X } from "lucide-react";
import dynamic from "next/dynamic";
import api from "@/lib/axios";
import getBotResponseForTopic from "@/lib/chatbot-response";
import useClickOutside from "@/hooks/useClickOutside";
import { useAuth } from "@/hooks/useAuth";
import ChatStorageService from "@/lib/chat-storage";
import { REPLY_FORMAT, SENDER } from "@/constants/chatbot";
import HandoffButton from "./handoff-button";
import { cn } from "@/lib/utils";
import supabase from "@/lib/supabase/client";

const ChatbotPopup = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [greetingMessage, setGreetingMessage] = useState("");
  const [autoReplyMessage, setAutoReplyMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isShowHandoff, setIsShowHandoff] = useState(false);
  const [handoffSessionId, setHandoffSessionId] = useState(null);
  const chatWrapperRef = useRef(null);
  const chatContainerRef = useRef(null);
  const chatStorageRef = useRef(null);
  const sessionSubscriptionRef = useRef(null);
  const realtimeSubscriptionRef = useRef(null);
  useClickOutside(chatWrapperRef, () => setIsOpen(false));

  const { user } = useAuth();

  const processMessage = (message) => {
    try {
      const isJson =
        typeof message.content === "string" &&
        message.content.startsWith("{") &&
        message.content.endsWith("}");

      if (isJson) {
        const parsedContent = JSON.parse(message.content);
        const componentType = parsedContent.componentType;

        let component;
        if (componentType === "ROOMTYPES") {
          const RoomTypeMessage = dynamic(() => import("./room-type-message"), {
            loading: () => (
              <div className="p-2">Loading room information...</div>
            ),
          });

          component = <RoomTypeMessage data={parsedContent.content} />;
        } else if (componentType === "OPTIONS") {
          const OptionsMessage = dynamic(() => import("./options-message"), {
            loading: () => <div className="p-2">Loading options...</div>,
          });

          const handleOptionSelect = (optionText, detailsText) => {
            addMessage(SENDER.USER, optionText);
            addMessage(SENDER.BOT, detailsText);
          };

          component = (
            <OptionsMessage
              data={parsedContent.content}
              onOptionSelect={handleOptionSelect}
            />
          );
        }

        return {
          content: parsedContent.text,
          componentType: parsedContent.componentType,
          component,
          sender: message.sender,
          timestamp: message.timestamp,
        };
      } else {
        return {
          content: message.content,
          sender: message.sender,
          timestamp: message.timestamp,
        };
      }
    } catch (e) {
      return {
        content: message.content,
      };
    }
  };

  useEffect(() => {
    const initializeChat = async () => {
      try {
        chatStorageRef.current = ChatStorageService.getInstance();

        // Set user first, this will reset session if user just logged in
        if (user) {
          chatStorageRef.current.setUser(user.id);
        }

        await chatStorageRef.current.initializeSession();
        const loadedMessages = await chatStorageRef.current.loadMessages();

        if (loadedMessages?.length > 0) {
          const processedMessages = loadedMessages.map(processMessage);
          setMessages(processedMessages);
        } else {
          // Reset messages if no loaded messages (fresh user session)
          setMessages([]);
        }

        if (chatStorageRef.current.sessionId) {
          // Clean up existing subscription if any
          if (sessionSubscriptionRef.current) {
            sessionSubscriptionRef.current.unsubscribe();
          }

          // Create new subscription
          sessionSubscriptionRef.current = sessionSubscription(
            chatStorageRef.current.sessionId
          );
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();
  }, [user]);

  const toggleChat = () => {
    const opening = !isOpen;

    // If opening and no messages, add greeting
    if (messages.length === 0 && opening) {
      addMessage(SENDER.BOT, greetingMessage);
    }

    if (opening) {
      setIsOpen(true);
      requestAnimationFrame(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      });
    } else {
      setIsOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTopicClick = async (topic) => {
    addMessage(SENDER.USER, topic);
    setIsTyping(true);

    setTimeout(async () => {
      try {
        const response = await getBotResponseForTopic(topic);

        if (!response) {
          addMessage(SENDER.BOT, autoReplyMessage);
        } else {
          handleBotResponse(response);
        }
      } catch (error) {
        console.error("Error getting bot response:", error);
        addMessage(
          SENDER.BOT,
          "Sorry, I encountered an error. Please try again later."
        );
      } finally {
        setIsTyping(false);
      }
    }, 800);
  };

  const handleSendMessage = async () => {
    const trimmedMessage = inputValue.trim();
    if (trimmedMessage === "") return;
    if (isShowHandoff) {
      setIsShowHandoff(false);
    }

    addMessage(SENDER.USER, trimmedMessage);
    setInputValue("");

    // console.log("handoffSessionId", handoffSessionId);
    if (handoffSessionId) return;

    setIsTyping(true);

    try {
      const { data } = await api.post("/chatbot/intents", {
        message: trimmedMessage,
      });
      const intent = data.intent;

      const botResponse = await getBotResponseForTopic(intent);
      if (!botResponse) {
        addMessage(SENDER.BOT, autoReplyMessage);
        setIsShowHandoff(true);
      } else {
        handleBotResponse(botResponse);
      }
    } catch (error) {
      console.error("Error getting bot response:", error);

      if (error.response?.status === 429) {
        addMessage(
          SENDER.BOT,
          "I'm receiving too many requests right now. Please try again in a moment."
        );
      } else {
        addMessage(
          SENDER.BOT,
          "Sorry, I encountered an error. Please try again later or contact support."
        );
        setIsShowHandoff(true);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleBotResponse = (response) => {
    const { type, success, data } = response;

    if (!success) {
      addMessage(SENDER.BOT, "I don't have information about that yet.");
      return;
    }

    if (type === "MESSAGE") {
      addMessage(SENDER.BOT, data.message);
    } else if (type === "ROOMTYPES") {
      // Create room type component
      const RoomTypeMessage = dynamic(() => import("./room-type-message"), {
        loading: () => <div className="p-2">Loading room information...</div>,
      });

      const component = <RoomTypeMessage data={data} />;

      addComponentMessage(SENDER.BOT, data, "ROOMTYPES", component);
    } else if (type === "OPTIONS") {
      // Create options component
      const OptionsMessage = dynamic(() => import("./options-message"), {
        loading: () => <div className="p-2">Loading options...</div>,
      });

      const handleOptionSelect = (optionText, detailsText) => {
        addMessage(SENDER.USER, optionText);
        addMessage(SENDER.BOT, detailsText);
      };

      const component = (
        <OptionsMessage data={data} onOptionSelect={handleOptionSelect} />
      );

      addComponentMessage(SENDER.BOT, data, "OPTIONS", component);
    } else {
      addMessage(
        SENDER.BOT,
        "I have information about that, but I'm still learning how to display it properly."
      );
    }
  };

  const addMessage = async (sender, content) => {
    const newMessage = {
      sender,
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);

    await chatStorageRef.current.saveMessage({
      content,
      sender: sender.toUpperCase(),
      componentType: REPLY_FORMAT.MESSAGE,
    });
  };

  const addComponentMessage = async (
    sender,
    content,
    componentType,
    component
  ) => {
    const newMessage = {
      sender,
      content,
      componentType,
      component,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);

    if (componentType === REPLY_FORMAT.HANDOFF) return;

    await chatStorageRef.current.saveMessage({
      content,
      sender: sender.toUpperCase(),
      componentType,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const realtimeSubscription = (channelName, id) => {
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ChatMessages",
          filter: `session_id=eq.${id}`,
        },
        (payload) => {
          if (payload.new.sender === SENDER.USER) return;

          const newMessage = {
            id: payload.new.chat_message_id,
            content: payload.new.content,
            sender: payload.new.sender,
            timestamp: payload.new.timestamp,
          };

          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe((status) => {
        if (status !== "SUBSCRIBED") return;
      });

    return channel;
  };

  const sessionSubscription = (sessionId) => {
    const channel = supabase
      .channel(`session_${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ChatSessions",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.new.handoff_reason === "ADMIN_LEFT") {
            setHandoffSessionId(null);
          }
        }
      )
      .subscribe((status) => {
        if (status !== "SUBSCRIBED") return;
      });

    return channel;
  };

  const handleHandOffRequest = async () => {
    try {
      // Show message to user that help is on the way
      addMessage(
        SENDER.BOT,
        "I've requested assistance from our team. An admin will join this conversation shortly."
      );

      // Hide the handoff button
      setIsShowHandoff(false);

      // Make the actual API call to request handoff
      const response = await api.post("/chat/handoff", {
        sessionId: chatStorageRef.current.sessionId,
        reason: "User requested assistance via chatbot",
      });
      setHandoffSessionId(response.data.id);
    } catch (error) {
      console.error("Error handling handoff request:", error);
      addMessage(
        SENDER.BOT,
        "I'm sorry, I couldn't connect you with our team right now. Please try again later."
      );
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get("/chatbot/response/message");
        const { success, greetingMessage, autoReplyMessage } = response.data;

        if (success) {
          setGreetingMessage(greetingMessage);
          setAutoReplyMessage(autoReplyMessage);
        }
      } catch (error) {
        console.error("Error fetching chatbot messages:", error.message);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current && messages.length > 0) {
      requestAnimationFrame(() => {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      });
    }
  }, [messages]);

  useEffect(() => {
    if (!handoffSessionId) return;
    const channel = realtimeSubscription(
      chatStorageRef.current.sessionId,
      handoffSessionId
    );
    realtimeSubscriptionRef.current = channel;

    return () => {
      realtimeSubscriptionRef.current?.unsubscribe();
    };
  }, [handoffSessionId]);

  useEffect(() => {
    return () => {
      if (realtimeSubscriptionRef.current) {
        realtimeSubscriptionRef.current.unsubscribe();
      }

      if (sessionSubscriptionRef.current) {
        sessionSubscriptionRef.current.unsubscribe();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-12 right-6 z-50" ref={chatWrapperRef}>
      {isOpen && (
        <Card className="mb-4 w-80 shadow-lg rounded-lg overflow-hidden bg-white py-0 gap-0">
          {/* Header */}
          <div className="bg-gray-100 p-4 flex items-center gap-2 border-b">
            <div className="bg-green-100 rounded-lg p-1">
              <Image
                src="/images/chatbot-icon.png"
                alt="Neatly Assistant"
                width={24}
                height={24}
                className="text-white"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">Neatly Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="rounded-full h-8 w-8 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat content */}
          <div
            className="h-96 overflow-y-auto overflow-x-hidden p-4 bg-util-bg"
            ref={chatContainerRef}
          >
            {user?.id ? (
              <div className="flex justify-start text-xs text-gray-600 mb-2">
                <p>Your previous conversation will be stored for 30 days.</p>
              </div>
            ) : (
              <div className="flex justify-start text-xs text-gray-600 mb-2">
                <p>The system will not store your previous conversation.</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={`${message.timestamp}_${index}`}
                className={`flex ${
                  message.sender === SENDER.USER
                    ? "justify-end"
                    : "justify-start"
                } mb-4`}
              >
                <div
                  className={cn(
                    "rounded-lg p-3 max-w-xs md:max-w-md lg:max-w-lg",
                    {
                      "bg-orange-600 text-white rounded-tr-none max-w-2/3":
                        message.sender === SENDER.USER,
                      "bg-util-white text-gray-700 rounded-tl-none max-w-2/3":
                        message.sender === SENDER.BOT,
                      "bg-green-500 text-white rounded-tl-none max-w-2/3":
                        message.sender === SENDER.ADMIN,
                    }
                  )}
                >
                  {message.component ? (
                    message.component
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isShowHandoff && (
              <div className="flex justify-start">
                <HandoffButton
                  onClick={() => {
                    handleHandOffRequest();
                  }}
                />
              </div>
            )}
            {isTyping && (
              <div className="flex justify-start">
                <TypingIndicator />
              </div>
            )}

            {/* Topic buttons only shown with first message */}
            {/* {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant="outline"
                  className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 h-auto border border-gray-200 cursor-pointer"
                  onClick={() => handleTopicClick("Room Types")}
                >
                  Room Types
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 h-auto border border-gray-200 cursor-pointer"
                  onClick={() => handleTopicClick("Booking")}
                >
                  Booking
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 h-auto border border-gray-200 cursor-pointer"
                  onClick={() => handleTopicClick("Check-in & Check-out Time")}
                >
                  Check-in & Check-out Time
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 h-auto border border-gray-200 cursor-pointer"
                  onClick={() => handleTopicClick("Payment Methods")}
                >
                  Payment Methods
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 h-auto border border-gray-200 cursor-pointer"
                  onClick={() => handleTopicClick("Promotion")}
                >
                  Promotion
                </Button>
              </div>
            )} */}
          </div>

          {/* Input area */}
          <div className="p-3 border-t flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write your message"
                className="w-full rounded-full py-2 px-4 bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
            </div>
            <Button
              size="icon"
              className="rounded-full bg-inherit h-8 w-8 flex items-center justify-center cursor-pointer shadow-none group hover:bg-orange-500"
              onClick={handleSendMessage}
            >
              <Send
                size={16}
                className="text-orange-500 fill-orange-500 group-hover:text-util-white"
              />
            </Button>
          </div>
        </Card>
      )}

      {/* Chat bubble button */}
      <div
        onClick={toggleChat}
        className="group size-16 bg-green-100 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-green-700 hover:text-util-white transition-colors justify-self-end"
      >
        {!isOpen ? (
          <Image
            src="/images/chatbot-icon.png"
            alt="chatbot"
            width={48}
            height={48}
          />
        ) : (
          <X className="h-6 w-6 text-green-700 group-hover:text-green-100" />
        )}
      </div>
    </div>
  );
};

export default ChatbotPopup;

const TypingIndicator = () => (
  <div className="flex space-x-1 items-center justify-start mb-4 ml-1">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      ></div>
    ))}
  </div>
);
