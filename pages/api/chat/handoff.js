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
    const { sessionId, reason } = req.body;

    if (!sessionId) {
      return errorResponse({
        res,
        message: "Session ID is required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const session = await db.chatSession.findUnique({
      where: { sessionId },
    });

    if (!session) {
      return errorResponse({
        res,
        message: "Chat session not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    await db.chatSession.update({
      where: { id: session.id },
      data: {
        needsHandoff: true,
        handoffReason: reason || "User requested assistance",
      },
    });

    await db.adminChatNotification.create({
      data: {
        sessionId: session.id,
        isRead: false,
      },
    });

    return successResponse({
      res,
      message: "Handoff requested successfully",
      data: {
        id: session.id,
        sessionId: session.sessionId,
      },
    });
  } catch (error) {
    console.error("Error requesting handoff:", error);
    return errorResponse({
      res,
      message: "Failed to request handoff",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}
