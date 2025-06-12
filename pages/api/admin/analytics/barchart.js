import { db } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response-utils";
import { HTTP_STATUS } from "@/constants/http-status";
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
    const { month } = req.query;
    const now = dayjs();
    const monthMap = {
      this: now.startOf("month"),
      last: now.subtract(1, "month").startOf("month"),
      last2: now.subtract(2, "month").startOf("month"),
    };

    const startDate = monthMap[month];
    const endDate = startDate?.endOf("month");

    if (!startDate || !endDate) {
      return errorResponse({
        res,
        message: "Invalid month provided",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    // Get bookings that overlap with the target month
    const bookings = await db.booking.findMany({
      where: {
        bookingStatus: {
          in: ["CONFIRMED", "CHECKED_IN", "CHECKED_OUT"],
        },
        OR: [
          {
            checkInDate: {
              gte: startDate.toDate(),
              lte: endDate.toDate(),
            },
          },
          {
            checkOutDate: {
              gte: startDate.toDate(),
              lte: endDate.toDate(),
            },
          },
        ],
      },
      select: {
        checkInDate: true,
      },
    });

    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const counts = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    bookings.forEach((booking) => {
      const day = dayjs(booking.checkInDate).format("ddd");
      if (counts[day] !== undefined) counts[day]++;
    });

    const data = weekdays.map((day) => ({
      name: day,
      booking: counts[day],
    }));

    const maxBooking = Math.max(...data.map((d) => d.booking), 1);
    const dataWithPercent = data.map((d) => ({
      ...d,
      percent: Math.round((d.booking / maxBooking) * 100),
    }));

    return successResponse({ res, data: { data: dataWithPercent } });
  } catch (error) {
    console.error("Bar chart error:", error.message);
    return errorResponse({
      res,
      message: "Error generating bar chart data",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};
