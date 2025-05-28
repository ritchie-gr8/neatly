import DefaultLayout from "@/layouts/default.layout";
import Link from "next/link";
import React from "react";

const index = () => {
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
        </div>

        {/* Article */}
        <div className="bg-green-700 md:rounded-b-sm pt-6 px-4 pb-10">
          <div className="bg-green-600 rounded-sm p-4 text-white md:flex md:justify-between md:items-center">
            <div>
              <p className="font-semibold">
                Th, 19 Oct 2022 - Fri, 20 Oct 2022
              </p>
              <p className="text-b1 mt-2">2 Guests</p>
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
            <div className="flex flex-row py-6 md:justify-end">
              <p className="text-b1 text-green-300 font-light">
                Payment success via
              </p>
              <p className="text-green-300 font-semibold ml-4">
                Credit Card - *888
              </p>
            </div>

            <div className="flex flex-row justify-between py-3">
              <p className="text-b1 text-green-300 font-light">
                Superior Garden View Room
              </p>
              <p className="font-semibold">2,500.00</p>
            </div>

            <div className="flex flex-row justify-between py-3">
              <p className="text-b1 text-green-300 font-light">
                Airport transfer
              </p>
              <p className="font-semibold">200.00</p>
            </div>

            <div className="flex flex-row justify-between py-3 pb-4">
              <p className="text-b1 text-green-300 font-light">
                Promotion Code
              </p>
              <p className="font-semibold">-400.00</p>
            </div>

            <div className="flex flex-row justify-between pt-6 border-t-2 border-green-600">
              <p className="text-b1 text-green-300 font-light">Total</p>
              <p className="font-semibold text-h5">THB 2,300.00</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pt-9 font-semibold cursor-pointer md:flex md:justify-center">
          <Link href="/">
            <div className=" md:hidden btn-primary px-8 py-4 flex items-center justify-center">
              Back to Home
            </div>
          </Link>
          <Link href="/payment">
            <div className="hidden md:flex px-8 pt-6  items-center justify-center text-orange-500 hover:underline">
              Check Booking Detail
            </div>
          </Link>

          <Link href="/payment">
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
