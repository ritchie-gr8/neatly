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
  const [originalNights, setOriginalNights] = useState(0);

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [validationError, setValidationError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const fetchBookingDetail = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/change-date?booking_id=${booking_id}`);

      if (response.data.success) {
        setBookingData(response.data.data);

        const checkIn = new Date(response.data.data.check_in_date);
        const checkOut = new Date(response.data.data.check_out_date);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        setOriginalNights(nights);
        setCheckInDate(checkIn);
        setCheckOutDate(checkOut);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching booking detail:", err);
      setError("Failed to fetch data");
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
    setValidationError("");

    const newCheckOut = new Date(date);
    newCheckOut.setDate(newCheckOut.getDate() + originalNights);
    setCheckOutDate(newCheckOut);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    setValidationError("");
  };

  const disableCheckoutDates = (date) => {
    return date <= checkInDate;
  };

  const handleConfirmDateChange = async () => {
    try {
      setIsUpdating(true);
      setValidationError("");
      setError(null);

      const requestData = {
        booking_id: booking_id,
        check_in_date: checkInDate.toISOString().split("T")[0],
        check_out_date: checkOutDate.toISOString().split("T")[0],
      };

      console.log(requestData);
      return

      const response = await api.put("/update-date", requestData);

      if (response.data.success) {
        setShowToast(true);
        setTimeout(() => {
          router.push("/booking-history");
        }, 1500);
      } else if (response.data.validation_error) {
        setValidationError(response.data.message);
        setIsUpdating(false);
      } else {
        setError(response.data.message || "Failed to update data");
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("Error sending data:", error);

      if (error.response?.status === 404) {
        setError(error.response.data?.message || "Booking not found");
      } else if (error.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Failed to update data. Please try again.");
      }
      setIsUpdating(false);
    }
  };

  const Toast = ({ show, message, onClose }) => {
    useEffect(() => {
      if (show) {
        const timer = setTimeout(() => {
          onClose();
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [show, onClose]);

    if (!show) return null;

    return (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        {message}
      </div>
    );
  };

  return (
    <DefaultLayout title="Change Check-in and Check-out Date">
      {/* Toast */}
      <Toast
        show={showToast}
        message="Date changed successfully!"
        onClose={() => setShowToast(false)}
      />
      <div className="bg-util-bg w-full  h-full md:px-40">
        <h1 className="text-green-800 text-h3 px-4 md:px-0 pt-10 pb-6">
          Change Check-in and Check-out Date
        </h1>
        {loading ? (
          <div className="flex justify-center items-center pt-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600 ">Loading...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error: {error}</p>
              <button
                onClick={fetchBookingDetail}
                className="btn-primary px-6 py-2"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : bookingData ? (
          <>
            <div className="flex flex-col lg:flex-row lg:gap-12">
              <img
                src={bookingData.room_image || "/default-room.jpg"}
                alt={bookingData.room_name}
                className="w-full h-60 lg:w-[357px] object-cover rounded-sm"
              />

              <div className="md:w-full">
                <div className="px-4 md:px-0 pt-4 pb-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between">
                    <h2 className="text-black text-h4 font-inter font-semibold">
                      {bookingData.room_name}
                    </h2>
                    <p className="text-b1 text-gray-600 mt-1 font-inter">
                      Booking date:{" "}
                      {new Date(bookingData.created_at).toLocaleDateString(
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
                      <div className="md:w-1/2 -translate-y-2.5 flex-1  text-gray-900 font-inter">
                        <CustomDatePicker
                          title="Check In"
                          defaultValue={checkInDate}
                          value={checkInDate}
                          onDateChange={handleCheckInDateChange}
                          className="mb-0 h-12 w-full text-gray-900 font-inter"
                        />
                      </div>

                      <div className="hidden md:flex px-6 text-black pt-6">
                        -
                      </div>

                      <div className="md:w-1/2 -translate-y-2.5 flex-1 text-gray-900 font-inter">
                        <CustomDatePicker
                          title="Check Out"
                          defaultValue={checkOutDate}
                          value={checkOutDate}
                          onDateChange={setCheckOutDate}
                          disabledDate={disableCheckoutDates}
                          className="mb-0 h-12 text-gray-900 font-inter border border-gray-400"
                          disabled={true}
                        />
                      </div>
                    </div>

                    {/* แสดง Validation Error */}
                    {validationError && (
                      <div className="mt-2 text-red-500 text-sm font-inter">
                        {validationError}
                      </div>
                    )}
                    <p className="text-sm text-orange-400 mt-1">
                      Changing check-in date will automatically update check-out date to maintain {originalNights} night
                      {originalNights !== 1 ? 's' : ''} stay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col pb-10 px-4 md:px-0 md:flex-row md:justify-between items-center w-full border-b-2 border-gray-300">
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
                  triggerButtonClass={`btn-primary px-8 py-4 w-full md:w-auto text-center font-open-sans font-semibold ${
                    isUpdating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
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
          </>
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
