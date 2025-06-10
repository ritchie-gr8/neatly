import DefaultLayout from "@/layouts/default.layout";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/lib/axios";

const index = () => {
  const router = useRouter();

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { bookingId } = router.query;

  useEffect(() => {
    const fetchBookingData = async () => {
      if (!bookingId) return;

      try {
        setLoading(true);
        console.log(bookingId)

        const response = await api.get(`/request-refund/${bookingId}`);
console.log("booking data from request-refund",response.data, bookingId)
        const foundBooking = response.data

        if (foundBooking) {
          setBookingData(foundBooking);
        } else {
          setError("Booking not found or not confirmed");
        }
      } catch (err) {
        console.error("Error fetching booking:", err);

        if (err.response?.status === 404) {
          setError(
            "No confirmed bookings found. Only confirmed bookings can be refunded."
          );
        } else {
          setError(err.response?.data?.error || err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [bookingId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formatted.replace(/, (\d{4})$/, " $1");
  };

  const formatPrice = (amount) => {
    if (!amount) return "0.00";
    return Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleCancelBooking = async () => {
    try {
      setLoading(true);

      const response = await api.post("/booking/refund", {
        bookingId: parseInt(bookingData?.bookingId),
      });

      if (response.data.success) {
        const currentDate = new Date();
        const cancellationDate = currentDate.toISOString();

        const refundData = {
          roomType: bookingData?.roomType,
          bookingDate: bookingData?.bookingDate,
          cancellationDate: cancellationDate,
          checkInDate: bookingData?.checkInDate,
          checkOutDate: bookingData?.checkOutDate,
          adults: bookingData?.adults,
          totalAmount: bookingData?.totalAmount,
          bookingId: bookingData?.bookingId,
          refundId: response.data.data?.refundId,
          refundStatus: response.data.data?.status,
        };

        router.push({
          pathname: "/refund-success",
          query: refundData,
        });
      } else {
        setError(response.data.error || "Refund processing failed");
      }
    } catch (err) {
      console.error("Error processing refund:", err);
      setError(err.response?.data?.error || "Failed to process refund");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DefaultLayout title="Request a Refund">
        <div className="bg-util-bg w-full h-screen md:px-40">
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
      <DefaultLayout title="Request a Refund">
        <div className="bg-util-bg w-full h-screen md:px-40">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-600">Error: {error}</p>
              <Link
                href="/booking-history"
                className="text-orange-500 hover:underline mt-4 inline-block"
              >
                Back to Booking History page
              </Link>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (!bookingData) {
    return (
      <DefaultLayout title="Request a Refund">
        <div className="bg-util-bg w-full h-screen md:px-40">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-gray-600">Booking Not Found</p>
              <Link
                href="/booking-history"
                className="text-orange-500 hover:underline mt-4 inline-block"
              >
                Back to Booking History page
              </Link>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout title="Request a Refund">
      <div className="bg-util-bg w-full h-screen md:px-40">
        <h1 className="text-green-800 text-h3 md:text-h2 px-4 pt-10 md:pt-20 pb-6">
          Request a Refund
        </h1>

        <div className="md:flex md:pt-28 md:border-b-2 md:border-gray-300 md:pb-10 md:mb-10">
          <Image
            src={bookingData.roomImage || "/default-room.jpg"}
            alt={bookingData.roomType || "Room"}
            width={400}
            height={300}
            className="w-full md:w-96 h-60 md:h-56 md:mr-12 object-cover rounded-sm"
          />

          <div className="px-4 pt-4 pb-6 md:w-full">
            <div className="md:flex md:justify-between md:items-center md:w-full ">
              <h2 className="text-black text-h4 font-inter font-semibold">
                {bookingData.roomType || "Room Type"}
              </h2>
              <p className="text-b1 text-gray-600 mt-1 font-inter">
                Booking date: {formatDate(bookingData.bookingDate)}
              </p>
            </div>

            <div className="py-8 md:flex md:justify-between md:items-center md:w-full">
              <div>
                <h3 className="text-gray-700 text-b1 font-inter">
                  {formatDate(bookingData.checkInDate)} -{" "}
                  {formatDate(bookingData.checkOutDate)}
                </h3>
                <p className="text-b1 text-gray-700 mt-1">
                  {bookingData.adults || 0} Guests
                </p>
              </div>

              <div className="md:flex md:flex-col md:items-end">
                <h3 className="text-b1 text-gray-900 font-inter mt-6 md:mt-0">
                  Total Refund
                </h3>
                <p className="text-h5 text-gray-900 font-semibold mt-1">
                  THB {formatPrice(bookingData.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full border-b-2 md:border-none  border-gray-300 md:border-gray-300 md:flex-row md:justify-between md:px-0">
          <Link
            href="/booking-history"
            className="order-2 md:order-1 px-4 py-6 flex justify-end text-orange-500 hover:underline font-open-sans font-semibold cursor-pointer"
          >
            Cancel
          </Link>

          <button
            onClick={handleCancelBooking}
            disabled={loading}
            className="order-1 md:order-2 px-8 py-4 btn-primary font-open-sans font-semibold cursor-pointer"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              "Cancel and Refund this Booking"
            )}
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default index;
