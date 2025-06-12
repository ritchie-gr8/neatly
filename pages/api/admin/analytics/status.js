import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response-utils";
import dayjs from "dayjs";

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
    const now = dayjs();
    const startOfThisMonth = now.startOf("month").toDate();
    const startOfLastMonth = now.subtract(1, "month").startOf("month").toDate();
    const endOfLastMonth = now.startOf("month").toDate();

    // Fetch bookings using check_in_date for both months
    const [thisMonthBookings, lastMonthBookings] = await Promise.all([
      db.booking.findMany({
        where: {
          checkInDate: {
            gte: startOfThisMonth,
          },
          bookingStatus: {
            in: ["CONFIRMED", "CHECKED_IN", "CHECKED_OUT"],
          },
        },
        select: {
          totalAmount: true,
          guestId: true,
        },
      }),

      db.booking.findMany({
        where: {
          checkInDate: {
            gte: startOfLastMonth,
            lt: endOfLastMonth,
          },
          bookingStatus: {
            in: ["CONFIRMED", "CHECKED_IN", "CHECKED_OUT"],
          },
        },
        select: {
          totalAmount: true,
          guestId: true,
        },
      }),
    ]);
    

    // Format booking data
    const formatData = (bookings) => {
      const totalSales = bookings.reduce((sum, b) => sum + Number(b.totalAmount), 0);
      const uniqueGuests = new Set(bookings.map((b) => b.guestId));
      return {
        booking: bookings.length, 
        sales: totalSales,
        users: uniqueGuests.size,
        visitors: Math.floor(bookings.length * 5.5), // Placeholder
      };
    };

    const thisMonth = formatData(thisMonthBookings);
    const lastMonth = formatData(lastMonthBookings);

    return successResponse({
      res,
      data: { thisMonth, lastMonth },
    });
  } catch (error) {
    console.error("Error fetching current status:", error.message);
    return errorResponse({
      res,
      message: "An error occurred while fetching current status",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};
