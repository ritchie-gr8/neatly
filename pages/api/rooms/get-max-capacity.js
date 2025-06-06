// pages/api/room-types/max-capacity.js

import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Fetching max capacity from available rooms...');

    // วิธีที่ 1: ใช้ raw query สำหรับ performance ที่ดี
    const result = await prisma.$queryRaw`
      SELECT MAX(rt.capacity) as max_capacity
      FROM "Rooms" r
      INNER JOIN "RoomTypes" rt ON r.room_type_id = rt.room_type_id
      WHERE rt.capacity IS NOT NULL
    `;

    const maxCapacity = result[0]?.max_capacity || 1;

    console.log('Max capacity from available rooms:', maxCapacity);

    res.status(200).json({ 
      success: true, 
      maxCapacity: Number(maxCapacity) // แปลงเป็น number
    });

  } catch (error) {
    console.error('Error fetching max capacity:', error);
    
    // Fallback: ใช้วิธีเดิมถ้า raw query ไม่ได้
    try {
      console.log('Falling back to Prisma findMany...');
      
      const roomsWithCapacity = await prisma.room.findMany({
        where: {
          roomType: {
            capacity: {
              not: null
            }
          }
        },
        include: {
          roomType: {
            select: {
              capacity: true
            }
          }
        }
      });

      let maxCapacity = 1;
      roomsWithCapacity.forEach(room => {
        if (room.roomType?.capacity && room.roomType.capacity > maxCapacity) {
          maxCapacity = room.roomType.capacity;
        }
      });

      res.status(200).json({ 
        success: true, 
        maxCapacity,
        fallback: true
      });

    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch max capacity',
        details: fallbackError.message 
      });
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Alternative วิธีที่ 2: ใช้ Prisma aggregate (ถ้า raw query ไม่ได้)
/*
export default async function handler(req, res) {
  try {
    // หาห้องทั้งหมดที่มี roomType และ capacity
    const maxCapacityData = await prisma.room.findMany({
      where: {
        roomType: {
          capacity: {
            not: null
          }
        }
      },
      select: {
        roomType: {
          select: {
            capacity: true
          }
        }
      }
    });

    // หา max capacity จาก array
    const capacities = maxCapacityData
      .map(room => room.roomType?.capacity)
      .filter(capacity => capacity !== null && capacity !== undefined);
    
    const maxCapacity = capacities.length > 0 ? Math.max(...capacities) : 1;

    res.status(200).json({ 
      success: true, 
      maxCapacity,
      availableRooms: capacities.length
    });

  } catch (error) {
    // error handling...
  }
}
*/