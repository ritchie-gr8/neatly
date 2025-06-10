import DefaultLayout from "@/layouts/default.layout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/lib/axios";

const index = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        // ดึง bookingNumber จาก URL (เช่น /payment-success/BK250604799353)
        const { bookingNumber } = router.query;
        
        if (!bookingNumber) {
          throw new Error('Booking number is required');
        }

        const response = await api.get('/booking/get-success-booking-data', {
          params: { bookingNumber }
        });

        if (response.data.success) {
          setBookingData(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch booking data');
        }
      } catch (err) {
        console.error('Error fetching booking data:', err);
        setError(err.message || 'An error occurred while fetching booking data');
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchBookingData();
    }
  }, [router.isReady, router.query.bookingNumber]);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getPaymentMethodDisplay = (method, paymentData) => {
    if (method === 'CREDIT_CARD' && paymentData?.transactionId) {
      const lastFour = paymentData.transactionId.slice(-4);
      return `Credit Card - *${lastFour}`;
    } else if (method === 'CREDIT_CARD') {
      return 'Credit Card';
    } else if (method === 'CASH') {
      return 'Cash Payment';
    }
    return method;
  };

  if (loading) {
    return (
      <DefaultLayout title="Payment Success">
        <div className="bg-white md:bg-util-bg w-full min-h-screen md:px-96 md:pt-20 md:pb-36">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-4 text-gray-600">Loading booking details...</span>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout title="Payment Success">
        <div className="bg-white md:bg-util-bg w-full min-h-screen md:px-96 md:pt-20 md:pb-36">
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link href="/" className="btn-primary px-8 py-4 rounded">
              Back to Home
            </Link>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (!bookingData) {
    return (
      <DefaultLayout title="Payment Success">
        <div className="bg-white md:bg-util-bg w-full min-h-screen md:px-96 md:pt-20 md:pb-36">
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">Booking Not Found</h2>
            <p className="text-gray-600 mb-8">The booking information could not be found.</p>
            <Link href="/" className="btn-primary px-8 py-4 rounded">
              Back to Home
            </Link>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  const { bookingInfo, guest, room, payment, addons, calculations } = bookingData;

  return (
    <DefaultLayout title="Payment Success">
      <div className="bg-white md:bg-util-bg w-full min-h-screen md:px-96 md:pt-20 md:pb-36">
        {/* Header */}
        <div className="px-6 py-10 bg-green-800 md:rounded-t-sm flex flex-col items-center justify-center text-center">
          <p className="text-white font-noto-serif text-h3">
            Thank you for booking
          </p>
          <p className="text-green-400 text-b2 pt-3">
            We are looking forward to hosting you at our place. We will send you
            more information about check-in and staying at our Neatly closer to
            your date of reservation
          </p>
          <div className="mt-4 text-green-200">
            <p className="font-semibold">Booking Number: {bookingInfo.bookingNumber}</p>
          </div>
        </div>

        {/* Article */}
        <div className="bg-green-700 md:rounded-b-sm pt-6 px-4 pb-10">
          <div className="bg-green-600 rounded-sm p-4 text-white md:flex md:justify-between md:items-center">
            <div>
              <p className="font-semibold">
                {formatDate(bookingInfo.checkInDate)} - {formatDate(bookingInfo.checkOutDate)}
              </p>
              <p className="text-b1 mt-2">
                {bookingInfo.adults} Guest{bookingInfo.adults > 1 ? 's' : ''} • {calculations.nights} Night{calculations.nights > 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex flex-row mt-6 md:mt-0 gap-6">
              <div>
                <p className="font-semibold">Check-in</p>
                <p className="text-b1 mt-2">After 2:00 PM</p>
              </div>

              <div>
                <p className="font-semibold">Check-out</p>
                <p className="text-b1 mt-2">Before 12:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            {/* Payment Method */}
            {payment && (
              <div className="flex flex-row py-6 md:justify-end">
                <p className="text-b1 text-green-300 font-light">
                  Payment success via
                </p>
                <p className="text-green-300 font-semibold ml-4">
                  {getPaymentMethodDisplay(payment.paymentMethod, payment)}
                </p>
              </div>
            )}

            {/* Room */}
            {room && (
              <div className="flex flex-row justify-between py-3">
                <p className="text-b1 text-green-300 font-light">
                  {room.roomType.name}
                </p>
                <p className="font-semibold text-white">
                  THB {formatCurrency(calculations.basePrice)}
                </p>
              </div>
            )}

            {/* Special Requests / Addons */}
            {addons && addons.length > 0 && addons.map((addon, index) => (
              <div key={index} className="flex flex-row justify-between py-3">
                <p className="text-b1 text-green-300 font-light">
                  {addon.name} {addon.quantity > 1 && `(x${addon.quantity})`}
                </p>
                <p className="font-semibold text-white">
                  THB {formatCurrency(addon.price * addon.quantity)}
                </p>
              </div>
            ))}

            {/* Total */}
            <div className="flex flex-row justify-between pt-6 border-t-2 border-green-600">
              <p className="text-b1 text-green-300 font-light">Total</p>
              <p className="font-semibold text-h5 text-white">
                THB {formatCurrency(bookingInfo.totalAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pt-9 font-semibold cursor-pointer md:flex md:justify-center">
          <Link href="/">
            <div className="md:hidden btn-primary px-8 py-4 flex items-center justify-center">
              Back to Home
            </div>
          </Link>
          
          <Link href="/booking-history">
            <div className="hidden md:flex px-8 pt-6 items-center justify-center text-orange-500 hover:underline">
              Check Booking Detail
            </div>
          </Link>

          <Link href="/booking-history">
            <div className="md:hidden px-8 py-6 flex items-center justify-center text-orange-500 hover:underline">
              Check Booking Detail
            </div>
          </Link>
          
          <Link href="/">
            <div className="hidden md:flex btn-primary px-8 py-4 items-center justify-center">
              Back to Home
            </div>
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default index;