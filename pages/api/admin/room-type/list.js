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
    console.log("Fetching room types with default images and bed types");

    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const limit = 6;
    const skip = (page - 1) * limit;

    // Define the where condition for search
    const whereCondition = search
      ? {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        }
      : {};

    const [roomTypes, totalCount] = await db.$transaction([
      db.roomType.findMany({
        skip,
        take: limit,
        where: whereCondition,
        select: {
          id: true,
          name: true,
          pricePerNight: true,
          promotionPrice: true,
          capacity: true,
          roomSize: true,
          bedType: {
            select: {
              bedDescription: true,
            },
          },
          roomImages: {
            where: {
              imageDefault: true,
            },
            select: {
              imageUrl: true,
            },
          },
        },
        orderBy: {
          id: "asc",
        },
      }),
      db.roomType.count({
        where: whereCondition
      }),
    ]);

    const formattedRoomTypes = roomTypes.map((roomType) => ({
      ...roomType,
      defaultImage: roomType.roomImages[0]?.imageUrl || null,
      roomImages: undefined,
    }));

    return successResponse({
      res,
      data: {
        items: formattedRoomTypes,
        total: totalCount,
        page,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching room types:", error.message);
    return errorResponse({
      res,
      message: "An error occurred while fetching room types",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};
