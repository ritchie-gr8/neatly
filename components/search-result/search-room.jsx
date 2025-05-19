import React, { useState, useEffect } from "react";
import CustomDatePicker from "../global/date-picker";
import RoomGuestSelector from "../search-result/room-guest-selector";
import { useRouter } from "next/router";
import { addDays, format } from "date-fns";

const SearchRoom = ({
  initialRoomTypeId = null,
  pageType = "search-result",
}) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [maxCapacity, setMaxCapacity] = useState(10);

  const getMaxCapacityFromRoomTypes = async () => {
    try {
      const response = await fetch("/api/rooms/get-rooms");
      if (!response.ok) {
        throw new Error("Failed to fetch room types");
      }

      const data = await response.json();

      if (data.success && data.maxCapacity !== undefined) {
        const maxCap = parseInt(data.maxCapacity);
        if (!isNaN(maxCap) && maxCap > 0) {
          setMaxCapacity(maxCap);
          return maxCap;
        }
      } else if (data.success && data.data && Array.isArray(data.data)) {
        let maxCap = 0;
        data.data.forEach((room) => {
          const capacity = parseInt(room.roomType?.capacity || 0);
          if (!isNaN(capacity) && capacity > maxCap) {
            maxCap = capacity;
          }
        });

        if (maxCap > 0) {
          setMaxCapacity(maxCap);
          return maxCap;
        }
      }

      return 10;
    } catch (error) {
      return 10;
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const { checkIn, checkOut, rooms, guests } = router.query;

      if (checkIn) {
        setCheckInDate(new Date(checkIn));
        setUserSelectedCheckIn(true);
      }

      if (checkOut) {
        setCheckOutDate(new Date(checkOut));
        setUserSelectedCheckOut(true);
      }

      if (rooms) {
        setRooms(parseInt(rooms, 10));
      }

      if (guests) {
        setGuests(parseInt(guests, 10));
      }
    }
  }, [router.isReady, router.query]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);

  const [userSelectedCheckIn, setUserSelectedCheckIn] = useState(false);
  const [userSelectedCheckOut, setUserSelectedCheckOut] = useState(false);

  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (maxCapacity) {
      const maxGuests = rooms * maxCapacity;

      if (guests > maxGuests) {
        setGuests(maxGuests);
      } else if (guests < rooms) {
        setGuests(rooms);
      }
    }
  }, [maxCapacity, rooms, guests]);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    setUserSelectedCheckIn(true);

    if (checkOutDate && checkOutDate <= date) {
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      setCheckOutDate(nextDay);
      setUserSelectedCheckOut(false);
    }
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    setUserSelectedCheckOut(true);
  };

  const handleSearch = () => {
    const checkInStr = format(checkInDate, "yyyy-MM-dd");
    const checkOutStr = format(checkOutDate, "yyyy-MM-dd");

    const queryParams = new URLSearchParams({
      checkIn: checkInStr,
      checkOut: checkOutStr,
      rooms: rooms,
      guests: guests,
    });

    router.push(`/search-result?${queryParams.toString()}`);
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-sm w-full h-full p-4 text-gray-900 md:flex md:flex-row md:justify-center md:items-center md:p-16 ${
        pageType === "search-result" ? "md:px-56 md:py-10" : "md:p-16"
      }`}
    >
      <div className="w-full mb-4 sm:mb-4 md:mb-0 md:flex-1 flex flex-col md:flex-row gap-6">
        <CustomDatePicker
          title="Check In"
          defaultValue={new Date()}
          onDateChange={setCheckInDate}
          className="mb-0 h-12"
        />

        <div className="md:inline-block md:px-0 hidden md:mt-8">-</div>

        <CustomDatePicker
          title="Check Out"
          defaultValue={addDays(new Date(), 1)}
          onDateChange={setCheckOutDate}
          className="mb-0 h-12"
        />
      </div>

      <div className="flex flex-col w-full mb-4 sm:mb-4 md:mb-0 md:flex-1 md:ml-10">
        <label
          htmlFor="rooms-guests"
          className="text-gray-900 whitespace-nowrap text-ellipsis overflow-hidden"
        >
          Rooms & Guests
        </label>
        <RoomGuestSelector
          rooms={rooms}
          setRooms={setRooms}
          guests={guests}
          setGuests={setGuests}
          maxCapacity={maxCapacity}
        />
      </div>

      <div
        className={`flex flex-col justify-end w-full md:ml-10 ${
          isScrolled ? "mt-0" : "mt-2"
        } ${!isMobileView ? "md:w-1/4 md:mt-0" : ""}`}
      >
        <label
          className={`invisible text-white ${
            !isMobileView ? "md:block" : ""
          } mb-2`}
        >
          Placeholder
        </label>

        <button
          className={`w-full border border-orange-500 text-orange-500 h-10 px-4 rounded-sm cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300`}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchRoom;
