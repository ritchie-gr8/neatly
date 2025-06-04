import React, { useEffect, useState } from "react";
import { BriefcaseBusiness } from "lucide-react";
import { useBooking } from "@/contexts/booking-context";
import { useRouter } from "next/router";
import api from "@/lib/axios";

const BookingDetailSection = () => {
  const {
    bookingData,
    calculateNights,
    getPriceBreakdown,
    countdown,
    formatCountdown,
  } = useBooking();

  const router = useRouter();
  const [isExpired, setIsExpired] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    console.log("Current countdown:", countdown); 
    
    if (countdown <= 0 && !isExpired && !isDeleting) {
      setIsExpired(true);
      handleBookingExpired();
    }
  }, [countdown, isExpired, isDeleting]);

  const handleBookingExpired = async () => {
    if (isDeleting) return; 
    
    setIsDeleting(true);
    console.log("Booking expired! Deleting booking data...");

    try {
      const { bookingId, guestId } = router.query;
      
      if (!bookingId) {
        console.error("No booking ID found");
        router.push('/payment-fail');
        return;
      }

      console.log(`Deleting booking ID: ${bookingId}, Guest ID: ${guestId}`);

      const response = await api.delete("/booking/delete-expired-booking", {
        data: {
          bookingId: bookingId,
          guestId: guestId
        }
      });

      if (response.data && response.data.success) {
        console.log("Booking deleted successfully:", response.data.data);
        
        router.push({
          pathname: '/payment-fail',
          query: {
            reason: 'timeout',
            message: 'Your booking session has expired. Please try booking again.'
          }
        });
      } else {
        throw new Error(response.data?.message || "Failed to delete expired booking");
      }

    } catch (error) {
      console.error("Error deleting expired booking:", error);
      
      router.push({
        pathname: '/payment-fail',
        query: {
          reason: 'timeout',
          message: 'Your booking session has expired. Please try booking again.'
        }
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      day: "numeric", 
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatDateRange = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '';
    const checkInFormatted = formatDate(checkIn);
    const checkOutFormatted = formatDate(checkOut);
    return `${checkInFormatted} - ${checkOutFormatted}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getCountdownColor = () => {
    if (countdown <= 0) return "text-orange-700 animate-pulse";
    if (countdown > 30) return "text-orange-700";
    return "text-orange-700 animate-pulse";
  };

  const getCountdownText = () => {
    if (countdown <= 0) {
      return isDeleting ? "Cancelling..." : "EXPIRED";
    }
    return formatCountdown(countdown);
  };

  if (isDeleting) {
    return (
      <div>
        <div className="bg-red-800 md:rounded-t-sm p-4 md:py-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <BriefcaseBusiness className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-h5 font-inter font-semibold text-white">
              Booking Expired
            </h2>
          </div>
          <div className="font-mono font-semibold text-red-200 animate-pulse">
            Cancelling...
          </div>
        </div>
        <div className="bg-red-600 md:rounded-b-sm py-6 px-4 md:p-6">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Your booking session has expired. Cancelling booking...</p>
          </div>
        </div>
      </div>
    );
  }

  if (bookingData.loading) {
    return (
      <div>
        <div className="bg-green-800 md:rounded-t-sm p-4 md:py-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <BriefcaseBusiness className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-h5 font-inter font-semibold text-white">
              Booking Detail
            </h2>
          </div>
        </div>
        <div className="bg-green-600 md:rounded-b-sm py-6 px-4 md:p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-green-500 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-green-500 rounded"></div>
              <div className="h-4 bg-green-500 rounded"></div>
              <div className="h-4 bg-green-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (bookingData.error) {
    return (
      <div>
        <div className="bg-green-800 md:rounded-t-sm p-4 md:py-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <BriefcaseBusiness className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-h5 font-inter font-semibold text-white">
              Booking Detail
            </h2>
          </div>
        </div>
        <div className="bg-green-600 md:rounded-b-sm py-6 px-4 md:p-6">
          <div className="text-white">
            Error loading booking details: {bookingData.error}
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData.searchParams || !bookingData.roomData) {
    return (
      <div>
        <div className="bg-green-800 md:rounded-t-sm p-4 md:py-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <BriefcaseBusiness className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-h5 font-inter font-semibold text-white">
              Booking Detail
            </h2>
          </div>
        </div>
        <div className="bg-green-600 md:rounded-b-sm py-6 px-4 md:p-6">
          <div className="flex gap-6">
            <div className="w-1/2">
              <div className="font-semibold text-white mb-1">Check-in</div>
              <div className="text-b1 text-white">After 2:00 PM</div>
            </div>
            <div className="w-1/2">
              <div className="font-semibold text-white mb-1">Check-out</div>
              <div className="text-b1 text-white font-light">
                Before 12:00 PM
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="text-b1 text-white">Loading booking details...</div>
          </div>
        </div>
        <ul className="mt-4 py-4 px-6 list-disc bg-gray-300 md:rounded-sm text-green-600 text-b3 space-y-5">
          <li>
            Cancel booking will get full refund if the cancelation occurs before
            24 hours of the check-in date.
          </li>
          <li>
            Able to change check-in or check-out date booking within 24 hours of
            the booking date
          </li>
        </ul>
      </div>
    );
  }

  const { roomData, searchParams } = bookingData;
  const { checkIn, checkOut, adults, rooms } = searchParams;
  
  const nights = calculateNights(checkIn, checkOut);
  const totalRooms = parseInt(rooms) || 1;
  const totalGuests = parseInt(adults) || 1;
  
  const priceBreakdown = getPriceBreakdown();
  
  const roomName = roomData.roomType?.name || roomData.name || "Room";
  const pricePerNight = roomData.roomType?.pricePerNight || roomData.pricePerNight || 0;
  const promotionPrice = roomData.roomType?.promotionPrice || roomData.promotionPrice || 0;

  return (
    <div>
      <div>
        <div className={`${countdown <= 0 ? 'bg-red-800' : 'bg-green-800'} md:rounded-t-sm p-4 md:py-4 md:px-6 flex items-center justify-between`}>
          <div className="flex items-center">
            <BriefcaseBusiness className={`w-6 h-6 ${countdown <= 0 ? 'text-red-500' : 'text-green-500'} mr-3`} />
            <h2 className="text-h5 font-inter font-semibold text-white">
              {countdown <= 0 ? 'Booking Expired' : 'Booking Detail'}
            </h2>
          </div>
          <div className={`font-inter font-semibold rounded-sm bg-orange-200 px-2 py-1 ${getCountdownColor()}`}>
            {getCountdownText()}
          </div>
        </div>

        <div className={`${countdown <= 0 ? 'bg-red-600' : 'bg-green-600'} md:rounded-b-sm py-6 px-4 md:p-6`}>
          {countdown <= 0 ? (
            <div className="text-white text-center">
              <p className="text-lg font-semibold mb-2">Booking Session Expired</p>
              <p>Please try booking again.</p>
            </div>
          ) : (
            <>
              <div className="flex gap-6">
                <div className="w-1/2">
                  <div className="font-semibold text-white mb-1">Check-in</div>
                  <div className="text-b1 text-white">After 2:00 PM</div>
                </div>
                <div className="w-1/2">
                  <div className="font-semibold text-white mb-1">Check-out</div>
                  <div className="text-b1 text-white font-light">
                    Before 12:00 PM
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-b1 text-white">
                  {formatDateRange(checkIn, checkOut)}
                </div>
                <div className="text-b1 text-white font-light">
                  {totalGuests} Guest{totalGuests > 1 ? 's' : ''} • {totalRooms} Room{totalRooms > 1 ? 's' : ''}
                </div>
                <div className="text-b1 text-white font-light">
                  {nights} Night{nights > 1 ? 's' : ''}
                </div>
              </div>

              <div className="flex justify-between items-center my-6">
                <div className="text-b1 text-green-300 font-light">
                  {roomName}
                </div>
                <div className="font-semibold text-white">
                  {promotionPrice && promotionPrice < pricePerNight ? (
                    <>
                      <span className="line-through text-sm text-green-300 mr-2">
                        THB {formatCurrency(pricePerNight)}
                      </span>
                      THB {formatCurrency(promotionPrice)}
                    </>
                  ) : (
                    `THB ${formatCurrency(pricePerNight)}`
                  )}
                </div>
              </div>

              {priceBreakdown.selectedSpecialRequests && priceBreakdown.selectedSpecialRequests.length > 0 && (
                <div className="border-t border-green-300 pt-4 mb-4">
                  <div className="text-b2 text-green-300 font-light mb-2">Special Requests</div>
                  {priceBreakdown.selectedSpecialRequests.map((request, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      <div className="text-b2 text-green-300 font-light">
                        {request.displayName}
                      </div>
                      <div className="text-white font-medium">
                        +THB {formatCurrency(request.price)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center border-t border-green-300 pt-6">
                <div className="text-b1 font-light text-green-300">Total</div>
                <div className="text-h5 font-semibold text-white">
                  THB {formatCurrency(priceBreakdown.totalPrice || 0)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ul className="mt-4 py-4 px-6 list-disc bg-gray-300 md:rounded-sm text-green-600 text-b3 space-y-5">
        <li>
          Cancel booking will get full refund if the cancelation occurs before
          24 hours of the check-in date.
        </li>
        <li>
          Able to change check-in or check-out date booking within 24 hours of
          the booking date
        </li>
      </ul>
    </div>
  );
};

export default BookingDetailSection;