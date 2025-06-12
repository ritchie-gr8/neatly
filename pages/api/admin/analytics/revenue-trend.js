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
    const { start, end } = req.query;

    if (!start || !end) {
      return errorResponse({
        res,
        message: "Missing 'start' or 'end' query parameters",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const startDate = dayjs(start).startOf("day").toDate();
    const endDate = dayjs(end).endOf("day").toDate();

    const bookings = await db.booking.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        bookingStatus: {
          in: ["CONFIRMED", "CHECKED_IN", "CHECKED_OUT"],
        },
      },
      select: {
        createdAt: true,
        totalAmount: true,
      },
    });

    const revenueMap = new Map();

    bookings.forEach((booking) => {
      const monthLabel = dayjs(booking.createdAt).format("YYYY-MM");
      const currentRevenue = Number(revenueMap.get(monthLabel) ?? 0);
      const amount = Number(booking.totalAmount ?? 0);
      revenueMap.set(monthLabel, currentRevenue + amount);
    });

    const result = Array.from(revenueMap.entries())
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => dayjs(a.month).unix() - dayjs(b.month).unix());

    return successResponse({ res, data: { result } });
  } catch (error) {
    console.error("Revenue Trend API Error:", error.message);
    return errorResponse({
      res,
      message: "Failed to fetch revenue trend data",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
};
