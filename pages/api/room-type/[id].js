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
    const { id } = req.query;

    if (!id || isNaN(parseInt(id))) {
      return errorResponse({
        res,
        message: "Invalid room type ID",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const roomId = parseInt(id);
    const roomType = await db.roomType.findUnique({
      where: {
        id: roomId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        capacity: true,
        roomSize: true,
        pricePerNight: true,
        promotionPrice: true,
        isPromotion: true,
        bedTypeId: true,
        bedType: {
          select: {
            id: true,
            bedDescription: true,
          },
        },
        roomImages: {
          select: {
            id: true,
            imageUrl: true,
            imagePublicId: true,
            imageDefault: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        roomAmniety: {
          select: {
            id: true,
            name: true,
            order: true,
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

    // Format room amenities
    const amenities = roomType.roomAmniety.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    // Format default image
    const defaultImage =
      roomType.roomImages.find((img) => img.imageDefault)?.imageUrl ||
      roomType.roomImages[0]?.imageUrl ||
      null;

    const roomImages = roomType.roomImages.map((img) => img.imageUrl);

    // Format the response
    const formattedRoomType = {
      ...roomType,
      defaultImage, // Keep the defaultImage for convenience
      images: roomImages, // Include all images
      amenities,
      roomAmniety: undefined, // Remove the original format
    };

    return successResponse({
      res,
      data: {
        roomType: formattedRoomType,
      },
    });
  } catch (error) {
    console.error("Error fetching room type by ID:", error.message);
    return errorResponse({
      res,
      message: "An error occurred while fetching room type",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};
