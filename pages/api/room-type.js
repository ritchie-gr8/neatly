import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/response-utils";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return GET(req, res);
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
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    const roomTypes = await db.roomType.findMany({
      ...(limit && { take: limit }),
      select: {
        id: true,
        name: true,
        roomImages: {
          where: {
            imageDefault: true,
          },
          select: {
            imageUrl: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    const formattedRoomTypes = roomTypes.map((roomType) => ({
      ...roomType,
      defaultImage: roomType.roomImages[0]?.imageUrl || null,
      roomImages: undefined,
    }));

    return successResponse({
      res,
      data: formattedRoomTypes,
    });
  } catch (error) {
    console.error("Error fetching room types:", error.message);
    return errorResponse({
      res,
      message: "An error occurred while fetching room types",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};
