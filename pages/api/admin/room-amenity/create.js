import { HTTP_STATUS } from "@/constants/http-status";
import { errorResponse, successResponse } from "@/lib/response-utils";
import { db } from "@/lib/prisma";

async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
    const { roomTypeId, amenities } = req.body;

    if (!roomTypeId) {
      return errorResponse({
        res,
        message: "Room type ID is required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    if (!amenities || !Array.isArray(amenities) || amenities.length === 0) {
      return errorResponse({
        res,
        message: "Amenities array is required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const parsedRoomTypeId = parseInt(roomTypeId);

    const roomType = await db.roomType.findUnique({
      where: { id: parsedRoomTypeId },
    });

    if (!roomType) {
      return errorResponse({
        res,
        message: `Room type with ID ${parsedRoomTypeId} not found`,
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    await db.roomAmniety.deleteMany({
      where: { roomTypeId: parsedRoomTypeId },
    });

    const createdAmenities = await Promise.all(
      amenities.map(async (amenity, index) => {
        return await db.roomAmniety.create({
          data: {
            roomTypeId: parsedRoomTypeId,
            name: amenity.name,
            order: index,
          },
        });
      })
    );

    return successResponse({
      res,
      data: createdAmenities,
      message: "Room amenities created successfully",
    });
  } catch (error) {
    console.error("Error creating room amenities:", error.message);
    return errorResponse({
      res,
      message: error.message || "Failed to create room amenities",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}

export default handler;
