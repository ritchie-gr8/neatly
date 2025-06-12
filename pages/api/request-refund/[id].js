import { db } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const booking = await db.booking.findFirst({
      where: {
        id: parseInt(id),
        bookingStatus: {
          in: ['CONFIRMED', 'CANCELLED']
        }
      },
      include: {
        bookingRooms: { 
          include: {
            roomType: { 
              include: {
                roomImages: {
                  take: 1 
                }
              }
            }
          }
        }
      }
    });

    if (!booking) {
      return res.status(404).json({ error: 'No confirmed bookings found for this user' });
    }

    const formattedData = {
      name: booking.bookingRooms[0]?.roomType?.name || '',
      image_url: booking.bookingRooms[0]?.roomType?.roomImages[0]?.imageUrl || '',
      booking_id: booking.id,
      created_at: booking.createdAt,
      check_in_date: booking.checkInDate,
      check_out_date: booking.checkOutDate,
      adults: booking.adults,
      total_amount: booking.totalAmount,
      booking_status: booking.bookingStatus,
      user_id: booking.userId,
      
      bookingId: booking.id,
      roomType: booking.bookingRooms[0]?.roomType?.name || '',
      roomImage: booking.bookingRooms[0]?.roomType?.roomImages[0]?.imageUrl || '',
      bookingDate: booking.createdAt,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      totalAmount: booking.totalAmount
    };

    res.status(200).json(formattedData);

  } catch (error) {
    console.error('Error fetching booking:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  } 
}