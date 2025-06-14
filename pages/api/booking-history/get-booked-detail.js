import { db } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/response-utils";
import { HTTP_STATUS } from "@/constants/http-status";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  try {
    const { user_id, page = 1, limit = 5 } = req.query;

    if (!user_id) {
      return errorResponse({
        res,
        message: "User ID is required",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const currentPage = parseInt(page);
    const itemsPerPage = parseInt(limit);
    const skip = (currentPage - 1) * itemsPerPage;

    const totalCount = await db.booking.count({
      where: {
        userId: parseInt(user_id),
      },
    });

    const bookings = await db.booking.findMany({
      where: {
        userId: parseInt(user_id),
      },
      include: {
        guest: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        bookingRooms: {
          include: {
            roomType: {
              select: {
                name: true,
                promotionPrice: true,
                roomImages: {
                  where: {
                    imageDefault: true,
                  },
                  select: {
                    imageUrl: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
        payments: {
          select: {
            paymentMethod: true,
            paymentStatus: true,
          },
          take: 1,
        },
        bookingAddons: {
          select: {
            addonName: true,
            quantity: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: itemsPerPage,
    });

    const formattedBookings = bookings.map((booking) => {
      const addonTotal = booking.bookingAddons.reduce(
        (sum, addon) => sum + Number(addon.price) * addon.quantity,
        0
      );

      const nights = Math.ceil(
        (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) /
          (1000 * 60 * 60 * 24)
      );

      return {
        name: booking.bookingRooms[0]?.roomType?.name || "Unknown",
        booking_id: booking.id,
        room_type_id: booking.bookingRooms[0]?.roomTypeId,
        image_url:
          booking.bookingRooms[0]?.roomType?.roomImages[0]?.imageUrl || null,
        created_at: booking.createdAt,
        check_in_date: booking.checkInDate,
        check_out_date: booking.checkOutDate,
        adults: booking.adults,
        promotion_price:
          Number(booking.bookingRooms[0]?.roomType?.promotionPrice) || 0,
        total_amount: Number(booking.totalAmount),
        additional_requests: booking.additionalRequests,
        payment_method: booking.payments[0]?.paymentMethod || null,
        special_requests_total: addonTotal,
        booking_number: booking.bookingNumber,
        booking_status: booking.bookingStatus,
        guest_name: `${booking.guest.firstName} ${booking.guest.lastName}`,
        nights: nights,
        room_count: booking.bookingRooms.length,
        addons: booking.bookingAddons.map((addon) => ({
          addon_name: addon.addonName,
          quantity: addon.quantity,
          price: Number(addon.price),
          total: Number(addon.price) * addon.quantity,
        })),
      };
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const hasNext = currentPage < totalPages;
    const hasPrev = currentPage > 1;

    return res.status(200).json({
      success: true,
      message: "Booking data retrieved successfully",
      data: formattedBookings,
      pagination: {
        currentPage: currentPage,
        totalPages: totalPages,
        totalItems: totalCount,
        itemsPerPage: itemsPerPage,
        hasNext: hasNext,
        hasPrev: hasPrev,
      },
      count: formattedBookings.length,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    return errorResponse({
      res,
      message: "fail to fetch booked data",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}