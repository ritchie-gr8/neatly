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
    const { roomTypeId, images } = req.body;

    if (!roomTypeId) {
      return errorResponse({
        res,
        message: "Missing required field: roomTypeId",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return errorResponse({
        res,
        message: "Missing required field: images array",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    // Parse roomTypeId to integer
    const targetRoomTypeId = parseInt(roomTypeId);

    // Verify the room type exists
    const roomType = await db.roomType.findUnique({
      where: { id: targetRoomTypeId },
    });

    if (!roomType) {
      return errorResponse({
        res,
        message: `Room type with ID ${targetRoomTypeId} not found`,
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    // Delete existing images if requested
    if (req.body.replaceExisting) {
      await db.roomImage.deleteMany({
        where: { roomTypeId: targetRoomTypeId, imageDefault: false },
      });
    }

    // Create all the room images with their order preserved
    const createdImages = await Promise.all(
      images.map(async (image, index) => {
        return await db.roomImage.create({
          data: {
            roomTypeId: targetRoomTypeId,
            imageUrl: image.url,
            imageOrder: index,
            imagePublicId: image.publicId,
          },
        });
      })
    );

    return successResponse({
      res,
      data: createdImages,
      message: "Room images uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading room images:", error.message);
    return errorResponse({
      res,
      message: error.message || "Failed to upload room images",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}

export default handler;
