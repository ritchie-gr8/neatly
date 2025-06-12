import React, { useState, useEffect } from "react";
import CustomDatePicker from "../global/date-picker";
import RoomGuestSelector from "../search-result/room-guest-selector";
import { useRouter } from "next/router";
import { format } from "date-fns";
import api from "@/lib/axios";
import Loading from "../global/loading";

const SearchRoom = ({
  initialRoomTypeId = null,
  pageType = "search-result",
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(false);

  // อ่านค่าจาก URL เมื่อโหลดหน้า Search Result
  useEffect(() => {
    if (pageType === "search-result" && router.isReady) {
      const { checkIn, checkOut, rooms, guests } = router.query;

      if (checkIn) {
        setCheckInDate(new Date(checkIn));
      }

      if (checkOut) {
        setCheckOutDate(new Date(checkOut));
      }

      if (rooms) {
        setRoomCount(parseInt(rooms, 10));
      }

      if (guests) {
        setGuestCount(parseInt(guests, 10));
      }

      setLoading(false);
    }
  }, [router.isReady, router.query, pageType]);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);

    if (date >= checkOutDate) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    const checkInStr = format(checkInDate, "yyyy-MM-dd");
    const checkOutStr = format(checkOutDate, "yyyy-MM-dd");

    const queryParams = new URLSearchParams({
      checkIn: checkInStr,
      checkOut: checkOutStr,
      rooms: roomCount,
      guests: guestCount,
    });

    router.push(`/search-result?${queryParams.toString()}`);
  };

  const disableCheckoutDates = (date) => {
    return date <= checkInDate;
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-sm w-full gap-6 md:gap-10 h-full p-4 text-gray-900 pt-8
        flex flex-col md:flex-row md:flex-wrap md:justify-center md:items-end md:p-16 lg:flex-nowrap ${
          pageType === "search-result"
            ? "md:py-10"
            : "md:p-16 2xl:w-[1200px] 2xl:mx-auto"
        }`}
    >
      <div className="-translate-y-2.5 flex-1 md:max-w-[240px]">
        <CustomDatePicker
          title="Check In"
          defaultValue={checkInDate}
          value={checkInDate}
          onDateChange={handleCheckInDateChange}
          className="mb-0 h-12 w-full"
        />
      </div>
      <div className="-translate-y-2.5 flex-1 md:max-w-[240px]">
        <CustomDatePicker
          title="Check Out"
          defaultValue={checkOutDate}
          value={checkOutDate}
          onDateChange={setCheckOutDate}
          disabledDate={disableCheckoutDates}
          className="mb-0 h-12"
        />
      </div>

      <div className="flex-1 md:max-w-[240px] w-full">
        <div className="-translate-y-2.5 ">
          <label
            htmlFor="rooms-guests"
            className="text-gray-900 whitespace-nowrap text-ellipsis "
          >
            Rooms & Guests
          </label>
          <RoomGuestSelector
            roomCount={roomCount}
            guestCount={guestCount}
            onRoomChange={setRoomCount}
            onGuestChange={setGuestCount}
          />
        </div>
      </div>

      <div className=" -translate-y-2.5 flex-1 md:max-w-[240px]">
        {loading ? (
          <Loading
            size="sm"
            customClasses={{
              text: "text-lg",
              dot: "text-2xl",
              gap: "gap-2",
              py: "pb-2",
            }}
          />
        ) : (
          <button
            className={`w-full py-3 md:py-3 md:px-6 rounded-sm cursor-pointer ${
              pageType === "landing-page"
                ? "text-white bg-orange-500 hover:bg-orange-400"
                : "text-orange-500 hover:text-white hover:bg-orange-500 border border-orange-500"
            }`}
            onClick={handleSearch}
            pageType="search-result"
            disabled={loading}
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchRoom;
