import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      roomId,
      roomTypeId,
      checkIn,
      checkOut,
      rooms,
      guests,
      nights,
      finalPrice,
      totalPrice,
    } = req.body;

    if (!roomId || !roomTypeId || !checkIn || !checkOut || !rooms || !guests) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // ขั้นที่ 1: สร้าง Guest record ชั่วคราว (mock data)
    console.log("👤 Creating temporary guest...");
    const tempGuest = await prisma.guest.create({
      data: {
        firstName: "Temporary", // จะถูก update ทีหลัง
        lastName: "Guest", // จะถูก update ทีหลัง
        email: "temp@example.com", // จะถูก update ทีหลัง
        phone: "000-000-0000", // จะถูก update ทีหลัง
        country: "TH",
      },
    });

    // สร้าง booking number (format: BOOK-YYYYMMDD-XXXXX)
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
    const bookingNumber = `BOOK-${dateStr}-${randomNum}`;

    const booking = await prisma.booking.create({
        data: {
          bookingNumber: bookingNumber,
          guestId: tempGuest.id,
          checkInDate: new Date(checkIn),
          checkOutDate: new Date(checkOut),
          adults: parseInt(guests),
          totalAmount: parseFloat(totalPrice),
          bookingStatus: 'PENDING', // สถานะเริ่มต้น
          additionalRequests: null // จะถูก update ทีหลัง
        }
      });

    // ขั้นที่ 3: สร้าง BookingRoom record
    const bookingRoom = await prisma.bookingRoom.create({
      data: {
        bookingId: booking.id,
        roomId: parseInt(roomId),
        roomTypeId: parseInt(roomTypeId),
        pricePerNight: parseFloat(finalPrice)
      }
    });

     // ส่งข้อมูลกลับ
     const response = {
        success: true,
        message: 'Booking session created successfully',
        data: {
          bookingId: booking.id,
          bookingNumber: booking.bookingNumber,
          guestId: tempGuest.id,
          status: booking.bookingStatus,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 นาทีจากตอนนี้ หมดเวลา
        }
      };

      res.status(201).json(response);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
