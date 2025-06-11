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
    const { month: pieChartMonth } = req.query;
    const now = dayjs();
    const monthMap = {
      this: now.startOf("month"),
      last: now.subtract(1, "month").startOf("month"),
      last2: now.subtract(2, "month").startOf("month"),
    };

    const today = now.startOf("day").toDate();

    const occupiedStatusIds = [2, 8, 9, 10];

    const allRooms = await db.room.findMany({
      select: { id: true },
    });

    const totalRooms = allRooms.length;

    if (pieChartMonth === "today") {
      // OCCUPIED today
      const occupiedRooms = await db.room.findMany({
        where: {
          roomStatusId: { in: occupiedStatusIds },
        },
      });

      // BOOKED today
      const bookedToday = await db.booking.findMany({
        where: {
          checkInDate: { gte: today },
        },
        select: { id: true },
      });

      const occupied = occupiedRooms.length;
      const booked = bookedToday.length;

      const available = totalRooms - occupied - booked;

      const data = [
        { name: "Occupied", value: occupied, color: "#EC632A" },
        { name: "Booked", value: booked, color: "#364E44" },
        { name: "Available", value: available, color: "#D3D4EC" },
      ];

      return successResponse({ res, data: { data } });
    }

    // Handle monthly (this, last, last2)
    const startDate = monthMap[pieChartMonth]?.toDate();
    const endDate = monthMap[pieChartMonth]?.endOf("month").toDate();
    const daysInMonth = dayjs(startDate).daysInMonth();

    if (!startDate || !endDate) {
      return errorResponse({
        res,
        message: "Invalid month provided",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const bookings = await db.booking.findMany({
      where: {
        OR: [
          {
            checkInDate: { gte: startDate, lte: endDate },
          },
          {
            checkOutDate: { gte: startDate, lte: endDate },
          },
        ],
      },
      select: {
        checkInDate: true,
        checkOutDate: true,
      },
    });

    let occupiedDays = 0;

    const dayjsMax = (a, b) => (a.isAfter(b) ? a : b);
    const dayjsMin = (a, b) => (a.isBefore(b) ? a : b);

    bookings.forEach((booking) => {
      const checkIn = dayjs(booking.checkInDate);
      const checkOut = dayjs(booking.checkOutDate);

      const start = dayjsMax(checkIn, dayjs(startDate));
      const end = dayjsMin(checkOut, dayjs(endDate));
      const duration = end.diff(start, "day") + 1;

      if (duration > 0) {
        occupiedDays += duration;
      }
    }); 

    const totalRoomDays = totalRooms * daysInMonth;
    const availableDays = totalRoomDays - occupiedDays;

    const data = [
      { name: "Occupied", value: occupiedDays, color: "#EC632A" },
      { name: "Available", value: availableDays, color: "#D3D4EC" },
    ];

    return successResponse({ res, data: { data } });
  } catch (error) {
    console.error("Pie chart error:", error.message);
    return errorResponse({
      res,
      message: "Error generating pie chart data",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};