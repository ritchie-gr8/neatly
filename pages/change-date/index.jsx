import React, { useState } from "react";
import DefaultLayout from "@/layouts/default.layout";
import Image from "next/image";
import Link from "next/link";
import CustomDatePicker from "@/components/global/date-picker";
import ReuseModal from "@/components/ิbooking-history/reuse-modal";

const index = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);

    if (date >= checkOutDate) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    }
  };

  const disableCheckoutDates = (date) => {
    return date <= checkInDate;
  };

  return (
    <DefaultLayout title="Change Check-in and Check-out Date">
      <div className="bg-util-bg w-full h-screen md:px-40">
        <h1 className="text-green-800 text-h3 px-4 pt-10 pb-6">
          Change Check-in and Check-out Date
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
              <h3 className="text-gray-800 font-semibold font-inter mb-1">
                Original Date
              </h3>
              <p className="text-b1 text-gray-700">
                Th, 19 Oct 2022 - Fri, 20 Oct 2022
              </p>
            </div>

            <div className="bg-white rounded-sm p-4 mb-6">
              <h3 className="text-gray-800 font-semibold font-inter mb-4">
                Change Date
              </h3>

              <div className="-translate-y-2.5 flex-1 md:max-w-[240px] text-gray-900 font-inter mb-1">
                <CustomDatePicker
                  title="Check In"
                  defaultValue={checkInDate}
                  value={checkInDate}
                  onDateChange={handleCheckInDateChange}
                  className="mb-6 h-12 w-full text-gray-900 font-inter"
                />
              </div>

              <div className="-translate-y-2.5 flex-1 md:max-w-[240px] text-gray-900 font-inter mb-1">
                <CustomDatePicker
                  title="Check Out"
                  defaultValue={checkOutDate}
                  value={checkOutDate}
                  onDateChange={setCheckOutDate}
                  disabledDate={disableCheckoutDates}
                  className="mb-0 h-12 text-gray-900 font-inter border border-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-col items-center w-full border-b-2 border-gray-300">
            <ReuseModal
                triggerButton="Confirm Change Date"
                triggerButtonClass="btn-primary px-8 py-4 w-full text-center font-open-sans font-semibold"
                title="Change Date"
                message="Are you sure you want to change your check-in and check-out date?"
                confirmText="Yes, I want to change"
                cancelText="No, I don't"
                confirmButtonStyle="orange"
                onConfirm={() =>
                  console.log("เปลี่ยนวันที่!", { checkInDate, checkOutDate })
                }
              />

              <Link
                href="/request-refund"
                className="px-4 py-6 flex justify-end text-orange-500 hover:underline font-open-sans font-semibold cursor-pointer"
              >
                Cancel Booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default index;
