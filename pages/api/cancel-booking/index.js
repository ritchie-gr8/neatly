import { db } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookingId } = req.body;
    
    if (!bookingId) {
      return res.status(400).json({ error: 'Booking ID is required' });
    }

    const booking = await db.booking.findFirst({
      where: {
        id: parseInt(bookingId),
        bookingStatus: 'CONFIRMED'
      }
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found or already cancelled' });
    }

    const updatedBooking = await db.booking.update({
      where: { id: parseInt(bookingId) },
      data: { 
        bookingStatus: 'CANCELLED',
        updatedAt: new Date()
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully (no refund)',
      data: {
        bookingId: updatedBooking.id,
        status: 'CANCELLED',
        cancelledAt: updatedBooking.updatedAt
      }
    });

  } catch (error) {
    console.error('Error cancelling booking:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}