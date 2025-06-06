import { db } from "@/lib/prisma";


export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    const { bookingNumber, bookingId } = req.query;

    // ตรวจสอบว่ามี bookingNumber หรือ bookingId
    if (!bookingNumber && !bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Missing bookingNumber or bookingId parameter'
      });
    }

    // สร้าง where condition
    const whereCondition = bookingNumber 
      ? { bookingNumber: bookingNumber }
      : { id: parseInt(bookingId) };

    // ดึงข้อมูล booking พร้อม relations
    const booking = await db.booking.findFirst({
      where: whereCondition,
      include: {
        guest: true,
        bookingRooms: {
          include: {
            room: true,
            roomType: {
              include: {
                bedType: true,
                roomImages: true
              }
            }
          }
        },
        payments: true,
        bookingAddons: true
      }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // จัดรูปแบบข้อมูลให้เหมาะสมกับ frontend
    const formattedData = {
      bookingInfo: {
        bookingNumber: booking.bookingNumber,
        bookingId: booking.id,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        adults: booking.adults,
        totalAmount: booking.totalAmount,
        bookingStatus: booking.bookingStatus,
        additionalRequests: booking.additionalRequests,
        createdAt: booking.createdAt
      },
      
      guest: {
        id: booking.guest.id,
        firstName: booking.guest.firstName,
        lastName: booking.guest.lastName,
        email: booking.guest.email,
        phone: booking.guest.phone,
        country: booking.guest.country,
        dateOfBirth: booking.guest.dateOfBirth
      },

      room: booking.bookingRooms.length > 0 ? {
        roomId: booking.bookingRooms[0].room.id,
        roomNumber: booking.bookingRooms[0].room.roomNumber,
        roomType: {
          id: booking.bookingRooms[0].roomType.id,
          name: booking.bookingRooms[0].roomType.name,
          description: booking.bookingRooms[0].roomType.description,
          capacity: booking.bookingRooms[0].roomType.capacity,
          roomSize: booking.bookingRooms[0].roomType.roomSize,
          pricePerNight: booking.bookingRooms[0].pricePerNight,
          bedType: booking.bookingRooms[0].roomType.bedType,
          images: booking.bookingRooms[0].roomType.roomImages
        }
      } : null,

      payment: booking.payments.length > 0 ? {
        id: booking.payments[0].id,
        amount: booking.payments[0].amount,
        paymentMethod: booking.payments[0].paymentMethod,
        paymentStatus: booking.payments[0].paymentStatus,
        paymentDate: booking.payments[0].paymentDate,
        transactionId: booking.payments[0].transactionId,
        omiseChargeId: booking.payments[0].omiseChargeId
      } : null,

      addons: booking.bookingAddons.map(addon => ({
        id: addon.id,
        name: addon.addonName,
        quantity: addon.quantity,
        price: addon.price,
        notes: addon.notes
      })),

      // คำนวณข้อมูลเพิ่มเติม
      calculations: {
        nights: Math.ceil((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24)),
        basePrice: booking.bookingRooms.length > 0 ? 
          booking.bookingRooms[0].pricePerNight * 
          Math.ceil((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24)) : 0,
        addonsTotal: booking.bookingAddons.reduce((total, addon) => total + (addon.price * addon.quantity), 0)
      }
    };

    res.status(200).json({
      success: true,
      message: 'Booking data retrieved successfully',
      data: formattedData
    });

  } catch (error) {
    console.error('Error fetching booking data:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking data',
      error: error.message
    });
  }
}