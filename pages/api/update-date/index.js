// pages/api/booking/update-dates.js

import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed - ต้องใช้ PUT เท่านั้นนะ'
    });
  }

  try {
    const { booking_id, check_in_date, check_out_date } = req.body;

    if (!booking_id || !check_in_date || !check_out_date) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาส่งข้อมูลให้ครบ: booking_id, check_in_date, check_out_date'
      });
    }

    const checkInDate = new Date(check_in_date);
    const checkOutDate = new Date(check_out_date);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'รูปแบบวันที่ไม่ถูกต้อง'
      });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        success: false,
        message: 'วันเช็คอินต้องเร็วกว่าวันเช็คเอาท์'
      });
    }

    const existingBooking = await prisma.booking.findUnique({
      where: {
        id: parseInt(booking_id)
      }
    });

    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบการจองนี้'
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: parseInt(booking_id)
      },
      data: {
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        updatedAt: new Date() 
      }
    });

    return res.status(200).json({
      success: true,
      message: 'แก้ไขวันที่สำเร็จแล้ว!',
      data: {
        booking_id: updatedBooking.id,
        check_in_date: updatedBooking.checkInDate,
        check_out_date: updatedBooking.checkOutDate,
        updated_at: updatedBooking.updatedAt
      }
    });

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัพเดทวันที่:', error);
    
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง'
    });
  } finally {
    await prisma.$disconnect();
  }
}