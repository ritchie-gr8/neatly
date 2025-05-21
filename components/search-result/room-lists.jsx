import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/axios";
import { useRouter } from "next/router";
import { formatPrice } from "@/lib/utils";

const RoomLists = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxCapacity, setMaxCapacity] = useState(10);

  const {
    checkIn,
    checkOut,
    rooms: roomCount,
    guests: guestCount,
  } = router.query;

  const getMaxCapacityFromRooms = (roomsData) => {
    if (!Array.isArray(roomsData) || roomsData.length === 0) return 0;

    let maxCap = 0;
    roomsData.forEach((room) => {
      const capacity = room.roomType?.capacity || 0;
      if (capacity > maxCap) {
        maxCap = capacity;
      }
    });

    return maxCap;
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await api.get("/rooms/get-rooms");

        if (response.data) {
          const fetchedData = response.data || [];
          const roomsArray = fetchedData.rooms;
          setRooms(roomsArray);
          setMaxCapacity(fetchedData.maxCapacity);
        } else {
          setRooms([]);
        }
        setLoading(false);
      } catch (err) {
        setError("Unable to load data. Please try again.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (!rooms.length) return;

    if (!roomCount || !guestCount) {
      setFilteredRooms(rooms);
      return;
    }

    const numRooms = parseInt(roomCount, 10) || 1;
    const numGuests = parseInt(guestCount, 10) || 1;

    const filtered = rooms.filter((room) => {
      const roomType = room.roomType || {};
      const capacity = roomType.capacity || 0;

      const guestsPerRoom = Math.ceil(numGuests / numRooms);

      return capacity >= guestsPerRoom;
    });

    setFilteredRooms(filtered);
  }, [rooms, roomCount, guestCount, maxCapacity]);

  if (loading) {
    return <div className="text-center py-10">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (filteredRooms.length === 0 && rooms.length > 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">
          No rooms found that match your search criteria.
        </h2>
        <p className="text-gray-600 mb-4">
          Please change the number of rooms or number of guests.
        </p>
        <Link href="/" className="text-orange-500 hover:underline">
          Return to search page
        </Link>
      </div>
    );
  }

  if (filteredRooms.length === 0) {
    return (
      <div className="text-center py-10">Can not find room information.</div>
    );
  }

  return (
    <div>
      {filteredRooms.map((room, index) => {
        const roomType = room.roomType || {};
        const bedType = roomType.bedType || {};
        const roomImages = roomType.roomImages || [];

        const imageUrl =
          roomImages.length > 0 && roomImages[0].imageUrl
            ? roomImages[0].imageUrl
            : "https://placehold.co/600x400";
        const roomName = roomType.name || "Room Name Not Available";
        const capacity = roomType.capacity || "N/A";
        const bedDescription = bedType.bedDescription || "N/A";
        const roomSize = roomType.roomSize || "N/A";
        const description = roomType.description || "No description available";
        const pricePerNight = roomType.pricePerNight || 0;
        const promotionPrice = roomType.promotionPrice || 0;

        return (
          <section
            key={room.id || index}
            className="border-b-2 border-gray-300 pb-6 md:pb-8 lg:pb-0"
          >
            <div
              className="pt-6 md:pt-8 lg:pt-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-40
                                        flex flex-col md:flex-row md:items-stretch md:py-8 lg:py-20 gap-4 md:gap-6 lg:gap-8"
            >
              <Image
                src={imageUrl}
                alt={`${roomName}-image`}
                width={0}
                height={0}
                className="w-full object-cover md:w-1/3 h-64 md:h-72 lg:h-80 rounded-sm"
                priority
                unoptimized
              />

              <div className="py-4 md:px-4 md:py-0 md:w-1/3 lg:pl-8">
                <h1 className="text-black text-2xl md:text-2xl lg:text-3xl font-semibold font-inter">
                  {roomName}
                </h1>

                <p className="text-gray-700 text-sm md:text-base mt-2 md:mt-4">
                  {capacity} Guests <span className="text-gray-500"> | </span>
                  {bedDescription}
                  <span className="text-gray-500"> | </span>
                  {roomSize} sqm
                </p>

                <p className="text-gray-700 text-sm md:text-base mt-2 md:mt-4 line-clamp-4 md:line-clamp-none">
                  {description}
                </p>
              </div>

              <div className="w-full md:w-1/3 lg:w-1/3 flex flex-col items-end justify-between">
                <div className="text-right w-full">
                  {promotionPrice && promotionPrice < pricePerNight ? (
                    <>
                      <p className="line-through text-sm md:text-base text-gray-500">
                        THB {formatPrice(pricePerNight)}
                      </p>
                      <p className="text-xl sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mt-1">
                        THB {formatPrice(promotionPrice)}
                      </p>
                    </>
                  ) : (
                    <p className="text-xl sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">
                      THB {formatPrice(pricePerNight)}
                    </p>
                  )}
                  <p className="mt-1 md:mt-2 text-base sm:text-sm md:text-base text-gray-700">
                    Per Night
                  </p>
                  <p className="text-base sm:text-sm md:text-base text-gray-700">
                    (Including Taxes & Fees)
                  </p>

                  {checkIn && checkOut && (
                    <p className="mt-2 text-sm text-gray-700">
                      {`Total ${calculateNights(
                        checkIn,
                        checkOut
                      )} night(s) : THB ${formatPrice(calculateTotalPrice(
                        promotionPrice || pricePerNight,
                        checkIn,
                        checkOut
                      ))}`}
                    </p>
                  )}
                </div>

                <div className="flex flex-row mt-6 mb-2 md:mt-0 md:mb-0 w-full justify-between items-center md:space-x-4">
                  <Link
                    href={`/room-detail/${room.id || index}`}
                    className="text-orange-500 font-semibold whitespace-nowrap text-base sm:text-sm md:text-base"
                  >
                    Room Detail
                  </Link>
                  <Link
                    href={{
                      pathname: `/booking/${room.id || index}`,
                      query: {
                        checkIn,
                        checkOut,
                        rooms: roomCount,
                        guests: guestCount,
                      },
                    }}
                    className="w-auto sm:w-auto"
                  >
                    <button className="bg-orange-600 text-white px-8 py-3 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-sm text-base sm:text-sm md:text-base cursor-pointer whitespace-nowrap hover:bg-orange-500 transition-all duration-300 min-w-[130px] sm:min-w-0">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );

  function calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function calculateTotalPrice(pricePerNight, checkIn, checkOut) {
    const nights = calculateNights(checkIn, checkOut);
    return parseFloat(pricePerNight) * nights;
  }
};

export default RoomLists;
