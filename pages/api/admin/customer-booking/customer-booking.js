// pages/api/admin/customer-booking/customer-booking.js - Main customer-booking list API
import { db } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const {
        search,
        status,
        dateFrom,
        dateTo,
        page = 1,
        limit = 10,
        excludeStatus,
      } = req.query;

      // Build where clause for filtering
      const where = {};

      // Search by guest name or booking number
      if (search) {
        where.OR = [
          {
            guest: {
              OR: [
                { firstName: { contains: search, mode: "insensitive" } },
                { lastName: { contains: search, mode: "insensitive" } },
              ],
            },
          },
          { bookingNumber: { contains: search, mode: "insensitive" } },
        ];
      }

      // Filter by booking status
      if (status) {
        where.bookingStatus = status;
      }

      // Filter by date range
      if (dateFrom || dateTo) {
        where.checkInDate = {};
        if (dateFrom) where.checkInDate.gte = new Date(dateFrom);
        if (dateTo) where.checkInDate.lte = new Date(dateTo);
      }
      // Exclude bookings with PENDING status (show all non-pending bookings)
      if (excludeStatus) {
        where.bookingStatus = {
          not: excludeStatus,
        };
      }

      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Get total count for pagination
      const totalCount = await db.booking.count({ where });

      // Fetch bookings with related data
      const bookings = await db.booking.findMany({
        where,
        include: {
          guest: true,
          bookingRooms: {
            include: {
              room: true,
              roomType: {
                include: {
                  bedType: true,
                },
              },
            },
          },
          payments: true,
          bookingAddons: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: parseInt(limit),
      });

      // Format response data
      const formattedBookings = bookings.map((booking) => ({
        id: booking.id,
        bookingNumber: booking.bookingNumber,
        guest: {
          firstName: booking.guest.firstName,
          lastName: booking.guest.lastName,
          email: booking.guest.email,
          phone: booking.guest.phone,
          country: booking.guest.country,
        },
        adults: booking.adults,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        totalAmount: booking.totalAmount,
        bookingStatus: booking.bookingStatus,
        additionalRequests: booking.additionalRequests,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        roomType: booking.bookingRooms[0]?.roomType
          ? {
              name: booking.bookingRooms[0].roomType.name,
              bedType: {
                bedDescription:
                  booking.bookingRooms[0].roomType.bedType?.bedDescription,
              },
            }
          : null,
        bookingRooms: booking.bookingRooms.map((br) => ({
          id: br.id,
          roomNumber: br.room.roomNumber,
          pricePerNight: br.pricePerNight,
        })),
        payments: booking.payments.map((payment) => ({
          id: payment.id,
          amount: payment.amount,
          paymentMethod: payment.paymentMethod,
          paymentStatus: payment.paymentStatus,
          transactionId: payment.transactionId,
          omiseChargeId: payment.omiseChargeId,
          paymentDate: payment.paymentDate,
        })),
        bookingAddons: booking.bookingAddons.map((addon) => ({
          id: addon.id,
          addonName: addon.addonName,
          quantity: addon.quantity,
          price: addon.price,
        })),
      }));

      res.status(200).json({
        success: true,
        data: formattedBookings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          totalPages: Math.ceil(totalCount / parseInt(limit)),
        },
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: "Method not allowed" });
  }
}
