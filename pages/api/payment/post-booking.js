import { errorResponse, successResponse } from "@/lib/response-utils";
import { HTTP_STATUS } from "@/constants/http-status";
import { db } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return errorResponse({
      res,
      message: "Method not allowed",
      status: HTTP_STATUS.METHOD_NOT_ALLOWED,
    });
  }

  const {
    // Guest information
    firstName,
    lastName,
    email,
    phone,
    country,
    dateOfBirth,
    
    // Booking information
    checkInDate,
    checkOutDate,
    adults,
    additionalRequests = "",
    
    // Room selection
    selectedRooms = [], // Array of { roomId, roomTypeId, quantity? }
    
    // Optional payment information (if needed)
    paymentMethod = "CREDIT_CARD",
  } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !checkInDate || !checkOutDate || !selectedRooms.length) {
    return errorResponse({
      res,
      message: "Required fields are missing: firstName, lastName, email, checkInDate, checkOutDate, selectedRooms",
      status: HTTP_STATUS.BAD_REQUEST,
    });
  }

  // Validate date format and logic
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  
  if (checkIn >= checkOut) {
    return errorResponse({
      res,
      message: "Check-out date must be after check-in date",
      status: HTTP_STATUS.BAD_REQUEST,
    });
  }

  if (checkIn < new Date()) {
    return errorResponse({
      res,
      message: "Check-in date cannot be in the past",
      status: HTTP_STATUS.BAD_REQUEST,
    });
  }

  try {
    // Start transaction
    const result = await db.$transaction(async (tx) => {
      
      // 1. Create or find guest (ใช้ตาราง Guests)
      let guest = await tx.guest.findFirst({
        where: { email: email.toLowerCase() }
      });

      if (!guest) {
        guest = await tx.guest.create({
          data: {
            firstName,
            lastName,
            email: email.toLowerCase(),
            phone: phone || null,
            country: country || null,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        });
      } else {
        // Update existing guest info if needed
        guest = await tx.guest.update({
          where: { id: guest.id },
          data: {
            firstName,
            lastName,
            phone: phone || guest.phone,
            country: country || guest.country,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : guest.dateOfBirth,
            updatedAt: new Date(),
          }
        });
      }

      // 2. Validate room availability and get room/roomType data (ตาราง Rooms, RoomTypes)
      const roomData = [];
      let totalAmount = 0;
      
      for (const selectedRoom of selectedRooms) {
        const { roomId, quantity = 1 } = selectedRoom;
        
        // Get room details from Rooms table with RoomType relation
        const room = await tx.room.findUnique({
          where: { id: roomId },
          include: {
            roomType: true,
            roomStatus: true
          }
        });

        if (!room) {
          throw new Error(`Room with ID ${roomId} not found`);
        }

        // Check room availability through roomStatus
        if (room.roomStatus?.statusName !== 'AVAILABLE') {
          throw new Error(`Room ${room.roomNumber} is not available`);
        }

        // Calculate price (use promotion price if available)
        const pricePerNight = room.roomType.isPromotion && room.roomType.promotionPrice 
          ? room.roomType.promotionPrice 
          : room.roomType.pricePerNight;

        // Calculate nights
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const roomTotal = pricePerNight * nights * quantity;
        totalAmount += parseFloat(roomTotal);

        roomData.push({
          room,
          roomType: room.roomType,
          pricePerNight,
          quantity,
          totalPrice: roomTotal,
          nights
        });
      }

      // 3. Generate booking number
      const bookingCount = await tx.booking.count();
      const bookingNumber = `BK${String(bookingCount + 1).padStart(6, '0')}`;

      // 4. Create booking (ตาราง Bookings)
      const booking = await tx.booking.create({
        data: {
          bookingNumber,
          guestId: guest.id,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          adults,
          totalAmount,
          bookingStatus: 'PENDING',
          additionalRequests,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      });

      // 5. Create booking rooms (ตาราง BookingRooms)
      const bookingRooms = [];
      for (const data of roomData) {
        for (let i = 0; i < data.quantity; i++) {
          const bookingRoom = await tx.bookingRoom.create({
            data: {
              bookingId: booking.id,
              roomId: data.room.id,
              roomTypeId: data.room.roomTypeId,
              pricePerNight: data.pricePerNight,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          });
          bookingRooms.push(bookingRoom);
        }

        // 6. Update room status to BOOKED (ผ่าน RoomStatus)
        const bookedStatus = await tx.roomStatus.findFirst({
          where: { statusName: 'BOOKED' }
        });
        
        if (bookedStatus) {
          await tx.room.update({
            where: { id: data.room.id },
            data: { 
              roomStatusId: bookedStatus.id,
              updatedAt: new Date(),
            }
          });
        }
      }

      // 7. Create initial payment record (ตาราง Payments)
      const payment = await tx.payment.create({
        data: {
          bookingId: booking.id,
          amount: totalAmount,
          paymentMethod,
          paymentStatus: 'PENDING',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      });

      return {
        booking,
        guest,
        bookingRooms,
        roomData,
        payment
      };
    });

    // 8. Format response data
    const responseData = {
      bookingId: result.booking.id,
      bookingNumber: result.booking.bookingNumber,
      status: result.booking.bookingStatus,
      checkInDate: result.booking.checkInDate,
      checkOutDate: result.booking.checkOutDate,
      totalAmount: parseFloat(result.booking.totalAmount),
      guest: {
        id: result.guest.id,
        firstName: result.guest.firstName,
        lastName: result.guest.lastName,
        email: result.guest.email,
        phone: result.guest.phone,
        country: result.guest.country,
        dateOfBirth: result.guest.dateOfBirth,
      },
      rooms: result.roomData.map(data => ({
        roomId: data.room.id,
        roomNumber: data.room.roomNumber,
        roomType: {
          id: data.roomType.id,
          name: data.roomType.name,
          description: data.roomType.description,
          capacity: data.roomType.capacity,
          roomSize: data.roomType.roomSize,
          pricePerNight: parseFloat(data.roomType.pricePerNight),
          promotionPrice: data.roomType.promotionPrice ? parseFloat(data.roomType.promotionPrice) : null,
          isPromotion: data.roomType.isPromotion,
        },
        pricePerNight: parseFloat(data.pricePerNight),
        quantity: data.quantity,
        nights: data.nights,
        totalPrice: parseFloat(data.totalPrice),
      })),
      payment: {
        id: result.payment.id,
        amount: parseFloat(result.payment.amount),
        paymentMethod: result.payment.paymentMethod,
        paymentStatus: result.payment.paymentStatus,
      },
      createdAt: result.booking.createdAt,
    };

    return successResponse({
      res,
      message: "Booking created successfully",
      data: {
        booking: responseData
      },
      success: true 
    });

  } catch (error) {
    console.error("Booking creation error:", error);
    
    return errorResponse({
      res,
      message: `Failed to create booking: ${error.message}`,
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}

// Usage example for the request body:
/*
POST /api/bookings

{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john.doe@example.com",
  "phone": "+66123456789",
  "country": "Thailand",
  "dateOfBirth": "1990-01-15",
  "checkInDate": "2025-06-01",
  "checkOutDate": "2025-06-03", 
  "adults": 2,
  "selectedRooms": [
    {
      "roomId": 1,
      "quantity": 1
    }
  ],
  "additionalRequests": "Late check-in requested",
  "paymentMethod": "CREDIT_CARD"
}
*/