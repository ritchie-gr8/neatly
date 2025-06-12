export function normalizeSupabaseChatSession(session) {
  if ('session_id' in session) {
    return {
      id: session.chat_session_id,
      sessionId: session.session_id,
      userId: session.user_id,
      title: session.title,
      isActive: session.is_active,
      needsHandoff: session.needs_handoff,
      handoffReason: session.handoff_reason,
      adminJoined: session.admin_joined,
      adminId: session.admin_id,
      startedAt: session.started_at,
      lastMessageAt: session.last_message_at,
      updatedAt: session.updated_at,
      user: session.user,
      _count: session._count || { messages: 0 }
    };
  }

  return session;
}
