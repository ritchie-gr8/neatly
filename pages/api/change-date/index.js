import { PrismaClient } from '@/lib/generated/prisma';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { booking_id } = req.query;

    if (!booking_id) {
      return res.status(400).json({ 
        success: false, 
        message: 'booking_id is required' 
      });
    }

    const bookingDetail = await prisma.booking.findFirst({
        where: {
          id: parseInt(booking_id)  
        },
        include: {
          bookingRooms: {  
            include: {
              roomType: {    
                include: {
                  roomImages: true  
                }
              }
            }
          }
        }
      });


    if (!bookingDetail) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (!bookingDetail.bookingRooms || bookingDetail.bookingRooms.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'No room data found for this booking' 
        });
      }

      const formattedData = {
        booking_id: bookingDetail.id,  
        created_at: bookingDetail.createdAt,
        check_in_date: bookingDetail.checkInDate,
        check_out_date: bookingDetail.checkOutDate,
        room_name: bookingDetail.bookingRooms[0]?.roomType?.name || 'Unknown Room',
        room_image: bookingDetail.bookingRooms[0]?.roomType?.roomImages[0]?.imageUrl || '/default-room.jpg'
      };


    return res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching booking detail:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
