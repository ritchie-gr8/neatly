import { db } from '@/lib/prisma'; // หรือ import database client ที่คุณใช้

export default async function handler(req, res) {
  const { bookingId } = req.query;

  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { bookingStatus } = req.body;

  // ตรวจสอบค่าที่อนุญาตให้เปลี่ยน
  const validStatuses = ['CHECKED_IN', 'CHECKED_OUT', 'NO_SHOW'];
  if (!validStatuses.includes(bookingStatus)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid booking status'
    });
  }

  try {
    // ตรวจสอบว่า booking มีอยู่ไหม
    const booking = await db.booking.findUnique({
      where: { id: parseInt(bookingId) }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // อัปเดตสถานะ
    const updatedBooking = await db.booking.update({
      where: { id: parseInt(bookingId) },
      data: { bookingStatus }
    });

    return res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: updatedBooking
    });

  } catch (error) {
    console.error('Error updating booking status:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
