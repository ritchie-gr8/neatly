// pages/api/payment/get-booking-detail.js (Updated version)

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { bookingId } = req.query;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    // Get booking from temporary storage
    const booking = global.bookings?.[bookingId];

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or expired'
      });
    }

    // Check if booking is expired
    if (new Date(booking.expiresAt) < new Date()) {
      delete global.bookings[bookingId];
      return res.status(404).json({
        success: false,
        message: 'Booking has expired'
      });
    }

    // Format booking details for frontend with correct pricing
    const bookingDetails = {
      id: booking.id,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      adults: booking.originalSearchData?.selectedGuests || booking.adults, // Show original guest count
      totalAmount: booking.totalAmount, // Use calculated total amount
      rooms: [{
        id: booking.roomId,
        roomType: booking.roomDetails?.roomType || 'Standard Room',
        capacity: booking.roomDetails?.capacity || booking.adults,
        bedDescription: booking.roomDetails?.bedDescription || 'Queen Bed',
        roomSize: booking.roomDetails?.roomSize || '25',
        description: booking.roomDetails?.description || 'Comfortable room',
        pricePerNight: booking.roomDetails?.basePricePerNight || booking.roomDetails?.pricePerNight || 0,
        promotionPrice: booking.roomDetails?.promotionPrice || 0,
        imageUrl: booking.roomDetails?.imageUrl || 'https://placehold.co/600x400',
        // Add calculated pricing info for display
        actualRoomsNeeded: booking.originalSearchData?.actualRoomsNeeded || 1,
        totalPricePerNight: booking.originalSearchData?.totalPricePerNight || 0,
        nights: booking.roomDetails?.nights || 1
      }],
      status: booking.status,
      createdAt: booking.createdAt,
      expiresAt: booking.expiresAt,
      // Enhanced search data with pricing details
      searchData: {
        selectedRooms: booking.originalSearchData?.selectedRooms || 1,
        selectedGuests: booking.originalSearchData?.selectedGuests || 1,
        actualRoomsNeeded: booking.originalSearchData?.actualRoomsNeeded || 1,
        totalPricePerNight: booking.originalSearchData?.totalPricePerNight || 0,
        basePricePerNight: booking.originalSearchData?.basePricePerNight || 0,
        nights: booking.roomDetails?.nights || 1,
        // Pricing breakdown for display
        pricingBreakdown: {
          roomType: booking.roomDetails?.roomType || 'Standard Room',
          basePricePerRoom: booking.originalSearchData?.basePricePerNight || 0,
          roomsNeeded: booking.originalSearchData?.actualRoomsNeeded || 1,
          pricePerNight: booking.originalSearchData?.totalPricePerNight || 0,
          nights: booking.roomDetails?.nights || 1,
          totalPrice: booking.totalAmount,
          calculation: `${booking.originalSearchData?.basePricePerNight || 0} × ${booking.originalSearchData?.actualRoomsNeeded || 1} rooms × ${booking.roomDetails?.nights || 1} nights = ${booking.totalAmount}`
        }
      }
    };

    console.log("📋 Booking details sent to frontend:", {
      bookingId,
      originalGuests: bookingDetails.searchData.selectedGuests,
      actualRoomsNeeded: bookingDetails.searchData.actualRoomsNeeded,
      basePricePerRoom: bookingDetails.searchData.basePricePerNight,
      totalPricePerNight: bookingDetails.searchData.totalPricePerNight,
      totalAmount: bookingDetails.totalAmount,
      calculation: bookingDetails.searchData.pricingBreakdown.calculation
    });

    return res.status(200).json({
      success: true,
      bookingDetails
    });

  } catch (error) {
    console.error('Error fetching booking details:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}