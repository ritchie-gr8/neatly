import DefaultLayout from "@/layouts/default.layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <DefaultLayout title="Request a Refund">
      <div className="bg-util-bg w-full h-screen md:px-40">
        <h1 className="text-green-800 text-h3 px-4 pt-10 pb-6">
          Request a Refund
        </h1>

        <div>
          <Image />

          <div className="px-4 pt-4 pb-6">
            <h2 className="text-black text-h4 font-inter font-semibold">
              Superior Garden View
            </h2>
            <p className="text-b1 text-gray-600 mt-1 font-inter">
              Booking date: Tue, 16 Oct 2022
            </p>

            <div className="py-8">
              <h3 className="text-gray-700 text-b1 font-inter">
                Th, 19 Oct 2022 - Fri, 20 Oct 2022
              </h3>
              <p className="text-b1 text-gray-700 mt-1">2 Guests</p>

              <h3 className="text-b1 text-gray-900 font-inter mt-6">Total Refund</h3>
              <p className="text-h5 text-gray-900 font-semibold mt-1">THB 2,300</p>
            </div>

            <div className="flex flex-col items-center w-full border-b-2 border-gray-300">
              <Link
                href="/refund-success"
                className="px-8 py-4 btn-primary font-open-sans font-semibold cursor-pointer"
              >
                Cancel and Refund this Booking
              </Link>

              <Link
                href="/booking-history"
                className="px-4 py-6 flex justify-end text-orange-500 hover:underline font-open-sans font-semibold cursor-pointer"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default index;
