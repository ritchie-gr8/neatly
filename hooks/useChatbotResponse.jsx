import { ChatbotResponseContext } from "@/contexts/chatbot-response-context";
import { useContext } from "react";

export function useChatbotResponse() {
  return useContext(ChatbotResponseContext);
}
