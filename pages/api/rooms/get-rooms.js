import { errorResponse, successResponse } from "@/lib/response-utils";
import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
    const [roomTypes, maxCapacity] = await db.$transaction([
      db.roomType.findMany({
        include: {
          roomImages: true,
          bedType: true,
        },
      }),
      db.roomType.aggregate({
        _max: {
          capacity: true,
        },
      }),
    ]);

    if (roomTypes.length === 0) {
      return successResponse({
        res,
        message: "No room types found",
        data: [],
        maxCapacity: maxCapacity._max.capacity,
      });
    }

    const formattedRooms = roomTypes.map((roomType) => {
      return {
        id: roomType.id,
        roomType: {
          ...roomType,
          capacity: roomType.capacity || 2,
          roomSize: roomType.roomSize || "N/A",
        },
      };
    });

    return successResponse({
      res,
      message: "Room types fetched successfully",
      data: { rooms: formattedRooms, maxCapacity: maxCapacity._max.capacity },
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Internal server error",
    });
  }
}
