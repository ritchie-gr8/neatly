// /pages/api/rooms/get-room-available.js
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

    if (!checkIn || !checkOut || !rooms || !guests) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters: checkIn, checkOut, rooms, guests'
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const roomCount = parseInt(rooms);
    const guestCount = parseInt(guests);


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

    console.log('ค้นหาห้องสำหรับ:', {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      rooms: roomCount,
      guests: guestCount
    });

    // ค้นหา RoomTypes ที่มีห้องจริงอยู่และไม่ถูกจอง
    const availableRoomTypes = await prisma.roomType.findMany({
      where: {
        // ต้องมีห้องจริงอยู่ในตาราง Rooms
        rooms: {
          some: {
            // ห้องต้องไม่ถูกจองในช่วงวันที่เลือก
            NOT: {
              bookingRooms: {
                some: {
                  booking: {
                    AND: [
                      // booking ยังไม่ถูกยกเลิก
                      {
                        bookingStatus: {
                          notIn: ['CANCELLED', 'NO_SHOW']
                        }
                      },
                      // วันที่ทับซ้อนกัน
                      {
                        OR: [
                          // กรณีที่ 1: checkIn อยู่ระหว่างการจองที่มีอยู่
                          {
                            AND: [
                              { checkInDate: { lte: checkInDate } },
                              { checkOutDate: { gt: checkInDate } }
                            ]
                          },
                          // กรณีที่ 2: checkOut อยู่ระหว่างการจองที่มีอยู่
                          {
                            AND: [
                              { checkInDate: { lt: checkOutDate } },
                              { checkOutDate: { gte: checkOutDate } }
                            ]
                          },
                          // กรณีที่ 3: การจองใหม่ครอบคลุมการจองที่มีอยู่
                          {
                            AND: [
                              { checkInDate: { gte: checkInDate } },
                              { checkOutDate: { lte: checkOutDate } }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      },
      include: {
        bedType: true,
        roomImages: {
          orderBy: {
            imageOrder: 'asc'
          }
        },
        rooms: {
          take: 1, // เอาเฉพาะห้องแรกเพื่อแสดงว่ามีห้องประเภทนี้อยู่จริง
          where: {
            roomStatus: {
              statusName: 'AVAILABLE' // เฉพาะห้องที่พร้อมใช้งาน
            }
          }
        }
      }
    });

    // กรองห้องที่มีความจุเพียงพอ
    const filteredRoomTypes = availableRoomTypes.filter(roomType => {
      const capacity = roomType.capacity || 0;
      const guestsPerRoom = Math.ceil(guestCount / roomCount);
      return capacity >= guestsPerRoom;
    });

    // แปลงข้อมูลให้เป็นรูปแบบที่ frontend ต้องการ
    const formattedRooms = filteredRoomTypes.map(roomType => ({
      id: roomType.rooms[0]?.id || roomType.id, // ใช้ room id หรือ roomType id
      roomType: {
        id: roomType.id,
        name: roomType.name,
        description: roomType.description,
        capacity: roomType.capacity,
        roomSize: roomType.roomSize,
        pricePerNight: roomType.pricePerNight,
        promotionPrice: roomType.promotionPrice,
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
    }));

    console.log(`พบห้องที่ว่าง ${formattedRooms.length} ประเภท`);

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
      totalAvailable: formattedRooms.length
    });

  } catch (error) {
    console.error('Error fetching available rooms:', error);
    
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
}