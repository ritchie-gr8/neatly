import DefaultLayout from "@/layouts/default.layout";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const CancelSuccess = () => {
  const router = useRouter();

  const {
    roomType,
    bookingDate,
    cancellationDate,
    checkInDate,
    checkOutDate,
    adults,
    totalAmount,
    bookingId,
  } = router.query;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit", 
      month: "short",
      year: "numeric",
    });
  };

  if (!roomType) {
    return (
      <DefaultLayout>
        <div className="bg-util-bg w-full h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Processing cancellation...</p>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="bg-util-bg w-full h-screen md:px-96 md:pt-20">
        <div className="bg-green-800 md:rounded-t-sm py-10 px-4">
          <h1 className="text-white text-h3 text-center">
            The Cancellation is Complete
          </h1>
          <p className="text-green-400 text-b2 text-center mt-3">
            Your booking has been cancelled successfully. You will receive an email with a detail within 48 hours.
          </p>
        </div>

        <div className="bg-green-700 md:rounded-b-sm px-4 pt-6 pb-10">
          <div className="bg-green-600 rounded-sm p-4">
            <p className="text-h5 font-semibold text-white">
              {roomType || "Room Type"}
            </p>

            <p className="font-semibold text-white mt-4">
              {formatDate(checkInDate)} - {formatDate(checkOutDate)}
            </p>
            <p className="text-b1 font-semibold text-white mb-10 mt-1">
              {adults || 0} Guests
            </p>

            <p className="text-green-300 text-b1">
              Booking date: {formatDate(bookingDate)}
            </p>
            <p className="text-green-300 text-b1 mt-2">
              Cancellation date: {formatDate(cancellationDate)}
            </p>
          </div>

          <div className="border-t-2 border-green-300 flex justify-between mt-10 pt-7">
            <p className="text-green-300 text-b1">Total Amount</p>
            <p className="text-white text-h5 font-semibold">
              THB {totalAmount ? Number(totalAmount).toLocaleString() : "0"}.00
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/" className="btn-primary px-8 py-4 font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CancelSuccess;