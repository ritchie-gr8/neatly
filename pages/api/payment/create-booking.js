// pages/api/payment/create-booking.js (Updated with Prisma integration)
import { db } from "@/lib/prisma";

// ฟังก์ชันเปรียบเทียบวันที่แบบไม่สนใจเวลา
function isDateBefore(a, b) {
  return (
    a.getFullYear() < b.getFullYear() ||
    (a.getFullYear() === b.getFullYear() && a.getMonth() < b.getMonth()) ||
    (a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() < b.getDate())
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      roomId,
      checkInDate,
      checkOutDate,
      adults,
      rooms,
      totalAmount,
      roomDetails
    } = req.body;

    // Validate required fields
    if (!roomId || !checkInDate || !checkOutDate || !adults || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Parse and validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const now = new Date();
    
    if (checkIn >= checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date'
      });
    }

    // ใช้ฟังก์ชันเปรียบเทียบวันที่แบบไม่สนใจเวลา
    if (isDateBefore(checkIn, now)) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past'
      });
    }

    // Clean up expired bookings first (maintenance)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    console.log("🧹 Cleaning up expired temporary bookings...");
    
    try {
      // Find expired bookings first
      const expiredBookings = await db.booking.findMany({
        where: {
          bookingStatus: 'PENDING',
          createdAt: {
            lt: fiveMinutesAgo
          },
          // Only delete bookings that haven't been confirmed
          payments: {
            none: {
              paymentStatus: 'PAID'
            }
          }
        },
        select: {
          id: true
        }
      });

      if (expiredBookings.length > 0) {
        // Delete in correct order: BookingRooms first, then Bookings
        const bookingIds = expiredBookings.map(b => b.id);
        
        // Delete BookingRooms first
        const deletedBookingRooms = await db.bookingRoom.deleteMany({
          where: {
            bookingId: {
              in: bookingIds
            }
          }
        });
        
        // Delete Payments
        const deletedPayments = await db.payment.deleteMany({
          where: {
            bookingId: {
              in: bookingIds
            }
          }
        });
        
        // Finally delete Bookings
        const deletedBookings = await db.booking.deleteMany({
          where: {
            id: {
              in: bookingIds
            }
          }
        });
        
        console.log(`🗑️ Cleaned up: ${deletedBookings.count} bookings, ${deletedBookingRooms.count} booking rooms, ${deletedPayments.count} payments`);
      }
    } catch (cleanupError) {
      console.error("⚠️ Error during cleanup (continuing anyway):", cleanupError.message);
    }

    // Check if room is available (not already booked in overlapping dates)
    const existingBooking = await db.booking.findFirst({
      where: {
        bookingRooms: {
          some: {
            roomId: parseInt(roomId)
          }
        },
        bookingStatus: {
          in: ['PENDING', 'CONFIRMED', 'CHECKED_IN']
        },
        OR: [
          {
            AND: [
              { checkInDate: { lte: checkIn } },
              { checkOutDate: { gt: checkIn } }
            ]
          },
          {
            AND: [
              { checkInDate: { lt: checkOut } },
              { checkOutDate: { gte: checkOut } }
            ]
          },
          {
            AND: [
              { checkInDate: { gte: checkIn } },
              { checkOutDate: { lte: checkOut } }
            ]
          }
        ]
      }
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'Room is not available for the selected dates'
      });
    }

    // Start transaction to create booking data
    const result = await db.$transaction(async (tx) => {
      
      // 1. Create guest record (temporary guest for booking)
      const guest = await tx.guest.create({
        data: {
          firstName: "Temporary", // Will be updated when user fills payment form
          lastName: "Guest",
          email: "temp@booking.com",
          phone: null,
          country: null,
          dateOfBirth: null,
        }
      });

      // 2. Generate booking number
      const bookingCount = await tx.booking.count();
      const bookingNumber = `TEMP-${String(bookingCount + 1).padStart(6, '0')}`;

      // 3. Calculate pricing details
      const guestsCount = parseInt(adults) || 1;
      const roomsRequested = parseInt(rooms) || 1;
      
      // Get room data to calculate actual rooms needed
      const roomData = await tx.room.findUnique({
        where: { id: parseInt(roomId) },
        include: { 
          roomType: true 
        }
      });
      
      if (!roomData) {
        throw { code: 404, message: `Room with ID ${roomId} not found` };
      }
      
      const roomCapacity = roomData.roomType?.capacity || 1;
      const basePricePerNight = parseFloat(
        roomData.roomType?.isPromotion && roomData.roomType?.promotionPrice 
          ? roomData.roomType.promotionPrice 
          : roomData.roomType?.pricePerNight || 0
      );
      
      // Calculate actual rooms needed based on guests and capacity
      const roomsNeededForGuests = Math.ceil(guestsCount / roomCapacity);
      const actualRoomsNeeded = Math.max(roomsNeededForGuests, roomsRequested);
      
      // Calculate nights
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      
      // Calculate total price per night for all rooms
      const totalPricePerNight = basePricePerNight * actualRoomsNeeded;
      
      // Calculate grand total
      const grandTotal = totalPricePerNight * nights;

      console.log("💰 Pricing Calculation:", {
        guestsCount,
        roomsRequested,
        roomCapacity,
        roomsNeededForGuests,
        actualRoomsNeeded,
        basePricePerNight,
        totalPricePerNight,
        nights,
        grandTotal
      });

      // 4. Create booking record
      const booking = await tx.booking.create({
        data: {
          bookingNumber,
          guestId: guest.id,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          adults: guestsCount,
          totalAmount: grandTotal, // Store calculated total
          bookingStatus: 'PENDING',
          additionalRequests: '', // Will be filled later in payment form
        }
      });

      // 5. Create booking room records (one for each room needed)
      const bookingRooms = [];
      for (let i = 0; i < actualRoomsNeeded; i++) {
        const bookingRoom = await tx.bookingRoom.create({
          data: {
            bookingId: booking.id,
            roomId: parseInt(roomId),
            roomTypeId: roomData.roomTypeId,
            pricePerNight: totalPricePerNight, // Store total price for all rooms per night
          }
        });
        bookingRooms.push(bookingRoom);
      }

      // 6. Create initial payment record
      await tx.payment.create({
        data: {
          bookingId: booking.id,
          amount: grandTotal,
          paymentMethod: 'CREDIT_CARD', // Default, will be updated
          paymentStatus: 'PENDING',
        }
      });

      return { 
        booking, 
        guest, 
        roomData, 
        bookingRooms,
        pricingDetails: {
          actualRoomsNeeded,
          basePricePerNight,
          totalPricePerNight,
          nights,
          grandTotal
        }
      };
    });

    // 6. Format response with all the data needed for get-booking-detail
    const bookingId = `NEAT-${result.booking.id}-${Date.now()}`;
    
    // Store mapping in memory for get-booking-detail API to find
    // This bridges the old system with the new database system
    global.bookings = global.bookings || {};
    global.bookings[bookingId] = {
      id: bookingId,
      databaseBookingId: result.booking.id, // Link to actual DB record
      roomId: parseInt(roomId),
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      adults: result.pricingDetails.actualRoomsNeeded > 1 ? parseInt(adults) : parseInt(adults), // Keep original guest count
      rooms: result.pricingDetails.actualRoomsNeeded, // Actual rooms needed
      totalAmount: result.pricingDetails.grandTotal, // Use calculated total
      roomDetails: {
        ...roomDetails,
        // Update with calculated values
        actualRoomsNeeded: result.pricingDetails.actualRoomsNeeded,
        basePricePerNight: result.pricingDetails.basePricePerNight,
        totalPricePerNight: result.pricingDetails.totalPricePerNight,
        nights: result.pricingDetails.nights,
        roomType: result.roomData.roomType?.name,
        capacity: result.roomData.roomType?.capacity,
        pricePerNight: result.pricingDetails.basePricePerNight,
        promotionPrice: result.roomData.roomType?.promotionPrice,
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      originalSearchData: {
        selectedRooms: parseInt(rooms) || 1, // Original rooms requested
        selectedGuests: parseInt(adults) || 1, // Original guests
        actualRoomsNeeded: result.pricingDetails.actualRoomsNeeded, // Calculated rooms needed
        totalPricePerNight: result.pricingDetails.totalPricePerNight, // Total price per night for all rooms
        basePricePerNight: result.pricingDetails.basePricePerNight, // Price per room per night
      }
    };

    console.log("✅ Temporary booking created:", {
      bookingId,
      databaseId: result.booking.id,
      roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      originalGuests: parseInt(adults),
      actualRoomsNeeded: result.pricingDetails.actualRoomsNeeded,
      basePricePerNight: result.pricingDetails.basePricePerNight,
      totalPricePerNight: result.pricingDetails.totalPricePerNight,
      grandTotal: result.pricingDetails.grandTotal
    });

    return res.status(201).json({
      success: true,
      bookingId,
      message: 'Booking created successfully',
      data: {
        databaseBookingId: result.booking.id,
        expiresIn: 300, // 5 minutes in seconds
        expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Error creating booking:', error);
    
    if (error.code === 404) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
}