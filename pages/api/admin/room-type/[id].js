import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/response-utils";

export default async function handler(req, res) {
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      return GET(req, res, id);
    case "PUT":
      return PUT(req, res, id);
    case "DELETE":
      return DELETE(req, res, id);
    default:
      return errorResponse({
        res,
        message: "Method not allowed",
        status: HTTP_STATUS.METHOD_NOT_ALLOWED,
      });
  }
}

const GET = async (req, res, id) => {
  try {
    // Convert id to number
    const roomTypeId = Number(id);

    // Fetch room type with all related data in a single query
    const roomType = await db.roomType.findUnique({
      where: { id: roomTypeId },
      include: {
        // Include bed type information
        bedType: true,
        // Include room images with ordering
        roomImages: {
          orderBy: {
            imageOrder: "asc",
          },
        },
        // Include room amenities with ordering
        roomAmniety: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!roomType) {
      return errorResponse({
        res,
        message: "Room type not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    return successResponse({ res, data: roomType });
  } catch (error) {
    console.error("Error fetching room type:", error.message);
    return errorResponse({
      res,
      message: "Internal server error",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};

const PUT = async (req, res, id) => {
  try {
    // Check if room type exists
    const roomTypeId = Number(id);
    const existingRoomType = await db.roomType.findUnique({
      where: { id: roomTypeId },
    });

    if (!existingRoomType) {
      return errorResponse({
        res,
        message: `Room type with ID ${roomTypeId} not found`,
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    // Extract all fields from request body
    const {
      name,
      roomSize,
      bedTypeId,
      capacity,
      pricePerNight,
      isPromotion,
      promotionPrice,
      roomDescription: description,
      // Exclude mainImage and mainImagePublicId - these are handled separately
    } = req.body;

    // Parse numeric values and prepare update data
    const updateData = {};

    // Only include fields that are provided in the request
    if (name !== undefined) updateData.name = name;
    if (roomSize !== undefined) updateData.roomSize = parseInt(roomSize);
    if (bedTypeId !== undefined) updateData.bedTypeId = parseInt(bedTypeId);
    if (capacity !== undefined) updateData.capacity = parseInt(capacity);
    if (pricePerNight !== undefined)
      updateData.pricePerNight = parseFloat(pricePerNight);
    if (isPromotion !== undefined)
      updateData.isPromotion = Boolean(isPromotion);
    if (description !== undefined) updateData.description = description;

    // Handle promotion price based on isPromotion flag
    if (isPromotion && promotionPrice) {
      updateData.promotionPrice = parseFloat(promotionPrice);
    } else if (isPromotion === false) {
      // If isPromotion is explicitly set to false, clear the promotion price
      updateData.promotionPrice = null;
    }

    // Update the room type in the database
    const updatedRoomType = await db.roomType.update({
      where: { id: roomTypeId },
      data: updateData,
    });

    return successResponse({
      res,
      data: updatedRoomType,
      message: "Room type updated successfully",
    });
  } catch (error) {
    console.error("Error updating room type:", error.message);
    return errorResponse({
      res,
      message: error.message || "Failed to update room type",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};

const DELETE = async (req, res, id) => {
  try {
    // Convert id to number
    const roomTypeId = Number(id);

    // Check if room type exists
    const existingRoomType = await db.roomType.findUnique({
      where: { id: roomTypeId },
    });

    if (!existingRoomType) {
      return errorResponse({
        res,
        message: `Room type with ID ${roomTypeId} not found`,
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    // First delete all related records to handle foreign key constraints
    // Delete room images
    await db.roomImage.deleteMany({
      where: { roomTypeId },
    });

    // Delete room amenities
    await db.roomAmniety.deleteMany({
      where: { roomTypeId },
    });

    // Delete the room type itself
    const deletedRoomType = await db.roomType.delete({
      where: { id: roomTypeId },
    });

    return successResponse({
      res,
      data: deletedRoomType,
      message: "Room type deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting room type:", error.message);
    return errorResponse({
      res,
      message: error.message || "Failed to delete room type",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};
