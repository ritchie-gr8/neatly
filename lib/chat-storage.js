import api from "./axios";
import { REPLY_FORMAT } from "@/constants/chatbot";
import supabase from "./supabase/client";

class ChatStorageService {
  static instance = new ChatStorageService();
  sessionId = null;
  userId = null;

  constructor() {
    // Don't initialize sessionId in constructor anymore
    // Let it be handled when user state is known
  }

  static getInstance() {
    if (!ChatStorageService.instance) {
      ChatStorageService.instance = new ChatStorageService();
    }
    return ChatStorageService.instance;
  }

  setUser(userId) {
    const previousUserId = this.userId;
    this.userId = userId;

    // If user just logged in (changed from null to actual userId)
    // Reset session to get/create user-specific session
    if (previousUserId === null && userId) {
      this.sessionId = null;
      this.clearLocalStorageSession();
    }
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;
  }

  getStorageKey() {
    // Use different storage keys for logged-in vs guest users
    return this.userId
      ? `neatly_chatbot_session_user_${this.userId}`
      : "neatly_chatbot_session_guest";
  }

  initializeSessionId() {
    if (this.sessionId) return this.sessionId;

    if (typeof window === "undefined") {
      this.sessionId = this.generateSessionId();
      return this.sessionId;
    }

    const storageKey = this.getStorageKey();
    const existingSessionId = localStorage.getItem(storageKey);

    if (existingSessionId) {
      this.sessionId = existingSessionId;
    } else {
      this.sessionId = this.generateSessionId();
      localStorage.setItem(storageKey, this.sessionId);
    }

    return this.sessionId;
  }

  clearLocalStorageSession() {
    if (typeof window === "undefined") return;

    // Clear both guest and user sessions to be safe
    localStorage.removeItem("neatly_chatbot_session_guest");
    if (this.userId) {
      localStorage.removeItem(`neatly_chatbot_session_user_${this.userId}`);
    }
    localStorage.removeItem("neatly_chatbot_messages");
  }

  saveToLocalStorage(messages) {
    if (typeof window === "undefined") return;

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
    if (typeof window === "undefined") return [];

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
    // Ensure sessionId is initialized
    if (!this.sessionId) {
      this.initializeSessionId();
    }

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

    try {
      // console.log("Saving message to database:", {
      //   sessionId: this.sessionId,
      //   content: fullMessage.content,
      //   sender: fullMessage.sender,
      //   userId: this.userId || null,
      // });

      const response = await api.post("/chat/messages", {
        sessionId: this.sessionId,
        content: fullMessage.content,
        sender: fullMessage.sender,
        userId: this.userId || null,
      });

      // console.log("Message saved to database:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to save message to database:", error);

      // console.log("Falling back to local storage");
      const messages = this.loadFromLocalStorage();
      messages.push(fullMessage);
      this.saveToLocalStorage(messages);

      return { success: false, error: error.message };
    }
  }

  async loadMessages() {
    // Ensure sessionId is initialized
    if (!this.sessionId) {
      this.initializeSessionId();
    }

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
        // First, try to get existing active session for logged-in user
        const existingSessionRes = await api.get(
          `/chat/sessions/user/${this.userId}`
        );
        // console.log("Existing session:", existingSessionRes.data);

        if (existingSessionRes.data.session) {
          // User has existing active session, use it
          this.sessionId = existingSessionRes.data.session.sessionId;

          // Update localStorage with the existing session
          if (typeof window !== "undefined") {
            const storageKey = this.getStorageKey();
            localStorage.setItem(storageKey, this.sessionId);
          }

          return existingSessionRes.data.session;
        }
      } catch (error) {
        // If no existing session found, create new one
        console.log("No existing active session found, creating new one");
      }
    }

    // Ensure sessionId is initialized (for guests or when no existing session)
    if (!this.sessionId) {
      this.initializeSessionId();
    }

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

  async fetchSessionId() {
    if (this.userId) {
      try {
        const res = await api.get(`/chat/sessions/user/${this.userId}`);
        return res.data.sessionId;
      } catch (error) {
        console.error("Failed to fetch session:", error);
        throw error;
      }
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
    if (!this.sessionId) {
      this.initializeSessionId();
    }

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
    if (!this.sessionId) {
      this.initializeSessionId();
    }

    const channel = supabase
      .channel(`session-${this.sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "ChatSessions",
          filter: `sessionId=eq.${this.sessionId}`,
        },
        (payload) => {
          if (!payload.new) {
            return;
          }

          const dbSession = payload.new;
          const session = {
            needsHandoff: dbSession.needs_handoff,
            adminJoined: dbSession.admin_joined,
            adminId: dbSession.admin_id,
          };

          callback(session);
        }
      )
      .subscribe();

    return () => {
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
