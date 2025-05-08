import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/response-utils";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }
  try {
    const roomStatuses = await db.roomStatus.findMany();
    return successResponse({
      res,
      data: roomStatuses,
    });
  } catch (error) {
    console.error("Error fetching room statuses:", error.message);
    return errorResponse({
      res,
      message: "Error fetching room statuses",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}
