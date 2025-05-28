import api from "./axios";
import { REPLY_FORMAT } from "@/constants/chatbot";
import supabase from "./supabase/client";


class ChatStorageService {
  static instance = new ChatStorageService();
  sessionId = null;
  userId = null;

  constructor() {
    if (typeof window !== "undefined") {
      const existingSessionId = localStorage.getItem(
        "neatly_chatbot_session_id"
      );

      if (existingSessionId) {
        this.sessionId = existingSessionId;
      } else {
        this.sessionId = this.generateSessionId();
        localStorage.setItem("neatly_chatbot_session_id", this.sessionId);
      }
    } else {
      this.sessionId = this.generateSessionId();
    }
  }

  static getInstance() {
    if (!ChatStorageService.instance) {
      ChatStorageService.instance = new ChatStorageService();
    }
    return ChatStorageService.instance;
  }

  setUser(userId) {
    this.userId = userId;
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;
  }

  saveToLocalStorage(messages) {
    if (typeof window === "undefined") return; // Skip on server

    try {
      const chatData = {
        sessionId: this.sessionId,
        messages,
        lastUpdated: Date.now(),
      };
      localStorage.setItem("neatly_chatbot_messages", JSON.stringify(chatData));
    } catch (error) {
      console.warn("Failed to save to session storage:", error);
    }
  }

  loadFromLocalStorage() {
    if (typeof window === "undefined") return []; // Skip on server

    try {
      const stored = localStorage.getItem("neatly_chatbot_messages");
      if (!stored) return [];
      const chatData = JSON.parse(stored);
      return chatData.messages || [];
    } catch (error) {
      console.warn("Failed to load from session storage:", error);
      return [];
    }
  }

  async saveMessage(message) {
    console.log("ChatStorageService.saveMessage:", message);

    const fullMessage = {
      ...message,
      sessionId: this.sessionId,
      content:
        message.componentType === REPLY_FORMAT.MESSAGE
          ? message.content
          : JSON.stringify({
              content: message.content,
              componentType: message.componentType,
            }),
    };

    // Always try to save to database first, regardless of user login status
    try {
      console.log("Saving message to database:", {
        sessionId: this.sessionId,
        content: fullMessage.content,
        sender: fullMessage.sender,
        userId: this.userId || null,
      });

      const response = await api.post("/chat/messages", {
        sessionId: this.sessionId,
        content: fullMessage.content,
        sender: fullMessage.sender,
        userId: this.userId || null,
      });

      console.log("Message saved to database:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to save message to database:", error);

      // Fallback to local storage
      console.log("Falling back to local storage");
      const messages = this.loadFromLocalStorage();
      messages.push(fullMessage);
      this.saveToLocalStorage(messages);

      return { success: false, error: error.message };
    }
  }

  async loadMessages() {
    if (this.userId) {
      try {
        const res = await api.get(`/chat/messages?sessionId=${this.sessionId}`);
        return res.data.messages || [];
      } catch (error) {
        console.error("Failed to load messages from database:", error);
        return [];
      }
    } else {
      return this.loadFromLocalStorage();
    }
  }

  async initializeSession() {
    if (this.userId) {
      try {
        const res = await api.post("/chat/sessions", {
          sessionId: this.sessionId,
          userId: this.userId,
        });
        return res.data.session;
      } catch (error) {
        console.error("Failed to initialize session:", error);
        throw error;
      }
    } else {
      return {
        sessionId: this.sessionId,
        isActive: true,
        needsHandoff: false,
        adminJoined: false,
      };
    }
  }

  async requestHandoff(reason) {
    if (!this.userId) return;
    try {
      await api.post(`/chat/handoff`, {
        sessionId: this.sessionId,
        reason,
      });
    } catch (error) {
      console.error("Failed to request handoff:", error);
      throw error;
    }
  }

  subscribeToMessage(callback) {
    const channel = supabase
      .channel(`chat-${this.sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ChatMessages",
          filter: `session_id=eq.${this.sessionId}`,
        },
        (payload) => {
          const dbMessage = payload.new;
          const message = {
            id: dbMessage.chat_message_id,
            content: dbMessage.content,
            sender: dbMessage.sender,
            timestamp: new Date(dbMessage.timestamp).getTime(),
            sessionId: this.sessionId,
          };
          callback(message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  subscribeToSession(callback) {
    console.log("Setting up session subscription for:", this.sessionId);

    // Create a channel with consistent naming
    const channel = supabase
      .channel(`session-${this.sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "ChatSessions",
          // Use sessionId (string) instead of numeric ID
          filter: `sessionId=eq.${this.sessionId}`,
        },
        (payload) => {
          console.log("Session update received:", payload);

          if (!payload.new) {
            console.error("Invalid session update payload:", payload);
            return;
          }

          // Convert snake_case to camelCase for consistency
          const dbSession = payload.new;
          const session = {
            needsHandoff: dbSession.needs_handoff,
            adminJoined: dbSession.admin_joined,
            adminId: dbSession.admin_id,
          };

          console.log("Notifying about session update:", session);
          callback(session);
        }
      )
      .subscribe();

    console.log("Session subscription set up successfully");

    // Return unsubscribe function
    return () => {
      console.log("Removing session subscription");
      supabase.removeChannel(channel);
    };
  }

  clearMessages() {
    try {
      sessionStorage.removeItem("neatly_chatbot_messages");
    } catch (error) {
      console.warn("Failed to clear session storage:", error);
    }
  }
}

export default ChatStorageService;
