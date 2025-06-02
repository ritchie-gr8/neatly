// pages/api/payment/get-room-booking-data.js
import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // ตรวจสอบ HTTP Method
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Only GET is supported.' 
    });
  }

  try {  
    // รับ parameters จาก query
    const { roomTypeId, roomId, checkIn, checkOut, adults = 1, rooms = 1 } = req.query;
    
    console.log("📥 Received parameters:", { roomTypeId, roomId, checkIn, checkOut, adults, rooms });
    
    // ตรวจสอบ required parameters
    if (!roomTypeId || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'roomTypeId, checkIn, and checkOut are required'
      });
    }

    // ✅ ถ้ามี roomId จะดึงข้อมูลห้องเฉพาะ ถ้าไม่มีจะใช้ห้องแรกที่หาเจอ
    let selectedRoom = null;
    if (roomId) {
      selectedRoom = await prisma.room.findUnique({
        where: { id: parseInt(roomId) },
        include: {
          roomType: { include: { bedType: true } },
          roomStatus: true
        }
      });
    }

    // ดึงข้อมูลประเภทห้อง
    const roomType = await prisma.roomType.findUnique({
      where: {
        id: parseInt(roomTypeId)
      },
      include: {
        // ข้อมูลประเภทเตียง
        bedType: {
          select: {
            id: true,
            bedDescription: true
          }
        },
        // รูปภาพห้อง
        roomImages: {
          select: {
            id: true,
            imageUrl: true,
            imageOrder: true,
            imageDefault: true
          },
          orderBy: {
            imageOrder: 'asc'
          }
        },
        // สิ่งอำนวยความสะดวก
        roomAmniety: {
          select: {
            id: true,
            name: true,
            order: true
          },
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    // ตรวจสอบว่าพบข้อมูลห้องหรือไม่
    if (!roomType) {
      return res.status(404).json({
        success: false,
        message: 'Room type not found'
      });
    }

    // คำนวณจำนวนคืน
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // คำนวณราคา
    const pricePerNight = roomType.isPromotion && roomType.promotionPrice 
      ? parseFloat(roomType.promotionPrice)
      : parseFloat(roomType.pricePerNight || 0);
    
    const subtotal = pricePerNight * nights;

    // ✅ Mock booking data (จำลองข้อมูลการจอง)
    const mockBookingData = {
      // ข้อมูลการจองหลัก (ยังไม่ได้สร้างจริงในฐานข้อมูล)
      booking: {
        id: null, // ยังไม่มี ID เพราะยังไม่ได้สร้าง
        bookingNumber: `TEMP-${Date.now()}`, // เลขจองชั่วคราว
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adults: parseInt(adults),
        nights: nights,
        totalAmount: subtotal,
        bookingStatus: 'DRAFT', // สถานะร่าง
        additionalRequests: null,
        createdAt: new Date()
      },
      
      // ข้อมูลผู้เข้าพัก (ยังไม่มี)
      guest: {
        id: null,
        firstName: null,
        lastName: null,
        fullName: 'Guest Information Required',
        email: null,
        phone: null,
        country: null,
        dateOfBirth: null
      },
      
      // ข้อมูลห้องที่เลือก
      rooms: [{
        roomId: selectedRoom?.id || null,
        roomNumber: selectedRoom?.roomNumber || 'TBD',
        pricePerNight: pricePerNight,
        
        // ข้อมูลประเภทห้อง
        roomType: {
          id: roomType.id,
          name: roomType.name,
          description: roomType.description,
          capacity: roomType.capacity,
          roomSize: roomType.roomSize,
          pricePerNight: parseFloat(roomType.pricePerNight || 0),
          promotionPrice: roomType.promotionPrice ? parseFloat(roomType.promotionPrice) : null,
          isPromotion: roomType.isPromotion,
          
          // ข้อมูลเตียง
          bedType: roomType.bedType ? {
            id: roomType.bedType.id,
            description: roomType.bedType.bedDescription
          } : null,
          
          // รูปภาพห้อง
          images: roomType.roomImages.map(img => ({
            id: img.id,
            url: img.imageUrl,
            order: img.imageOrder,
            isDefault: img.imageDefault
          })),

          // สิ่งอำนวยความสะดวก
          amenities: roomType.roomAmniety.map(amenity => ({
            id: amenity.id,
            name: amenity.name,
            order: amenity.order
          }))
        }
      }],
      
      // ข้อมูลสรุป
      summary: {
        totalRooms: parseInt(rooms),
        totalGuests: parseInt(adults),
        totalNights: nights,
        totalAmount: subtotal,
        averagePricePerNight: pricePerNight,
        subtotal: subtotal,
        specialRequestsTotal: 0, // จะอัพเดทเมื่อเลือก special requests
        finalTotal: subtotal
      },

      // ข้อมูลพิเศษสำหรับ development
      meta: {
        isTemporary: true, // บอกว่าเป็นข้อมูลชั่วคราว
        source: 'room-selection',
        searchParams: {
          roomTypeId: parseInt(roomTypeId),
          roomId: roomId ? parseInt(roomId) : null,
          checkIn,
          checkOut,
          adults: parseInt(adults),
          rooms: parseInt(rooms)
        }
      }
    };

    // ส่งข้อมูลกลับ
    res.status(200).json({
      success: true,
      message: 'Room booking data prepared successfully',
      data: mockBookingData
    });

  } catch (error) {
    console.error("❌ API Error:", error);
    
    // จัดการ Error ตามประเภท
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Room type not found'
      });
    }
    
    // Error ทั่วไป
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        error: {
          message: error.message,
          code: error.code,
          stack: error.stack
        }
      })
    });
    
  } finally {
    await prisma.$disconnect();
  }
}