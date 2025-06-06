import DefaultLayout from "@/layouts/default.layout";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <DefaultLayout>
      <div className="bg-util-bg w-full h-screen">
        <div className="bg-green-800 py-10 px-4">
          <h1 className="text-white text-h3 text-center">
            Your Request has been Submitted
          </h1>
          <p className="text-green-400 text-b2 text-center mt-3">
            The cancellation is complete. You will recieve an email with a
            detail and refund within 48 hours.
          </p>
        </div>

        <div className="bg-green-700 px-4 pt-6 pb-10">
          <div className="bg-green-600 rounded-sm p-4">
            <p className="text-h5 font-semibold text-white">Superior Garden View</p>

            <p className="font-semibold text-white mt-4">Th, 19 Oct 2022 - Fri, 20 Oct 2022</p>
            <p className="text-b1 font-semibold text-white mb-10 mt-1">2 Guests</p>

            <p className="text-green-300 text-b1">Booking date: Tue, 16 Oct 2022</p>
            <p className="text-green-300 text-b1 mt-2">Cancellation date: Tue, 16 Oct 2022</p>
          </div>

          <div className="border-t-2 border-green-300 flex justify-between mt-10 pt-7">
            <p className="text-green-300 text-b1">Total Refund</p>
            <p className="text-white text-h5 font-semibold">THB 2,300.00</p>
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

export default index;
