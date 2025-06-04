import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { checkIn, checkOut, rooms, guests } = req.query;

    // ตรวจสอบ required parameters
    if (!checkIn || !checkOut || !rooms || !guests) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters: checkIn, checkOut, rooms, guests'
      });
    }

    // แปลงข้อมูลเป็นรูปแบบที่ถูกต้อง
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const roomCount = parseInt(rooms);
    const guestCount = parseInt(guests);

    // Validation ข้อมูล
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date'
      });
    }

    console.log('Search params:', { checkIn, checkOut, rooms, guests });

    // Step 1: หา roomId ที่ถูกจองแล้วในช่วงเวลาที่ต้องการ
    // ใช้ Prisma ORM แทน Raw Query
    const bookedRooms = await prisma.bookingRoom.findMany({
      where: {
        booking: {
          bookingStatus: {
            notIn: ['CANCELLED', 'NO_SHOW']
          },
          OR: [
            {
              // การจองที่เริ่มก่อนหรือในวันเริ่ม และจบหลังวันเริ่ม
              AND: [
                { checkInDate: { lte: checkInDate } },
                { checkOutDate: { gt: checkInDate } }
              ]
            },
            {
              // การจองที่เริ่มก่อนวันจบ และจบในหรือหลังวันจบ  
              AND: [
                { checkInDate: { lt: checkOutDate } },
                { checkOutDate: { gte: checkOutDate } }
              ]
            },
            {
              // การจองที่อยู่ภายในช่วงเวลาที่ต้องการ
              AND: [
                { checkInDate: { gte: checkInDate } },
                { checkOutDate: { lte: checkOutDate } }
              ]
            }
          ]
        }
      },
      select: {
        roomId: true
      }
    });

    const bookedRoomIds = bookedRooms.map(booking => booking.roomId);
    console.log('Booked room IDs:', bookedRoomIds);

    // Step 2: หา RoomType ที่มีห้องว่าง
    const guestsPerRoom = Math.ceil(guestCount / roomCount);
    
    const availableRoomTypes = await prisma.roomType.findMany({
      where: {
        // ต้องมีความจุเพียงพอ
        capacity: {
          gte: guestsPerRoom
        },
        // ต้องมีห้องที่ไม่ได้ถูกจอง
        rooms: {
          some: {
            id: bookedRoomIds.length > 0 ? {
              notIn: bookedRoomIds
            } : {
              not: undefined // หากไม่มีห้องที่ถูกจอง ให้หาห้องทั้งหมด
            }
          }
        }
      },
      include: {
        // ดึงข้อมูล BedType
        bedType: {
          select: {
            id: true,
            bedDescription: true
          }
        },
        // ดึงรูปภาพ default เท่านั้น
        roomImages: {
          where: {
            imageDefault: true
          },
          orderBy: {
            imageOrder: 'asc'
          },
          take: 1,
          select: {
            id: true,
            imageUrl: true,
            imageOrder: true,
            imageDefault: true
          }
        },
        // ดึงห้องที่ว่าง (เอาแค่ห้องแรก)
        rooms: {
          where: {
            id: bookedRoomIds.length > 0 ? {
              notIn: bookedRoomIds
            } : {
              not: undefined
            }
          },
          take: 1,
          select: {
            id: true,
            roomNumber: true
          }
        }
      }
    });

    console.log('Available room types found:', availableRoomTypes.length);

    // Step 3: จัดรูปแบบข้อมูลให้ตรงกับที่ frontend ต้องการ
    const formattedRooms = availableRoomTypes
      .filter(roomType => 
        roomType.rooms.length > 0 // ต้องมีห้องว่างจริงๆ
      )
      .map(roomType => {
        const selectedRoom = roomType.rooms[0];
        
        return {
          id: selectedRoom.id,
          roomType: {
            id: roomType.id,
            name: roomType.name,
            description: roomType.description,
            capacity: roomType.capacity,
            roomSize: roomType.roomSize,
            pricePerNight: roomType.pricePerNight ? Number(roomType.pricePerNight) : 0,
            promotionPrice: roomType.promotionPrice ? Number(roomType.promotionPrice) : null,
            isPromotion: roomType.isPromotion,
            bedType: roomType.bedType ? {
              id: roomType.bedType.id,
              bedDescription: roomType.bedType.bedDescription
            } : null,
            roomImages: roomType.roomImages.map(image => ({
              id: image.id,
              imageUrl: image.imageUrl,
              imageOrder: image.imageOrder,
              imageDefault: image.imageDefault
            }))
          }
        };
      });

    console.log('Formatted rooms count:', formattedRooms.length);

    // ส่งผลลัพธ์กลับ
    res.status(200).json({
      success: true,
      message: 'Available rooms found successfully',
      rooms: formattedRooms,
      searchParams: {
        checkIn,
        checkOut,
        rooms: roomCount,
        guests: guestCount
      },
      totalAvailable: formattedRooms.length,
      debug: process.env.NODE_ENV === 'development' ? {
        bookedRoomIds: bookedRoomIds.length,
        availableRoomTypes: availableRoomTypes.length,
        guestsPerRoom: guestsPerRoom,
        bookedRooms: bookedRoomIds
      } : undefined
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack,
        code: error.code
      } : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
}