import { createContext, useContext, useState, useEffect, useRef } from "react";
import supabase from "@/lib/supabase/client";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { normalizeSupabaseChatSession } from "@/lib/supabase/utils";
import { SENDER } from "@/constants/chatbot";
import { ArrowRight, ChevronRight } from "lucide-react";

const AdminChatbotContext = createContext(null);

export const AdminChatbotProvider = ({ children }) => {
  const [pendingSessions, setPendingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabaseSubscriptionRef = useRef(null);
  const { user } = useAuth();
  const router = useRouter();
  const recentNotifications = useRef(new Set());

  useEffect(() => {
    const fetchPendingSessions = async () => {
      try {
        const response = await api.get("/chat/sessions?needsHandoff=true");
        if (response.data.success) {
          setPendingSessions(response.data.sessions || []);
        }
      } catch (error) {
        console.error("Error fetching pending sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "ADMIN") {
      fetchPendingSessions();
      setupSessionSubscription();
    }

    return () => {
      if (supabaseSubscriptionRef.current) {
        supabaseSubscriptionRef.current.unsubscribe();
      }
    };
  }, [user]);

  const setupSessionSubscription = () => {
    const channel = supabase
      .channel("admin_sessions")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ChatSessions",
          filter: "needs_handoff=eq.true",
        },
        (payload) => {
          handleSessionChange(payload);
        }
      )
      .subscribe((status) => {});

    supabaseSubscriptionRef.current = channel;
  };

  const handleSessionChange = (payload) => {
    if (
      payload.eventType === "UPDATE" &&
      payload.new.admin_id === null &&
      payload.new.needs_handoff === true
    ) {
      const normalizedSession = normalizeSupabaseChatSession(payload.new);
      setPendingSessions((prev) => {
        const exists = prev.some(
          (session) => session.id === normalizedSession.id
        );
        if (!exists) {
          notifyNewHandoffRequest(normalizedSession);
          return [...prev, normalizedSession];
        }
        return prev;
      });
    }

    if (
      payload.eventType === "UPDATE" &&
      payload.old.needs_handoff === true &&
      payload.new.needs_handoff === false
    ) {
      const normalizedSession = normalizeSupabaseChatSession(payload.new);
      setPendingSessions((prev) =>
        prev.filter((session) => session.id !== normalizedSession.id)
      );
    }
  };

  const notifyNewHandoffRequest = (session) => {
    if (recentNotifications.current.has(session.sessionId)) {
      return;
    }

    recentNotifications.current.add(session.sessionId);
    setTimeout(() => {
      recentNotifications.current.delete(session.sessionId);
    }, 2000);

    const userInfo = session.user
      ? `${session.user.firstName} ${session.user.lastName}`
      : `Guest ${session.sessionId}`;

    toast(
      <div className="flex items-center justify-between px-1 w-[200px]">
        <div>
          <h3 className="text-sm font-medium text-gray-900 truncate">New Request</h3>
          <p className="text-xs text-gray-900 truncate">{userInfo}</p>
        </div>
        <button
          onClick={() => navigateToChat(session.sessionId)}
          className="ml-8 cursor-pointer shrink-0 rounded-md bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          Join <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  };

  const navigateToChat = (sessionId) => {
    router.push(`/admin/chat?sessionId=${sessionId}`);
  };

  const joinChat = async (session) => {
    try {
      await api.post(`/chat/sessions/${session.sessionId}/join`, {
        adminId: user.id,
      });

      // Update pending sessions
      setPendingSessions((prev) =>
        prev.filter((s) => s.id !== session.sessionId)
      );

      // Navigate to chat page with session id
      router.push(`/admin/chat?sessionId=${session.sessionId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join chat session",
        variant: "destructive",
      });
    }
  };

  // Leave a chat session - only handles session status and notifications
  const leaveChat = async (session) => {
    try {
      // Update session status
      await api.post(`/chat/sessions/${session.sessionId}/leave`);

      // Refresh pending sessions
      const response = await api.get("/chat/sessions?needsHandoff=true");
      if (response.data.success) {
        setPendingSessions(response.data.sessions || []);
      }
    } catch (error) {
      console.error("Error leaving chat:", error);
      toast({
        title: "Error",
        description: "Failed to leave chat session",
        variant: "destructive",
      });
    }
  };

  // Value to be provided by the context
  const contextValue = {
    pendingSessions,
    loading,
    joinChat,
    leaveChat,
  };

  return (
    <AdminChatbotContext.Provider value={contextValue}>
      {children}
    </AdminChatbotContext.Provider>
  );
};

// Custom hook to use the context
export const useAdminChatbot = () => {
  const context = useContext(AdminChatbotContext);
  if (!context) {
    return {
      pendingSessions: [],
      loading: false,
      joinChat: () => console.warn("joinChat called outside provider"),
      leaveChat: () => console.warn("leaveChat called outside provider"),
    };
  }
  return context;
};
