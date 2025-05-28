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

    const updatedSession = await db.chatSession.update({
      where: { sessionId },
      data: {
        adminId: null,
        handoffReason: 'ADMIN_LEFT',
        adminJoined: false,
        needsHandoff: false,
      },
    });

    return successResponse({
      res,
      data: {
        session: updatedSession,
      },
    });
  } catch (error) {
    console.error("Error leaving session:", error.message);
    return errorResponse({
      res,
      message: "Failed to leave session",
    });
  }
}
