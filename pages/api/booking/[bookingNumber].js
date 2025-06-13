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
    const { bookingNumber } = req.query;

    if (!bookingNumber) {
      return errorResponse({
        res,
        message: "Booking number is required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const booking = await db.booking.findUnique({
      where: { bookingNumber },
      include: {
        guest: true,
        bookingRooms: {
          include: {
            room: {
              include: {
                roomType: {
                  include: {
                    bedType: true,
                    roomImages: true
                  }
                },
                roomStatus: true
              }
            }
          }
        },
        payments: true
      }
    });


    if (!booking) {
      return errorResponse({
        res,
        message: "Booking not found",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    return successResponse({
      res,
      data: booking,
    });

  } catch (error) {
    console.error("Error fetching booking data:", error.message);
    return errorResponse({
      res,
      message: "Failed to fetch booking data",
    });
  }
}
