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

    // Utilities
    function transformToPercent(data) {
      const total = data.reduce((sum, item) => sum + item.count, 0);
      if (total === 0) return data.map((item) => ({ ...item, percent: 0 }));

      const rawPercents = data.map((item) => (item.count / total) * 100);
      const flooredPercents = rawPercents.map((p) => Math.floor(p));
      const flooredSum = flooredPercents.reduce((sum, p) => sum + p, 0);
      let diff = 100 - flooredSum;
      const decimals = rawPercents.map((p, i) => p - flooredPercents[i]);

      while (diff > 0) {
        const maxIndex = decimals.indexOf(Math.max(...decimals));
        flooredPercents[maxIndex] += 1;
        decimals[maxIndex] = 0;
        diff--;
      }
      return data.map((item, i) => ({
        ...item,
        percent: flooredPercents[i],
      }));
    }

    function aggregateCounts(arrays) {
      const map = new Map();
      arrays.forEach((arr) => {
        arr.forEach(({ type, count }) => {
          map.set(type, (map.get(type) || 0) + count);
        });
      });
      return Array.from(map.entries()).map(([type, count]) => ({ type, count }));
    }

    const GET = async (req, res) => {
      try {
        const { startDate, endDate, viewBy } = req.query;

        if (!startDate || !endDate || !["overall", "roomtypes"].includes(viewBy)) {
          return errorResponse({
            res,
            message: "Missing or invalid query parameters",
            status: HTTP_STATUS.BAD_REQUEST,
          });
        }

        const start = dayjs(startDate).startOf("day").toDate();
        const end = dayjs(endDate).endOf("day").toDate();

        // Get bookings within the date range, include relations needed
        const bookings = await db.booking.findMany({
          where: {
            createdAt: {
              gte: start,
              lte: end,
            },
            bookingStatus: {
              in: ["CONFIRMED", "CHECKED_IN"],
            },
          },
          include: {
            bookingRooms: {
              include: {
                roomType: true,
              },
            },
            payments: true,
          },
        });

        // Map for accumulating monthly data
        const monthsMap = new Map();
        const formatMonth = (date) => dayjs(date).format("MMMM");

        for (const booking of bookings) {
          const month = formatMonth(booking.checkInDate);
          const date = dayjs(booking.checkInDate).startOf("month").toDate();
          const userId = booking.userId;

          if (!monthsMap.has(month)) {
            monthsMap.set(month, {
              month,
              date,
              booking: 0,
              guestMap: new Map(),
              paymentMap: new Map(),
              roomTypeMap: new Map(),
            });
          }

          const monthData = monthsMap.get(month);
          monthData.booking++;

          // Track guest visits: new vs returning per month
          const guestKey = `user:${userId}`;
          if (!monthData.guestMap.has(guestKey)) {
            monthData.guestMap.set(guestKey, { new: true, count: 1 });
          } else {
            monthData.guestMap.get(guestKey).new = false;
            monthData.guestMap.get(guestKey).count++;
          }

          // Aggregate payment methods from all payments
          if (Array.isArray(booking.payments)) {
            for (const payment of booking.payments) {
              const method = payment.paymentMethod;
              if (method === "CREDIT_CARD" || method === "CASH") {
                const count = monthData.paymentMap.get(method) || 0;
                monthData.paymentMap.set(method, count + 1);
              }
            }
          }

          // Aggregate room types if requested
          if (viewBy === "roomtypes") {
            for (const bookingRoom of booking.bookingRooms) {
              const roomTypeName = bookingRoom.roomType?.name;
              if (roomTypeName) {
                const count = monthData.roomTypeMap.get(roomTypeName) || 0;
                monthData.roomTypeMap.set(roomTypeName, count + 1);
              }
            }
          }
        }

        // Build final data array from monthsMap
        const data = [];

        for (const [_, value] of monthsMap) {
          const guestRaw = [
            {
              type: "New guests",
              count: [...value.guestMap.values()].filter((g) => g.new).length,
            },
            {
              type: "Returning guests",
              count: [...value.guestMap.values()].filter((g) => !g.new).length,
            },
          ];

          const paymentRaw = [
            {
              type: "Credit card",
              count: value.paymentMap.get("CREDIT_CARD") || 0,
            },
            {
              type: "Cash",
              count: value.paymentMap.get("CASH") || 0,
            },
          ];

          if (viewBy === "overall") {
            data.push({
              month: value.month,
              bookingRaw: value.booking,
              guestRaw,
              paymentRaw,
            });
          } else {
            // Transform roomTypeMap into object with keys as room types and counts as values
            const roomTypeRaw = {};
            for (const [type, count] of value.roomTypeMap.entries()) {
              roomTypeRaw[type] = count;
            }
            data.push({
              month: value.month,
              roomTypeRaw,
              guestRaw,
              paymentRaw,
            });
          }
        }

        // Sort data by month date ascending
        data.sort((a, b) => a.month.localeCompare(b.month));

        // Calculate max values for normalization
        let maxBookingRaw = 0;
        let maxRoomTypeCount = 0;

        if (viewBy === "overall") {
          maxBookingRaw = Math.max(...data.map((d) => d.bookingRaw || 0));
        } else {
          for (const d of data) {
            for (const count of Object.values(d.roomTypeRaw || {})) {
              if (count > maxRoomTypeCount) maxRoomTypeCount = count;
            }
          }
        }

        // Add percentage fields normalized to max values
        const monthlyData = data.map((d) => {
          if (viewBy === "overall") {
            return {
              month: d.month,
              bookingRaw: d.bookingRaw,
              bookingPercent:
                maxBookingRaw > 0 ? Math.round((d.bookingRaw / maxBookingRaw) * 100) : 0,
            };
          } else {
            // Calculate roomTypePercent normalized by maxRoomTypeCount
            const roomTypePercent = {};
            for (const [type, count] of Object.entries(d.roomTypeRaw || {})) {
              roomTypePercent[type] =
                maxRoomTypeCount > 0 ? Math.round((count / maxRoomTypeCount) * 100) : 0;
            }
            return {
              month: d.month,
              roomTypeRaw: d.roomTypeRaw,
              roomTypePercent,
            };
          }
        });

        // Aggregate and transform guest and payment data for percentages
        const aggregatedGuestRaw = aggregateCounts(data.map((d) => d.guestRaw));
        const aggregatedPaymentRaw = aggregateCounts(data.map((d) => d.paymentRaw));

        const guestPercent = transformToPercent(aggregatedGuestRaw);
        const paymentPercent = transformToPercent(aggregatedPaymentRaw);

        return successResponse({
          res,
          data: {
            monthlyData: monthlyData, // Monthly stats with raw counts
            aggregatedGuest: guestPercent, // Aggregated guest visit percentages
            aggregatedPayment: paymentPercent, // Aggregated payment method percentages
          },
        });
      } catch (error) {
        console.error("Occupancy and Guest API error:", error.message);
        return errorResponse({
          res,
          message: "Error generating occupancy and guest data",
          status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        });
      }
    };
