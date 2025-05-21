"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Send } from "lucide-react";
import api from "@/lib/axios";
import getBotResponseForTopic from "@/lib/chatbot-response";

const ChatbotPopup = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [greetingMessage, setGreetingMessage] = useState("")
  const [autoReplyMessage, setAutoReplyMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);

  const toggleChat = () => {
    if (messages.length === 0) {
      addMessage("bot", greetingMessage);
    }

    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTopicClick = (topic) => {
    addMessage("user", topic);
    setIsTyping(true);

    setTimeout(() => {
      const response =
        getBotResponseForTopic(topic) || "Hello! How can I help you today?";
      addMessage("bot", response);
      setIsTyping(false);
    }, 800);
  };

  const handleSendMessage = async () => {
    const trimmedMessage = inputValue.trim();
    if (trimmedMessage === "") return;

    addMessage("user", trimmedMessage);
    setInputValue("");
    setIsTyping(true);

    try {
      console.log("Getting intent...");
      const { data } = await api.post("/intents", {
        message: trimmedMessage,
      });
      const intent = data.intent;
      console.log("User Intent:", intent);
      const botResponse = getBotResponseForTopic(intent);
      if (!botResponse) {
        addMessage("bot", autoReplyMessage);
      } else {
        addMessage("bot", botResponse);
      }
    } catch (error) {
      console.error("Error getting bot response:", error);

      if (error.response?.status === 429) {
        addMessage(
          "bot",
          "I'm receiving too many requests right now. Please try again in a moment."
        );
      } else {
        addMessage(
          "bot",
          "Sorry, I encountered an error. Please try again later."
        );
      }
    } finally {
      setIsTyping(false);
    }
  };

  const addMessage = (type, content) => {
    setMessages((prev) => [...prev, { type, content }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get("/admin/chatbot/message");
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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
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
            className="h-96 overflow-y-auto p-4 bg-gray-50"
            ref={chatContainerRef}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow-sm max-w-[85%] ${
                    message.type === "user"
                      ? "bg-orange-600 text-util-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <TypingIndicator />
              </div>
            )}

            {/* Topic buttons only shown with first message */}
            {messages.length === 1 && (
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
            )}
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
