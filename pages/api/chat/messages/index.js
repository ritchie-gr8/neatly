import { db } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/response-utils";
import { HTTP_STATUS } from "@/constants/http-status";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await POST(req, res);
    case "GET":
      return await GET(req, res);
    default:
      return errorResponse({
        res,
        message: "Method not allowed",
        status: HTTP_STATUS.METHOD_NOT_ALLOWED,
      });
  }
}

const POST = async (req, res) => {
  try {
    const { sessionId, content, sender, userId } = req.body;
    // console.log("POST /api/chat/messages - Saving message:", {
    //   sessionId,
    //   content: content.length > 100 ? `${content.substring(0, 100)}...` : content,
    //   sender,
    //   userId
    // });

    // Find or create the session
    let session = await db.chatSession.findUnique({
      where: { sessionId },
    });

    if (!session) {
      // console.log(`Creating new session for sessionId: ${sessionId}`);
      session = await db.chatSession.create({
        data: {
          sessionId,
          userId: userId || null,
          isActive: true,
          needsHandoff: false,
          adminJoined: false,
        },
      });
    }

    // Create the message
    // console.log(`Creating message for session with ID: ${session.id}`);
    const message = await db.chatMessage.create({
      data: {
        content,
        sender,
        sessionId: session.id,
      },
    });
    // console.log(`Created message with ID: ${message.id}`);

    // // Update session's lastMessageAt timestamp
    // await db.chatSession.update({
    //   where: { id: session.id },
    //   data: { lastMessageAt: new Date() },
    // });

    return successResponse({
      res,
      data: {
        message: {
          id: message.id,
          content: message.content,
          sender: message.sender,
          timestamp: message.timestamp,
          sessionId: session.sessionId
        },
      },
    });
  } catch (error) {
    console.error("Error saving message:", error);
    return errorResponse({
      res,
      message: "Failed to save message",
    });
  }
};

const GET = async (req, res) => {
  try {
    const { sessionId } = req.query;
    // console.log("GET /api/chat/messages - Fetching messages for sessionId:", sessionId);

    // First try to find the session using the sessionId string
    let session = await db.chatSession.findUnique({
      where: { sessionId },
      include: {
        messages: {
          orderBy: { timestamp: "asc" },
        },
      },
    });

    // If session not found, try to find by numeric id (fallback)
    if (!session && !isNaN(parseInt(sessionId))) {
      // console.log("Trying to find session by numeric ID:", parseInt(sessionId));
      session = await db.chatSession.findUnique({
        where: { id: parseInt(sessionId) },
        include: {
          messages: {
            orderBy: { timestamp: "asc" },
          },
        },
      });
    }

    if (!session) {
      // console.log("Session not found for sessionId:", sessionId);
      return errorResponse({
        res,
        message: "Session not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    // console.log(`Found ${session.messages.length} messages for session ${sessionId}`);

    const messages = session.messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      sender: msg.sender,
      timestamp: msg.timestamp,
      sessionId: session.sessionId,
    }));

    return successResponse({
      res,
      data: {
        messages,
      },
    });
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    return errorResponse({
      res,
      message: "Failed to fetch messages",
    });
  }
};
