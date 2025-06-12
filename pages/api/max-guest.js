import { errorResponse, successResponse } from "@/lib/response-utils";
import { db } from "@/lib/prisma";
import { HTTP_STATUS } from "@/constants/http-status";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
    const maxGuest = await db.roomType.aggregate({
      _max: {
        capacity: true,
      },
    });
    return successResponse({
      res,
      data: { maxGuest: maxGuest._max.capacity },
    });
  } catch (error) {
    console.log(error.message)
    return errorResponse({
      res,
      message: "Failed to get max guest",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}
