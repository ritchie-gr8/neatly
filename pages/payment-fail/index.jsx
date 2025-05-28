import DefaultLayout from "@/layouts/default.layout";
import Link from "next/link";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const index = () => {
  return (
    <DefaultLayout title="Payment Success">
      <div className="bg-white md:bg-util-bg w-full min-h-screen md:px-80 md:pt-20 ">
        <div className="bg-orange-100 text-center px-6 py-48 flex items-center justify-center flex-col">
          <HiOutlineExclamationCircle className="text-orange-600 w-16 h-16 mb-4" />
          <p className="text-h3 text-orange-600 font-noto-serif">
            Payment failed
          </p>
          <p className="text-b2 text-orange-500 mt-3 md:mx-6">
            There seems to be an issue with your card. Please check your card
            details and try again later, or use a different payment method.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pt-9 font-semibold cursor-pointer md:flex md:justify-center">
          <Link href="/">
            <div className=" md:hidden btn-primary px-8 py-4 flex items-center justify-center">
              Back to Payment details
            </div>
          </Link>
          <Link href="/payment">
            <div className="hidden md:flex px-8 pt-6  items-center justify-center text-orange-500 hover:underline">
              Retry Payment
            </div>
          </Link>

          <Link href="/payment">
            <div className="md:hidden px-8 pt-6 flex items-center justify-center text-orange-500 hover:underline">
              Retry Payment
            </div>
          </Link>
          <Link href="/">
            <div className="hidden md:flex btn-primary px-8 py-4 items-center justify-center">
              Back to Payment details
            </div>
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default index;
