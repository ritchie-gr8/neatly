import ReuseModal from "@/components/ิbooking-history/reuse-modal";
import DefaultLayout from "@/layouts/default.layout";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { FiChevronDown } from "react-icons/fi";
import api from "@/lib/axios";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/auth-context";
import dayjs from "dayjs";
import CustomPagination from "@/components/ui/custom-pagination";

const index = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  function canRefund(checkInDate) {
    const now = dayjs();
    const checkIn = dayjs(checkInDate);
    const oneDayBeforeCheckIn = checkIn.subtract(1, "day");
    return now.isBefore(oneDayBeforeCheckIn, "day");
  }

  function isWithin24Hours(createdAt) {
    const now = dayjs();
    const createdTime = dayjs(createdAt);
    const hoursDifference = now.diff(createdTime, "hour");
    return hoursDifference < 24 && hoursDifference >= 0;
  }

  function canChangeDate(checkInDate) {
    const now = dayjs();
    const checkIn = dayjs(checkInDate);
    return now.isBefore(checkIn, "day");
  }

  function isPastCheckIn(checkInDate) {
    const now = dayjs();
    const checkIn = dayjs(checkInDate);
    return now.isAfter(checkIn, "day") || now.isSame(checkIn, "day");
  }

  function shouldShowCancelButton(booking) {
    if (booking.booking_status === "CANCELLED") {
      return false;
    }
    const now = dayjs();
    const checkIn = dayjs(booking.check_in_date);
    const isAfterCheckIn = now.isAfter(checkIn, "day"); // ไม่รวมวันเดียวกัน

    return !isAfterCheckIn;
  }

  function shouldShowRoomDetailButton(checkInDate) {
    const now = dayjs();
    const checkIn = dayjs(checkInDate);
    const isAfterCheckIn = now.isAfter(checkIn, "day");

    return !isAfterCheckIn;
  }

  function shouldShowChangeDateButton(booking) {
    return (
      booking.booking_status === "CONFIRMED" &&
      isWithin24Hours(booking.created_at) &&
      canChangeDate(booking.check_in_date)
    );
  }

  function isWithin24HoursBeforeCheckIn(checkInDate) {
    const now = dayjs();
    const checkIn = dayjs(checkInDate);
    const oneDayBeforeCheckIn = checkIn.subtract(1, "day");
    return (
      now.isAfter(oneDayBeforeCheckIn, "day") ||
      now.isSame(oneDayBeforeCheckIn, "day")
    );
  }

  const handleCancelBooking = (booking) => {
    if (canRefund(booking.check_in_date)) {
    router.push(`/cancel-refund?bookingId=${booking.booking_id}&type=refund`);
  } else if (isWithin24HoursBeforeCheckIn(booking.check_in_date)) {
    router.push(`/cancel-refund?bookingId=${booking.booking_id}&type=cancel`);
  }
  };

  const fetchBookings = async (page = 1) => {
    try {
      setLoading(true);

      const response = await api.get(
        `/booking-history/get-booked-detail?user_id=${user.id}&page=${page}&limit=${itemsPerPage}`
      );

      if (response.data.success) {
        const bookingsData = response.data.data || [];

        setBookings(bookingsData);

        const pagination = response.data.pagination || {};
        setTotalPages(pagination.totalPages || 0);
        setTotalItems(pagination.totalItems || 0);
        setCurrentPage(page);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchBookings(newPage);
  };

  useEffect(() => {
    if (user && user.id) {
      fetchBookings(1);
    } else {
      setLoading(false);
    }
  }, [user]);

  const toggleDropdown = (bookingId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!user) {
    return (
      <DefaultLayout title="Booking History" showFooter={true}>
        <div className="bg-util-bg w-full h-full md:px-40">
          <h1 className="text-green-800 text-h3 px-4 pt-10 md:pt-20 pb-6 md:pb-16">
            Booking History
          </h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading user information...</p>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (loading) {
    return (
      <DefaultLayout title="Booking History" showFooter={true}>
        <div className="bg-util-bg w-full h-full md:px-40 ">
          <h1 className="text-green-800 text-h3 px-4 pt-10 md:pt-20 pb-6 md:pb-16">
            Booking History
          </h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
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
              <p className="text-red-600 mb-4">An error occurred: {error}</p>
              <button
                onClick={() => fetchBookings(currentPage)}
                className="btn-primary px-6 py-2"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout title="Booking History" showFooter={true}>
      <div className="bg-util-bg w-full h-full md:px-40 pb-20">
        <h1 className="text-green-800 text-h3 px-4 pt-10 md:pt-20 pb-6 md:pb-16">
          Booking History
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No booking history found</p>
          </div>
        ) : (
          <>
            {bookings.map((booking) => (
              <div key={booking.booking_id}>
                <div className="md:flex">
                  <img
                    src={booking.image_url || "/default-room.jpg"}
                    alt={booking.name}
                    width={400}
                    height={300}
                    className="w-full md:w-96 h-60 md:h-60 object-cover rounded-sm flex-shrink-0"
                  />

                  <div className="px-4 md:pl-12 pt-4 pb-6 md:w-full">
                    <div className="md:flex md:w-full md:justify-between md:items-center">
                      <h2 className="text-black text-h4 font-inter font-semibold">
                        {booking.name}
                      </h2>
                      <p className="text-b1 text-gray-600 mt-1 font-inter">
                        Booking date: {formatDate(booking.created_at)}
                      </p>
                    </div>

                    <div className="pb-6 md:flex md:items-end">
                      <div className="md:pr-10">
                        <h3 className="text-gray-800 font-semibold font-inter mb-1">
                          Check-in
                        </h3>
                        <p className="text-b1 text-gray-800">
                          {formatDate(booking.check_in_date)} | After 2:00 PM
                        </p>
                      </div>

                      <div>
                        <h3 className="text-gray-800 font-semibold font-inter mb-1 mt-4">
                          Check-out
                        </h3>
                        <p className="text-b1 text-gray-800">
                          {formatDate(booking.check_out_date)} | After 12:00 PM
                        </p>
                      </div>
                    </div>

                    <div
                      className="p-4 flex justify-between items-center bg-gray-200 rounded-sm cursor-pointer"
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

                    {openDropdowns[booking.booking_id] && (
                      <div className="bg-gray-200 p-4 rounded-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-b1 text-gray-700 font-inter pb-6">
                            {booking.adults} Guests ({booking.nights} Night
                            {booking.nights > 1 ? "s" : ""})
                          </span>
                          <span className="font-semibold text-gray-900 pb-6 ">
                            <span className="text-b1 font-normal text-gray-700 pr-4">
                              Payment success via{" "}
                            </span>
                            {booking.payment_method === "CREDIT_CARD"
                              ? "Credit Card"
                              : booking.payment_method === "CASH"
                              ? "Cash"
                              : "Not specified"}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-b1 text-gray-700 font-inter">
                            {booking.name}
                          </span>
                          <span className="font-semibold text-gray-900">
                            {Number(
                              booking.promotion_price || booking.room_price || 0
                            ).toLocaleString()}
                            .00
                          </span>
                        </div>

                        {booking.airport_transfer_price &&
                          booking.airport_transfer_price > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-b1 text-gray-700 font-inter">
                                Airport transfer
                              </span>
                              <span className="font-semibold text-gray-900">
                                +
                                {Number(
                                  booking.airport_transfer_price
                                ).toLocaleString()}
                                .00
                              </span>
                            </div>
                          )}

                        {booking.discount_amount &&
                          booking.discount_amount > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-b1 text-gray-700 font-inter">
                                Promotion Code
                              </span>
                              <span className="font-semibold text-red-600">
                                -
                                {Number(
                                  booking.discount_amount
                                ).toLocaleString()}
                                .00
                              </span>
                            </div>
                          )}

                        {booking.addons && booking.addons.length > 0 && (
                          <>
                            {booking.addons.map((addon, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center"
                              >
                                <span className="text-b1 text-gray-700 font-inter">
                                  {addon.addon_name}
                                </span>
                                <span className="font-semibold text-gray-900">
                                  +
                                  {Number(
                                    addon.price * addon.quantity
                                  ).toLocaleString()}
                                  .00
                                </span>
                              </div>
                            ))}
                          </>
                        )}

                        <hr className="border-gray-300 my-4" />

                        <div className="flex justify-between items-center">
                          <span className="text-b1 text-gray-700 font-inter">
                            Total
                          </span>
                          <span className="font-semibold text-gray-900 text-h5">
                            THB {Number(booking.total_amount).toLocaleString()}
                            .00
                          </span>
                        </div>

                        {booking.special_requests &&
                          booking.special_requests.trim() && (
                            <>
                              <hr className="border-gray-300 my-4" />
                              <div>
                                <h4 className="text-gray-700 font-inter font-semibold mb-2">
                                  Additional Request
                                </h4>
                                <p className="text-gray-700 font-inter text-b1">
                                  {booking.special_requests}
                                </p>
                              </div>
                            </>
                          )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="md:pb-6 md:mb-10 mb-10 border-b-2 md:border-b-2 border-gray-300 md:border-gray-300 flex flex-col md:flex-row justify-between items-center px-4 md:px-0">
                    {shouldShowCancelButton(booking) && (
                      <div className="hidden md:flex w-full md:w-1/2 md:justify-start md:items-center">
                        <ReuseModal
                          triggerButton="Cancel Booking"
                          triggerButtonClass="md:px-0 px-4 py-6 text-orange-500 hover:underline font-open-sans font-semibold cursor-pointer"
                          title="Cancel Booking"
                          message={
                            canRefund(booking.check_in_date)
                              ? "Are you sure you would like to cancel this booking?"
                              : "Cancellation of the booking now will not be able to request a refund. Are you sure you would like to cancel this booking?"
                          }
                          confirmText={
                            canRefund(booking.check_in_date)
                              ? "Yes, I want to cancel and request refund"
                              : "Yes, I want to cancel"
                          }
                          cancelText="No, Don't Cancel"
                          onConfirm={() => {
                            handleCancelBooking(booking);
                          }}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-end w-full mb-4 md:mb-0">
                      {shouldShowRoomDetailButton(booking.check_in_date) && (
                        <Link
                          href={`/rooms/${booking.room_type_id}`}
                          className="md:pr-14 px-8 md:px-0 text-orange-500 hover:underline font-open-sans font-semibold cursor-pointer"
                        >
                          Room Detail
                        </Link>
                      )}

                      {shouldShowChangeDateButton(booking) && (
                        <Link
                          href={`/change-date?booking_id=${booking.booking_id}`}
                          className="btn-primary px-8 py-4 font-open-sans font-semibold"
                        >
                          Change Date
                        </Link>
                      )}
                    </div>

                    <div className="flex md:hidden w-full justify-end">
                      <ReuseModal
                        triggerButton="Cancel Booking"
                        triggerButtonClass="px-4 py-6 text-orange-500 hover:underline font-open-sans font-semibold cursor-pointer"
                        title="Cancel Booking"
                        message={
                          canRefund(booking.check_in_date)
                            ? "Are you sure you would like to cancel this booking?"
                            : "Cancellation of the booking now will not be able to request a refund. Are you sure you would like to cancel this booking?"
                        }
                        confirmText={
                          canRefund(booking.check_in_date)
                            ? "Yes, I want to cancel and request refund"
                            : "Yes, I want to cancel"
                        }
                        cancelText="No, Don't Cancel"
                        onConfirm={() => {
                          handleCancelBooking(booking);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <div className="flex justify-center py-8 mt-8">
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default index;
