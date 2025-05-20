import React, { useState, useEffect } from "react";
import CustomDatePicker from "../global/date-picker";
import RoomGuestSelector from "../search-result/room-guest-selector";
import { useRouter } from "next/router";
import { addDays, format } from "date-fns";
import api from "@/lib/axios";

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
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [maxCapacity, setMaxCapacity] = useState(1);
  const [actualMaxCapacity, setActualMaxCapacity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { checkIn, checkOut, rooms, guests } = router.query;

      if (checkIn) {
        setCheckInDate(new Date(checkIn));
      }

      if (checkOut) {
        setCheckOutDate(new Date(checkOut));
      }

      if (rooms) {
        setRooms(parseInt(rooms, 10));
      }

      if (guests) {
        setGuests(parseInt(guests, 10));
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const fetchMaxCapacity = async () => {
      setLoading(true);
      try {
        const response = await api.get("/max-guest");
        const maxGuest = response.data.data.maxGuest;
        setMaxCapacity(maxGuest);
        setActualMaxCapacity(maxGuest);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMaxCapacity();
  }, []);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);

    if (date >= checkOutDate) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    }
  };

  const handleAddRoom = () => {
    const newRooms = rooms + 1;
    const newMaxCapacity = actualMaxCapacity * newRooms;

    setRooms(newRooms);
    setMaxCapacity(newMaxCapacity);

    if (guests < newRooms) {
      setGuests(newRooms)
    }
  };

  const handleRemoveRoom = () => {
    if (rooms > 1) {
      const newRooms = rooms - 1;
      const newMaxCapacity = actualMaxCapacity * newRooms;

      setRooms(newRooms);
      setMaxCapacity(newMaxCapacity);

      if (guests > newMaxCapacity) {
        setGuests(newMaxCapacity);
      }
    }
  };

  const handleAddGuest = () => {
    setGuests((prevGuests) => prevGuests + 1);
  };

  const handleRemoveGuest = () => {
    if (guests > rooms) {
      setGuests((prevGuests) => prevGuests - 1);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    const checkInStr = format(checkInDate, "yyyy-MM-dd");
    const checkOutStr = format(checkOutDate, "yyyy-MM-dd");

    const queryParams = new URLSearchParams({
      checkIn: checkInStr,
      checkOut: checkOutStr,
      rooms: rooms,
      guests: guests,
    });

    router.push(`/search-result?${queryParams.toString()}`);
    setLoading(false);
  };

  const disableCheckoutDates = (date) => {
    return date <= checkInDate;
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-sm w-full gap-6 md:gap-10 h-full p-4 text-gray-900 pt-8
        flex flex-col md:flex-row md:flex-wrap md:justify-center md:items-end md:p-16 lg:flex-nowrap ${
          pageType === "search-result" ? "md:py-10" : "md:p-16 2xl:w-[1200px] 2xl:mx-auto"
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

      <div className="flex-1 md:max-w-[240px]">
        <div className="-translate-y-2.5">
          <label
            htmlFor="rooms-guests"
            className="text-gray-900 whitespace-nowrap text-ellipsis overflow-hidden"
          >
            Rooms & Guests
          </label>
          <RoomGuestSelector
            rooms={rooms}
            onAddRoom={handleAddRoom}
            onRemoveRoom={handleRemoveRoom}
            guests={guests}
            onAddGuest={handleAddGuest}
            onRemoveGuest={handleRemoveGuest}
            maxCapacity={maxCapacity}
            pageType={pageType}
          />
        </div>
      </div>

      <div className="-translate-y-2.5 flex-1 md:max-w-[240px]">
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
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default SearchRoom;
