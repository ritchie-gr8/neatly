import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response-utils";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
    const { responses } = req.body;

    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return errorResponse({
        res,
        message: "Valid responses array is required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const updatePromises = responses.map((resp) => {
      return db.chatbotResponse.update({
        where: { id: resp.id },
        data: { order: resp.order },
      });
    });

    await Promise.all(updatePromises);

    return successResponse({
      res,
      message: "Response order updated successfully",
    });
  } catch (error) {
    console.error("Error updating response order:", error.message);
    return errorResponse({
      res,
      message: "Failed to update response order",
    });
  }
}
