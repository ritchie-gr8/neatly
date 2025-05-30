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

const GET = async (req, res) => {
  try {
    const { needsHandoff, userId, limit = 10 } = req.query;

    // Build where conditions
    const whereConditions = {
      isActive: true
    };

    // Filter by handoff status if specified
    if (needsHandoff === 'true') {
      whereConditions.needsHandoff = true;
    }

    // Filter by user ID if specified
    if (userId) {
      whereConditions.userId = parseInt(userId);
    }

    // Fetch sessions
    const sessions = await db.chatSession.findMany({
      where: whereConditions,
      orderBy: {
        lastMessageAt: 'desc'
      },
      take: parseInt(limit),
      include: {
        _count: {
          select: {
            messages: true
          }
        }
      }
    });

    // Get unique user IDs from sessions
    const userIds = [...new Set(sessions.filter(s => s.userId).map(s => s.userId))];

    // If we have user IDs, fetch their information
    let usersMap = {};
    if (userIds.length > 0) {
      const users = await db.user.findMany({
        where: {
          id: { in: userIds }
        },
        select: {
          id: true,
          firstName: true,
          lastName: true
        }
      });

      // Create a map of user ID to user data for quick lookup
      usersMap = users.reduce((map, user) => {
        map[user.id] = user;
        return map;
      }, {});
    }

    // Combine sessions with user data
    const sessionsWithUserData = sessions.map(session => ({
      ...session,
      user: session.userId ? usersMap[session.userId] || null : null
    }));

    return successResponse({
      res,
      data: {
        sessions: sessionsWithUserData
      },
    });
  } catch (error) {
    console.error("Error fetching sessions:", error.message);
    return errorResponse({
      res,
      message: "Failed to fetch sessions",
    });
  }
};

const POST = async (req, res) => {
  try {
    const { sessionId, userId } = await req.body;

    if (!sessionId) {
      return errorResponse({
        res,
        message: "Session ID is required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    let session = await db.chatSession.findUnique({
      where: { sessionId },
    });

    if (!session) {
      session = await db.chatSession.create({
        data: {
          sessionId,
          userId,
          isActive: true,
          needsHandoff: false,
          adminJoined: false,
        },
      });
    }

    return successResponse({
      res,
      data: {
        session,
      },
    });
  } catch (error) {
    console.error("Error creating session:", error.message);
    return errorResponse({
      res,
      message: "Failed to create session",
    });
  }
};
