import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/prisma";
import { HTTP_STATUS } from "@/constants/http-status";
import { errorResponse, successResponse } from "@/lib/response-utils";
import formidable from "formidable";
import api from "@/lib/axios";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return errorResponse({
        res,
        message: "Error parsing form",
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      });
    }

    try {
      const { image } = files;
      const { roomTypeId } = fields;

      // Validate inputs
      if (!image) {
        return errorResponse({
          res,
          message: "No image uploaded",
          status: HTTP_STATUS.BAD_REQUEST,
        });
      }

      if (!roomTypeId) {
        return errorResponse({
          res,
          message: "Room type ID is required",
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

      const result = await cloudinary.uploader.upload(image[0].filepath, {
        folder: "room-types",
      });

      const existingMainImage = await db.roomImage.findFirst({
        where: {
          roomTypeId: parsedRoomTypeId,
          imageDefault: true
        }
      });

      let updatedImage;

      if (existingMainImage) {
        api.post(`/images/delete`, { public_id: existingMainImage.imagePublicId })
        .catch(error => {
          console.error("Error deleting existing main image:", error?.message || "Failed to delete existing main image");
        });

        updatedImage = await db.roomImage.update({
          where: { id: existingMainImage.id },
          data: {
            imageUrl: result.secure_url,
            imagePublicId: result.public_id,
          },
        });
        console.log(`Updated existing main image (ID: ${existingMainImage.id}) for room type ${parsedRoomTypeId}`);
      } else {
        updatedImage = await db.roomImage.create({
          data: {
            roomTypeId: parsedRoomTypeId,
            imageUrl: result.secure_url,
            imagePublicId: result.public_id,
            imageDefault: true,
          },
        });
      }

      return successResponse({
        res,
        data: {
          roomType: parsedRoomTypeId,
          image: {
            id: updatedImage.id,
            url: result.secure_url,
            publicId: result.public_id,
            isDefault: true
          },
        },
        message: "Room type main image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading room type main image:", error.message);
      return errorResponse({
        res,
        message: error.message || "Failed to upload room type main image",
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  });
}

export default handler;
