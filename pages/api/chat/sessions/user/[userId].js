import { db } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response-utils";
import { HTTP_STATUS } from "@/constants/http-status";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  const { userId } = req.query;

  if (!userId) {
    return errorResponse({
      res,
      message: "User ID is required",
      status: HTTP_STATUS.BAD_REQUEST,
    });
  }

  try {
    const userSession = await db.chatSession.findFirst({
      where: {
        userId: Number(userId),
        isActive: true,
      },
      orderBy: {
        lastMessageAt: "desc",
      },
    });

    if (userSession) {
      return successResponse({
        res,
        data: {
          session: userSession,
        }
      })
    } else {
      return successResponse({
        res,
        data: {
          session: null,
        }
      })
    }
  } catch (error) {
    console.error("Error fetching user session:", error?.message);
    return errorResponse({
      res,
      message: "Failed to fetch user session",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}
