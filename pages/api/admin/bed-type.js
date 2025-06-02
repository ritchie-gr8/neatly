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

// GET: Fetch all bed types
const GET = async (req, res) => {
  try {
    // Get all bed types from the database, ordered by ID
    const bedTypes = await db.bedType.findMany({
      orderBy: {
        id: 'asc'
      }
    });

    // Return the bed types with a success message
    return successResponse({
      res,
      data: {
        bedTypes,
      },
      message: "Bed types retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching bed types:", error.message);
    return errorResponse({
      res,
      message: error.message || "Failed to fetch bed types",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};
