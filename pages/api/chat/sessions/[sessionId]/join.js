import { db } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/response-utils";
import { HTTP_STATUS } from "@/constants/http-status";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
    const { sessionId } = req.query;
    const { adminId } = req.body;

    if (!sessionId || !adminId) {
      return errorResponse({
        res,
        message: "Session ID and admin ID are required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    // Find the session
    const session = await db.chatSession.findUnique({
      where: { sessionId },
    });

    const shouldSendJoinMessage = !session.adminJoined && !session.adminId;

    if (!session) {
      return errorResponse({
        res,
        message: "Chat session not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    // Update session to mark as admin joined
    const updatedSession = await db.chatSession.update({
      where: { id: session.id },
      data: {
        adminJoined: true,
        adminId,
      },
    });

    // Send a system message to notify the user
    if (shouldSendJoinMessage) {
      await db.chatMessage.create({
        data: {
          sessionId: session.id,
          content: "An admin has joined the conversation.",
          sender: "ADMIN",
        },
      });
    }

    return successResponse({
      res,
      data: {
        session: updatedSession,
      },
    });
  } catch (error) {
    console.error("Error joining chat session:", error);
    return errorResponse({
      res,
      message: "Failed to join chat session",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}
