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
    const { roomNumber, roomStatusId, roomTypeId } = req.body;

    if (!roomNumber || !roomStatusId || !roomTypeId) {
      return errorResponse({
        res,
        message: "Room number, type, and status are required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }
    const roomData = await db.room.create({
      data: req.body,
    });

    return res.status(201).json({
      success: true,
      roomData,
    });
  } catch (error) {
    console.error("Error creating room:", error.message);
    return errorResponse({
      res,
      message: error.message || "Failed to create room",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}
