// components/payment/shared/booking-detail-section.jsx (Updated)
import React, { useEffect, useState } from "react";
import { BriefcaseBusiness } from "lucide-react";
import { useRouter } from "next/router";
import api from "@/lib/axios";

const BookingDetailSection = () => {
  const router = useRouter();
  // ✅ เปลี่ยนจาก bookingId เป็น query parameters จากการ search
  const { roomTypeId, checkIn, checkOut, adults } = router.query;
  
  // States สำหรับการจัดการข้อมูล
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State สำหรับ countdown timer
  const [countdown, setCountdown] = useState(300); // 5 นาที = 300 วินาที

  // ✅ ฟังก์ชันดึงข้อมูลจาก API ใหม่
  const fetchRoomBookingData = async (roomTypeId, checkIn, checkOut, adults) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("🔍 Fetching room booking data:", { roomTypeId, checkIn, checkOut, adults });
      
      // เรียก API ใหม่ที่เราสร้าง
      const response = await api.get('/payment/get-room-booking-data', {
        params: {
          roomTypeId,
          checkIn,
          checkOut,
          adults: adults || 1
        }
      });
      
      console.log("✅ API Response:", response.data);
      
      if (response.data.success) {
        setBookingData(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch room booking data');
      }
      
    } catch (err) {
      console.error("❌ API Error:", err);
      
      // จัดการ Error แบบละเอียด
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || 'Unknown server error';
        setError(`Error ${status}: ${message}`);
      } else if (err.request) {
        setError('Unable to connect to server. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ ดึงข้อมูลเมื่อ component mount และมี required parameters
  useEffect(() => {
    if (router.isReady && roomTypeId && checkIn && checkOut) {
      fetchRoomBookingData(roomTypeId, checkIn, checkOut, adults);
    } else if (router.isReady && (!roomTypeId || !checkIn || !checkOut)) {
      setError('Missing required booking parameters (roomTypeId, checkIn, checkOut)');
      setLoading(false);
    }
  }, [router.isReady, roomTypeId, checkIn, checkOut, adults]);

  // จัดการ countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // ✅ เมื่อหมดเวลา redirect ไปหน้า payment-fail
          router.push('/payment-fail');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  // ฟังก์ชันช่วยต่าง ๆ
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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

  const formatDateRange = (checkIn, checkOut) => {
    return `${formatDate(checkIn)} - ${formatDate(checkOut)}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // ฟังก์ชัน retry เมื่อเกิด error
  const handleRetry = () => {
    if (roomTypeId && checkIn && checkOut) {
      fetchRoomBookingData(roomTypeId, checkIn, checkOut, adults);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <div className="bg-green-800 md:rounded-t-sm p-4 md:py-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <BriefcaseBusiness className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-h5 font-inter font-semibold text-white">
              Loading Room Information...
            </h2>
          </div>
          <p className="bg-orange-200 text-orange-700 rounded-sm px-2 py-1">
            {formatTime(countdown)}
          </p>
        </div>
        <div className="bg-green-600 md:rounded-b-sm py-6 px-4 md:p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-green-400 rounded w-3/4"></div>
            <div className="h-4 bg-green-400 rounded w-1/2"></div>
            <div className="h-4 bg-green-400 rounded w-5/6"></div>
            <div className="h-8 bg-green-400 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <div className="bg-red-800 md:rounded-t-sm p-4 md:py-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <BriefcaseBusiness className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-h5 font-inter font-semibold text-white">
              Error Loading Room Data
            </h2>
          </div>
          <p className="bg-orange-200 text-orange-700 rounded-sm px-2 py-1">
            {formatTime(countdown)}
          </p>
        </div>
        <div className="bg-red-600 md:rounded-b-sm py-6 px-4 md:p-6">
          <div className="text-white mb-4">{error}</div>
          <button 
            onClick={handleRetry}
            className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ไม่มีข้อมูล
  if (!bookingData) {
    return (
      <div>
        <div className="bg-gray-800 md:rounded-t-sm p-4 md:py-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <BriefcaseBusiness className="w-6 h-6 text-gray-500 mr-3" />
            <h2 className="text-h5 font-inter font-semibold text-white">
              No Room Data
            </h2>
          </div>
          <p className="bg-orange-200 text-orange-700 rounded-sm px-2 py-1">
            {formatTime(countdown)}
          </p>
        </div>
        <div className="bg-gray-600 md:rounded-b-sm py-6 px-4 md:p-6">
          <div className="text-white">No room booking details available</div>
        </div>
      </div>
    );
  }

  // ✅ แสดงข้อมูลปกติ
  const { booking, guest, rooms, summary, meta } = bookingData;

  return (
    <div>
      {/* Header Section */}
      <div className="bg-green-800 md:rounded-t-sm p-4 md:py-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <BriefcaseBusiness className="w-6 h-6 text-green-500 mr-3" />
          <h2 className="text-h5 font-inter font-semibold text-white">
            Booking Detail
          </h2>
          
          {/* แสดง badge สำหรับ development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="ml-2 flex gap-2">
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                DRAFT
              </span>
              {meta?.isTemporary && (
                <span className="text-xs bg-purple-500 px-2 py-1 rounded text-white">
                  TEMP
                </span>
              )}
            </div>
          )}
        </div>
        
        <p className="bg-orange-200 text-orange-700 rounded-sm px-2 py-1">
          {formatTime(countdown)}
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-green-600 md:rounded-b-sm py-6 px-4 md:p-6">
        
        {/* Check-in/Check-out Times */}
        <div className="flex gap-6 mb-6">
          <div className="w-1/2">
            <div className="font-semibold text-white mb-1">Check-in</div>
            <div className="text-b1 text-white">After 2:00 PM</div>
          </div>
          <div className="w-1/2">
            <div className="font-semibold text-white mb-1">Check-out</div>
            <div className="text-b1 text-white font-light">Before 12:00 PM</div>
          </div>
        </div>

        {/* Date Range and Guest Info */}
        <div className="mb-6">
          <div className="text-b1 text-white mb-1">
            {formatDateRange(booking.checkInDate, booking.checkOutDate)}
          </div>
          <div className="text-b1 text-white font-light mb-1">
            {booking.adults} Guest{booking.adults > 1 ? 's' : ''}
          </div>
          <div className="text-b1 text-green-300 font-light">
            {booking.nights} Night{booking.nights > 1 ? 's' : ''}
          </div>
        </div>

        {/* Room Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-b1 text-green-300 font-light">
            {rooms.length > 0 ? (
              `${rooms[0].roomType.name} × ${rooms.length}`
            ) : (
              'Room Information'
            )}
          </div>
          <div className="font-semibold text-white">
            THB {formatCurrency(summary.finalTotal)}
          </div>
        </div>

        {/* Room Details */}
        {rooms.length > 0 && (
          <div className="border-t border-green-300 pt-4 mb-4">
            <div className="text-b2 text-green-300 font-light mb-2">
              Room Details
            </div>
            {rooms.map((room, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-b2 text-white">
                    {room.roomType.name}
                  </div>
                  <div className="text-white text-b2">
                    THB {formatCurrency(room.pricePerNight)}/night
                  </div>
                </div>
                {room.roomType.capacity && (
                  <div className="text-b3 text-green-300">
                    Up to {room.roomType.capacity} guests
                  </div>
                )}
                {room.roomType.bedType && (
                  <div className="text-b3 text-green-300">
                    {room.roomType.bedType.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pricing Breakdown */}
        <div className="border-t border-green-300 pt-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-b2 text-green-300 font-light">
              Room × {booking.nights} night{booking.nights > 1 ? 's' : ''}
            </div>
            <div className="text-white text-b2">
              THB {formatCurrency(summary.subtotal)}
            </div>
          </div>
          
          {summary.specialRequestsTotal > 0 && (
            <div className="flex justify-between items-center mb-2">
              <div className="text-b2 text-green-300 font-light">Special Requests</div>
              <div className="text-white text-b2">
                THB {formatCurrency(summary.specialRequestsTotal)}
              </div>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t border-green-300 pt-6 mb-4">
          <div className="text-b1 font-light text-green-300">Total</div>
          <div className="text-h5 font-semibold text-white">
            THB {formatCurrency(summary.finalTotal)}
          </div>
        </div>

        {/* Booking Status */}
        <div className="border-t border-green-300 pt-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-b2 text-green-300 font-light">Booking Status</div>
            <div className="text-b2 px-2 py-1 rounded bg-yellow-500 text-white">
              {booking.bookingStatus}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-b2 text-green-300 font-light">Booking Number</div>
            <div className="text-b2 text-white font-mono">
              {booking.bookingNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
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