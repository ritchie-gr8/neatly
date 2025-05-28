// components/payment/shared/booking-detial-section.js (Updated version)
import React, { useEffect } from "react";
import { BriefcaseBusiness } from "lucide-react";
import { useBooking } from "@/contexts/booking-context";
import { useRouter } from "next/router";

const BookingDetailSection = () => {
  const {
    bookingDetail,
    loading,
    error,
    fetchBookingDetail,
    countdown,
    startCountdown,
    getPriceBreakdown,
  } = useBooking();
  const router = useRouter();
  const { bookingId } = router.query;

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetail(bookingId);
    }
  }, [bookingId]);

  useEffect(() => {
    startCountdown();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDateRange = (checkIn, checkOut) => {
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

  // คำนวณจำนวนคืน
  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-red-200 rounded-lg p-6">
        <div className="text-red-600">
          Error loading booking details: {error}
        </div>
      </div>
    );
  }

  if (
    !bookingDetail ||
    !bookingDetail.checkInDate ||
    !bookingDetail.checkOutDate
  ) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="text-gray-500">No booking details available</div>
      </div>
    );
  }

  // Get price breakdown with special requests
  const priceBreakdown = getPriceBreakdown();
  
  // ดึงข้อมูลการค้นหาและการคำนวณ
  const searchData = bookingDetail.searchData || {};
  const actualRoomsNeeded = searchData.actualRoomsNeeded || bookingDetail.rooms?.length || 1;
  const selectedGuests = searchData.selectedGuests || bookingDetail.adults;
  const nights = calculateNights(bookingDetail.checkInDate, bookingDetail.checkOutDate);

  return (
    <div>
      <div>
        <div className="bg-green-800 md:rounded-t-sm p-4 md:py-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <BriefcaseBusiness className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-h5 font-inter font-semibold text-white">
              Booking Detail
            </h2>
          </div>
          <p className="bg-orange-200 text-orange-700 rounded-sm px-2 py-1">{formatTime(countdown)}</p>
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
            <div className="text-b1 text-white">
              {formatDateRange(
                bookingDetail.checkInDate,
                bookingDetail.checkOutDate
              )}
            </div>
            <div className="text-b1 text-white font-light">
              {selectedGuests} Guest{selectedGuests > 1 ? 's' : ''}
            </div>
          </div>

          <div className="flex justify-between items-center my-6">
            <div className="text-b1 text-green-300 font-light">
              {bookingDetail.rooms?.length > 0
                ? bookingDetail.rooms[0].roomType
                : "Room"}
            </div>
            <div className="font-semibold text-white">
              {formatCurrency(priceBreakdown.basePrice)}
            </div>
          </div>

          {/* Special Requests Section */}
          {priceBreakdown.selectedSpecialRequests.length > 0 && (
            <div className="border-t border-green-300 pt-4 mb-4">
              <div className="text-b2 text-green-300 font-light mb-2">Special Requests</div>
              {priceBreakdown.selectedSpecialRequests.map((request, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <div className="text-b2 text-green-300 font-light">
                    {request.displayName}
                  </div>
                  <div className="text-white font-medium">
                    +{formatCurrency(request.price)}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center border-t border-green-300 pt-6">
            <div className="text-b1 font-light text-green-300">Total</div>
            <div className="text-h5 font-semibold text-white">
              THB {formatCurrency(priceBreakdown.totalPrice)}
            </div>
          </div>
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