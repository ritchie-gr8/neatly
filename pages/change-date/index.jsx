import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/lib/axios";
import DefaultLayout from "@/layouts/default.layout";
import Link from "next/link";
import CustomDatePicker from "@/components/global/date-picker";
import ReuseModal from "@/components/ิbooking-history/reuse-modal";

const index = () => {
  const router = useRouter();
  const { booking_id } = router.query;
  const [isUpdating, setIsUpdating] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookingDetail = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/change-date?booking_id=${booking_id}`);

      if (response.data.success) {
        setBookingData(response.data.data);

        const checkIn = new Date(response.data.data.check_in_date);
        const checkOut = new Date(response.data.data.check_out_date);
        setCheckInDate(checkIn);
        setCheckOutDate(checkOut);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching booking detail:", err);
      setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (booking_id) {
      fetchBookingDetail();
    }
  }, [booking_id]);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);

    if (date >= checkOutDate) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    }
  };

  const disableCheckoutDates = (date) => {
    return date <= checkInDate;
  };

  const handleConfirmDateChange = async () => {
    try {
      setIsUpdating(true);

      const requestData = {
        booking_id: booking_id,
        check_in_date: checkInDate.toISOString().split("T")[0], // แปลงเป็น YYYY-MM-DD
        check_out_date: checkOutDate.toISOString().split("T")[0], // แปลงเป็น YYYY-MM-DD
      };

      const response = await api.put("/booking/update-dates", requestData);

      if (response.data.success) {
        router.push("/booking-history");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DefaultLayout title="Change Check-in and Check-out Date">
      <div className="bg-util-bg w-full  h-full md:px-40">
        <h1 className="text-green-800 text-h3 px-4 pt-10 pb-6">
          Change Check-in and Check-out Date
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">เกิดข้อผิดพลาด: {error}</p>
              <button
                onClick={fetchBookingDetail}
                className="btn-primary px-6 py-2"
              >
                ลองใหม่
              </button>
            </div>
          </div>
        ) : bookingData ? (
          <div>
            <img
              src={bookingData.room_image || "/default-room.jpg"}
              alt={bookingData.room_name}
              className="w-full h-60 object-cover rounded-sm"
            />

            <div className="px-4 pt-4 pb-6">
              <h2 className="text-black text-h4 font-inter font-semibold">
                {bookingData.room_name}
              </h2>
              <p className="text-b1 text-gray-600 mt-1 font-inter">
                Booking date:{" "}
                {new Date(bookingData.created_at).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <div className="py-8">
                <h3 className="text-gray-800 font-semibold font-inter mb-1">
                  Original Date
                </h3>
                <p className="text-b1 text-gray-700">
                  {new Date(bookingData.check_in_date).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}{" "}
                  -{" "}
                  {new Date(bookingData.check_out_date).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>

              <div className="bg-white rounded-sm p-4 mb-6 ">
                <h3 className="text-gray-800 font-semibold font-inter mb-4">
                  Change Date
                </h3>

                <div className="md:flex">
                  <div className="md:w-1/2 -translate-y-2.5 flex-1  text-gray-900 font-inter mb-1">
                    <CustomDatePicker
                      title="Check In"
                      defaultValue={checkInDate}
                      value={checkInDate}
                      onDateChange={handleCheckInDateChange}
                      className="mb-6 h-12 w-full text-gray-900 font-inter"
                    />
                  </div>

                  <div className="hidden md:flex px-6 text-black pt-6">-</div>

                  <div className="md:w-1/2 -translate-y-2.5 flex-1 text-gray-900 font-inter mb-1">
                    <CustomDatePicker
                      title="Check Out"
                      defaultValue={checkOutDate}
                      value={checkOutDate}
                      onDateChange={setCheckOutDate}
                      disabledDate={disableCheckoutDates}
                      className="mb-0 h-12 text-gray-900 font-inter border border-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col pb-10 md:flex-row md:justify-between items-center w-full border-b-2 border-gray-300">
                <Link
                  href="/booking-history"
                  className="order-2 md:order-1 px-4 py-6 text-orange-500 hover:underline font-open-sans font-semibold cursor-pointer"
                >
                  Cancel
                </Link>

                <div className="order-1 md:order-2 w-full md:w-auto">
                  <ReuseModal
                    triggerButton={
                      isUpdating ? "Updating..." : "Confirm Change Date"
                    }
                    triggerButtonClass={`btn-primary px-8 py-4 w-full md:w-auto text-center font-open-sans font-semibold ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Change Date"
                    message="Are you sure you want to change your check-in and check-out date?"
                    confirmText="Yes, I want to change"
                    cancelText="No, I don't"
                    confirmButtonStyle="orange"
                    onConfirm={handleConfirmDateChange}
                    disabled={isUpdating}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">Booking Not Found</p>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default index;
