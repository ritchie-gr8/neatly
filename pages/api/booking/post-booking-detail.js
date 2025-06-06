// ไฟล์ pages/api/booking/post-booking-detail.js (เวอร์ชันแก้ไขเพิ่มเติม)
import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

function generateBookingNumber() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const time = now.getTime().toString().slice(-6);
  return `BK${year}${month}${day}${time}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const {
      userId,
      guest,
      booking,
      bookingRoom,
      specialRequests,
      payment
    } = req.body;

    // บันทึกข้อมูลที่ได้รับเพื่อดีบัก
    console.log('Received data:', JSON.stringify({
      userId,
      guest,
      booking,
      bookingRoom,
      payment
    }, null, 2));

    if (!userId || !guest || !booking || !bookingRoom || !payment) {
      return res.status(400).json({
        success: false,
        message: 'Missing required data',
        received: { userId: !!userId, guest: !!guest, booking: !!booking, bookingRoom: !!bookingRoom, payment: !!payment }
      });
    }

    // ตรวจสอบว่ามี roomId และ roomTypeId ที่ถูกต้องหรือไม่
    if (!bookingRoom.roomId || !bookingRoom.roomTypeId) {
      return res.status(400).json({
        success: false,
        message: 'Room ID and Room Type ID are required',
        received: { roomId: bookingRoom.roomId, roomTypeId: bookingRoom.roomTypeId }
      });
    }

    // แปลงค่าให้เป็น integer ที่ถูกต้อง
    const roomId = parseInt(bookingRoom.roomId);
    const roomTypeId = parseInt(bookingRoom.roomTypeId);

    // ตรวจสอบความถูกต้องของค่า
    if (isNaN(roomId) || isNaN(roomTypeId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Room ID or Room Type ID',
        received: { roomId: bookingRoom.roomId, roomTypeId: bookingRoom.roomTypeId }
      });
    }

    // ตรวจสอบว่ามีห้องพักนี้อยู่จริงหรือไม่ (ก่อนเริ่ม transaction)
    const roomExists = await prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!roomExists) {
      return res.status(404).json({
        success: false,
        message: `Room with ID ${roomId} not found`,
        detail: 'The selected room does not exist in the database'
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. สร้าง Guest
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

      // 2. สร้าง Booking
      const newBooking = await tx.booking.create({
        data: {
          userId: userId,
          bookingNumber: generateBookingNumber(),
          guestId: newGuest.id,
          checkInDate: new Date(booking.checkInDate),
          checkOutDate: new Date(booking.checkOutDate),
          adults: parseInt(booking.adults),
          additionalRequests: booking.additionalRequests || null,
          totalAmount: parseFloat(booking.totalAmount),
          bookingStatus: 'PENDING'
        }
      });

      // 3. สร้าง BookingRoom
      const newBookingRoom = await tx.bookingRoom.create({
        data: {
          bookingId: newBooking.id,
          roomId: roomId,
          roomTypeId: roomTypeId,
          pricePerNight: parseFloat(bookingRoom.pricePerNight)
        }
      });

      // 4. สร้าง BookingAddon สำหรับ special requests (ถ้ามี)
      if (specialRequests && specialRequests.length > 0) {
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
      const newPayment = await tx.payment.create({
        data: {
          bookingId: newBooking.id,
          amount: parseFloat(payment.totalAmount),
          paymentMethod: payment.method === 'credit' ? 'CREDIT_CARD' : 'CASH',
          paymentStatus: 'PENDING'
        }
      });

      return {
        guest: newGuest,
        booking: newBooking,
        bookingRoom: newBookingRoom,
        payment: newPayment
      };
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: result
    });

  } catch (error) {
    console.error('Detailed error creating booking:', error);

    // กำหนดสถานะ HTTP ที่เหมาะสมกับประเภทของข้อผิดพลาด
    let statusCode = 500;

    if (error.code === 'P2003') {
      // Foreign key constraint error
      statusCode = 400;
    } else if (error.code === 'P2002') {
      // Unique constraint error
      statusCode = 409;
    }

    const errorResponse = {
      success: false,
      message: 'Failed to create booking',
      error: error.message
    };

    if (error.code) {
      errorResponse.prismaCode = error.code;

      // เพิ่มข้อความแสดงข้อผิดพลาดที่เข้าใจง่ายขึ้น
      if (error.code === 'P2003' && error.meta?.field_name.includes('room_id')) {
        errorResponse.message = 'ห้องพักที่เลือกไม่มีอยู่ในระบบ กรุณาเลือกห้องพักอื่น';
      }
    }

    res.status(statusCode).json(errorResponse);
  } finally {
    await prisma.$disconnect();
  }
}
