import { PrismaClient } from '@/lib/generated/prisma';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ 
      success: false, 
      message: "Method not allowed" 
    });
  }

  try {
    const { booking_id, check_in_date, check_out_date } = req.body;

    console.log("Request data:", { booking_id, check_in_date, check_out_date });

    if (!booking_id || !check_in_date || !check_out_date) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required information' 
      });
    }

    const existingBooking = await prisma.booking.findFirst({
      where: {
        id: parseInt(booking_id)
      },
      include: {
        bookingRooms: {
          include: {
            roomType: true
          }
        }
      }
    });

    console.log("Existing booking:", existingBooking);

    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    const roomTypeId = existingBooking.bookingRooms[0]?.roomTypeId;

    if (!roomTypeId) {
      return res.status(404).json({
        success: false,
        message: "Room data not found for this booking"
      });
    }

    const newCheckIn = new Date(check_in_date);
    const newCheckOut = new Date(check_out_date);

    const conflictingBookings = await prisma.booking.findMany({
      where: {
        id: { not: parseInt(booking_id) }, 
        
        AND: [
          {
            checkInDate: { lt: newCheckOut }  
          },
          {
            checkOutDate: { gt: newCheckIn } 
          }
        ],
        
        bookingRooms: {
          some: {
            roomTypeId: roomTypeId
          }
        },
        
        bookingStatus: {
          notIn: ['CANCELLED']
        }
      },
      select: {
        id: true,
        checkInDate: true,
        checkOutDate: true,
        bookingStatus: true
      }
    });


    if (conflictingBookings.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Sorry, room not available for the selected dates",
        validation_error: true,
        debug: {
          conflictingBookings: conflictingBookings.map(b => ({
            booking_id: b.id,
            check_in: b.checkInDate,
            check_out: b.checkOutDate,
            status: b.bookingStatus
          }))
        }
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: parseInt(booking_id)
      },
      data: {
        checkInDate: newCheckIn,
        checkOutDate: newCheckOut,
        updatedAt: new Date()
      }
    });

    return res.status(200).json({
      success: true,
      message: "Date changed successfully",
      data: updatedBooking
    });

  } catch (error) {
    console.error("Error updating booking dates:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}