// pages/api/booking/delete-expired-booking.js
import { PrismaClient } from '../../../lib/generated/prisma';
// หรือใช้ import prisma from '@/lib/prisma'; ถ้ามี global instance

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log("Delete expired booking API called with method:", req.method);
  console.log("Request body:", req.body);

  if (req.method !== 'DELETE') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    const { bookingId, guestId } = req.body;

    // Validate required data
    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Missing bookingId'
      });
    }

    console.log(`Deleting expired booking ID: ${bookingId}, Guest ID: ${guestId}`);

    // ใช้ transaction เพื่อให้แน่ใจว่าข้อมูลถูกลบครบ
    const result = await prisma.$transaction(async (tx) => {
      
      // 1. ลบ BookingAddon ก่อน (ถ้ามี)
      const deletedAddons = await tx.bookingAddon.deleteMany({
        where: {
          bookingId: parseInt(bookingId)
        }
      });
      console.log(`Deleted ${deletedAddons.count} booking addons`);

      // 2. ลบ Payment records
      const deletedPayments = await tx.payment.deleteMany({
        where: {
          bookingId: parseInt(bookingId)
        }
      });
      console.log(`Deleted ${deletedPayments.count} payment records`);

      // 3. ลบ BookingRoom
      const deletedBookingRooms = await tx.bookingRoom.deleteMany({
        where: {
          bookingId: parseInt(bookingId)
        }
      });
      console.log(`Deleted ${deletedBookingRooms.count} booking rooms`);

      // 4. ลบ Booking
      const deletedBooking = await tx.booking.delete({
        where: {
          id: parseInt(bookingId)
        }
      });
      console.log(`Deleted booking with ID: ${deletedBooking.id}`);

      // 5. ลบ Guest (ถ้าไม่มี booking อื่น)
      if (guestId) {
        // ตรวจสอบว่า guest มี booking อื่นหรือไม่
        const remainingBookings = await tx.booking.findMany({
          where: {
            guestId: parseInt(guestId)
          }
        });

        if (remainingBookings.length === 0) {
          const deletedGuest = await tx.guest.delete({
            where: {
              id: parseInt(guestId)
            }
          });
          console.log(`Deleted guest with ID: ${deletedGuest.id}`);
          
          return {
            deletedBooking,
            deletedGuest,
            deletedBookingRooms: deletedBookingRooms.count,
            deletedPayments: deletedPayments.count,
            deletedAddons: deletedAddons.count
          };
        }
      }

      return {
        deletedBooking,
        deletedGuest: null,
        deletedBookingRooms: deletedBookingRooms.count,
        deletedPayments: deletedPayments.count,
        deletedAddons: deletedAddons.count
      };
    });

    console.log("Deletion completed successfully:", result);

    res.status(200).json({
      success: true,
      message: 'Expired booking deleted successfully',
      data: result
    });

  } catch (error) {
    console.error('Error deleting expired booking:', error);
    
    // Detailed error response
    const errorResponse = {
      success: false,
      message: 'Failed to delete expired booking',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };

    // Check for specific Prisma errors
    if (error.code) {
      errorResponse.prismaCode = error.code;
      errorResponse.prismaMessage = error.message;
    }

    res.status(500).json(errorResponse);
  } finally {
    await prisma.$disconnect();
  }
}