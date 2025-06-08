import ReuseModal from "@/components/ิbooking-history/reuse-modal";
import DefaultLayout from "@/layouts/default.layout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import api from "@/lib/axios";

const index = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await api.get('/booking-history/get-booked-detail');

      console.log('API Response:', response.data);

      if (response.data.success) {
        setBookings(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleDropdown = (bookingId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <DefaultLayout title="Booking History" showFooter={true}>
        <div className="bg-util-bg w-full h-full md:px-40">
          <h1 className="text-green-800 text-h3 px-4 pt-10 md:pt-20 pb-6 md:pb-16">
            Booking History
          </h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout title="Booking History" showFooter={true}>
        <div className="bg-util-bg w-full h-full md:px-40">
          <h1 className="text-green-800 text-h3 px-4 pt-10 md:pt-20 pb-6 md:pb-16">
            Booking History
          </h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">เกิดข้อผิดพลาด: {error}</p>
              <button onClick={fetchBookings} className="btn-primary px-6 py-2">
                ลองใหม่อีกครั้ง
              </button>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout title="Booking History" showFooter={true}>
      <div className="bg-util-bg w-full h-full md:px-40">
        <h1 className="text-green-800 text-h3 px-4 pt-10 md:pt-20 pb-6 md:pb-16">
          Booking History
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">ไม่มีประวัติการจอง</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.booking_id}>
              <div>
                <img
                  src={booking.image_url || "/default-room.jpg"}
                  alt={booking.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />

                <div className="px-4 pt-4 pb-6">
                  <h2 className="text-black text-h4 font-inter font-semibold">
                    {booking.name}
                  </h2>
                  <p className="text-b1 text-gray-600 mt-1 font-inter">
                    Booking date: {formatDate(booking.created_at)}
                  </p>

                  <div className="py-6">
                    <h3 className="text-gray-800 font-semibold font-inter mb-1">
                      Check-in
                    </h3>
                    <p className="text-b1 text-gray-800">
                      {formatDate(booking.check_in_date)} | After 2:00 PM
                    </p>

                    <h3 className="text-gray-800 font-semibold font-inter mb-1 mt-4">
                      Check-out
                    </h3>
                    <p className="text-b1 text-gray-800">
                      {formatDate(booking.check_out_date)} | After 12:00 PM
                    </p>

                    <div
                      className="my-6 p-4 flex justify-between items-center bg-gray-200 rounded-sm cursor-pointer"
                      onClick={() => toggleDropdown(booking.booking_id)}
                    >
                      <p className="text-gray-900 font-open-sans font-semibold">
                        Booking Detail
                      </p>
                      <FiChevronDown
                        size={24}
                        className={`text-orange-500 font-semibold transition-transform ${
                          openDropdowns[booking.booking_id] ? "rotate-180" : ""
                        } `}
                      />
                    </div>
                  </div>

                  {openDropdowns[booking.booking_id] && (
                    <div className="bg-gray-50 p-4 rounded-sm space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">จำนวนคืน:</span>
                        <span className="font-semibold">
                          {booking.nights} คืน
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">จำนวนแขก:</span>
                        <span className="font-semibold">
                          {booking.adults} คน
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">วิธีการชำระเงิน:</span>
                        <span className="font-semibold">
                          {booking.payment_method === "CREDIT_CARD"
                            ? "บัตรเครดิต"
                            : booking.payment_method === "CASH"
                            ? "เงินสด"
                            : "ไม่ระบุ"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ราคาห้อง:</span>
                        <span className="font-semibold">
                          ฿{Number(booking.promotion_price).toLocaleString()}
                        </span>
                      </div>

                      {booking.special_requests_total > 0 && (
                        <>
                          <hr className="my-2" />
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Special Requests:
                            </span>
                            <span className="font-semibold text-orange-600">
                              ฿{booking.special_requests_total.toLocaleString()}
                            </span>
                          </div>
                        </>
                      )}

                      <hr className="my-3" />
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-800">ราคารวม:</span>
                        <span className="text-green-600">
                          ฿{Number(booking.total_amount).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/rooms/${booking.room_type_id}`}
                      className="px-8 text-orange-500 hover:underline font-open-sans font-semibold cursor-pointer"
                    >
                      Room Detail
                    </Link>
                    <Link
                      href="/change-date"
                      className="btn-primary px-8 py-4 font-open-sans font-semibold"
                    >
                      Change Date
                    </Link>
                  </div>

                  <div className="border-b-2 border-gray-300 flex justify-end">
                    <ReuseModal
                      triggerButton="Cancel Booking"
                      triggerButtonClass="px-4 py-6 text-orange-500 hover:underline font-open-sans font-semibold cursor-pointer"
                      title="Cancel Booking"
                      message="Are you sure you would like to cancel this booking?"
                      confirmText="No, Don't Cancel"
                      cancelText="Yes, I want to cancel and request refund"
                      onConfirm={() =>
                        (window.location.href = `/request-refund/${booking.booking_id}`)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DefaultLayout>
  );
};

export default index;
