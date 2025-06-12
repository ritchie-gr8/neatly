import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/response-utils";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
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
      // Exclude mainImage and mainImagePublicId - these are handled by the image upload endpoint
    } = req.body;

    // Parse numeric values
    const parsedData = {
      name,
      roomSize: parseInt(roomSize),
      bedTypeId: parseInt(bedTypeId),
      capacity: parseInt(capacity),
      pricePerNight: parseFloat(pricePerNight),
      isPromotion: Boolean(isPromotion),
      description,
    };

    // Add promotion price only if isPromotion is true and a valid price is provided
    if (isPromotion && promotionPrice) {
      parsedData.promotionPrice = parseFloat(promotionPrice);
    }

    // Create the room type in the database
    const newRoomType = await db.roomType.create({
      data: parsedData,
    });

    return successResponse({
      res,
      data: newRoomType,
      message: "Room type created successfully",
    });
  } catch (error) {
    console.error("Error creating room type:", error.message);
    return errorResponse({
      res,
      message: error.message || "Failed to create room type",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}
