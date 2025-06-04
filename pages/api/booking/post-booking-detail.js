import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

// ฟังก์ชันสร้าง booking number
function generateBookingNumber() {
  const now = new Date();
  const year = now.getFullYear().toString().substr(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const time = now.getTime().toString().substr(-6);
  return `BK${year}${month}${day}${time}`;
}

export default async function handler(req, res) {
  console.log("API called with method:", req.method);
  console.log("Request body:", req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    const {
      guest,
      booking,
      bookingRoom,
      specialRequests,
      payment
    } = req.body;

    // Validate required data
    if (!guest || !booking || !bookingRoom || !payment) {
      return res.status(400).json({
        success: false,
        message: 'Missing required data',
        received: { guest: !!guest, booking: !!booking, bookingRoom: !!bookingRoom, payment: !!payment }
      });
    }

    console.log("Starting database transaction...");

    // ใช้ transaction เพื่อให้แน่ใจว่าข้อมูลถูกบันทึกครบ
    const result = await prisma.$transaction(async (tx) => {
      console.log("Creating guest...");
      
      // 1. สร้าง Guest ก่อน
      const newGuest = await tx.guest.create({
        data: {
          firstName: guest.firstName,
          lastName: guest.lastName,
          email: guest.email,
          phone: guest.phone,
          country: guest.country,
          dateOfBirth: guest.dateOfBirth ? new Date(guest.dateOfBirth) : null,
        }
      });

      console.log("Guest created with ID:", newGuest.id);

      // 2. สร้าง Booking โดยใช้ guestId ที่ได้
      const bookingNumber = generateBookingNumber();
      console.log("Creating booking with number:", bookingNumber);

      const newBooking = await tx.booking.create({
        data: {
          bookingNumber: bookingNumber,
          guestId: newGuest.id,
          checkInDate: new Date(booking.checkInDate),
          checkOutDate: new Date(booking.checkOutDate),
          adults: parseInt(booking.adults),
          additionalRequests: booking.additionalRequests || null,
          totalAmount: parseFloat(booking.totalAmount),
          bookingStatus: 'PENDING'
        }
      });

      console.log("Booking created with ID:", newBooking.id);

      // 3. สร้าง BookingRoom โดยใช้ bookingId ที่ได้
      console.log("Creating booking room...");
      
      const newBookingRoom = await tx.bookingRoom.create({
        data: {
          bookingId: newBooking.id,
          roomId: parseInt(bookingRoom.roomId),
          roomTypeId: parseInt(bookingRoom.roomTypeId),
          pricePerNight: parseFloat(bookingRoom.pricePerNight)
        }
      });

      console.log("BookingRoom created with ID:", newBookingRoom.id);

      // 4. สร้าง BookingAddon สำหรับ special requests (ถ้ามี)
      if (specialRequests && specialRequests.length > 0) {
        console.log("Creating special requests...");
        
        const addons = specialRequests.map(request => ({
          bookingId: newBooking.id,
          addonName: request.displayName,
          quantity: 1,
          price: parseFloat(request.price)
        }));

        await tx.bookingAddon.createMany({
          data: addons
        });
      }

      // 5. สร้าง Payment record
      console.log("Creating payment record...");
      
      const newPayment = await tx.payment.create({
        data: {
          bookingId: newBooking.id,
          amount: parseFloat(payment.totalAmount),
          paymentMethod: payment.method === 'credit' ? 'CREDIT_CARD' : 'CASH',
          paymentStatus: 'PENDING'
        }
      });

      console.log("Payment created with ID:", newPayment.id);

      return {
        guest: newGuest,
        booking: newBooking,
        bookingRoom: newBookingRoom,
        payment: newPayment
      };
    });

    console.log("Transaction completed successfully");

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: result
    });

  } catch (error) {
    console.error('Detailed error creating booking:', error);
    
    // More detailed error response
    const errorResponse = {
      success: false,
      message: 'Failed to create booking',
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