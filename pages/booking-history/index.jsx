import ReuseModal from "@/components/ิbooking-history/reuse-modal";
import DefaultLayout from "@/layouts/default.layout";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DefaultLayout title="Booking History" showFooter={true}>
      <div className="bg-util-bg w-full h-full md:px-40">
        <h1 className="text-green-800 text-h3 px-4 pt-10 md:pt-20 pb-6 md:pb-16">
          Booking History
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

              <div className="py-6">
                <h3 className="text-gray-800 font-semibold font-inter mb-1">
                  Check-in
                </h3>
                <p className="text-b1 text-gray-800">
                  Th, 19 Oct 2022 | After 2:00 PM
                </p>

                <h3 className="text-gray-800 font-semibold font-inter mb-1 mt-4">
                  Check-out
                </h3>
                <p className="text-b1 text-gray-800">
                  Th, 20 Oct 2022 | After 12:00 PM
                </p>

                <div
                  className="my-6 p-4 flex justify-between items-center bg-gray-200 rounded-sm cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <p className="text-gray-900 font-open-sans font-semibold">
                    Booking Detail
                  </p>
                  <FiChevronDown
                    size={24}
                    className={`text-orange-500 font-semibold transition-transform ${
                      isOpen ? "rotate-180" : ""
                    } `}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <Link
                    href="/"
                    className="px-8 text-orange-500 hover:underline font-open-sans font-semibold cursor-pointer"
                  >
                    Room Detail
                  </Link>
                  <Link
                    href="/change-date"
                    className="btn-primary px-8 py-4 font-open-sans font-semibold"
                  >
                    Change Date
                  </Link>
                </div>

                <div className="border-b-2 border-gray-300 flex justify-end">
                  {/* 👈 ใช้ ReuseModal แทนปุ่มธรรมดา */}
                  <ReuseModal
                    triggerButton="Cancel Booking"
                    triggerButtonClass="px-4 py-6 text-orange-500 hover:underline font-open-sans font-semibold cursor-pointer"
                    title="Cancel Booking"
                    message="Are you sure you would like to cancel this booking?"
                    confirmText="No, Don't Cancel"
                    cancelText="Yes, I want to cancel and request refund"
                    onConfirm={() => console.log("ยกเลิกการจอง!")}
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default index;
