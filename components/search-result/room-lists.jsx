import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const RoomLists = () => {
  const router = useRouter();
  const { checkIn, checkOut, rooms, guests } = router.query;
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAvailableRooms = async (searchParams) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/rooms/get-available-room", {
        params: searchParams,
      });

      if (response.data && response.data.success) {
        setAvailableRooms(response.data.rooms || []);
      } else {
        setError("No available rooms found");
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const errorData = err.response.data;
        setError(`Error ${status}: ${errorData.message || "Unknown error"}`);
      } else if (err.request) {
        setError("Unable to connect to server");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady && checkIn && checkOut && rooms && guests) {
      const searchParams = {
        checkIn,
        checkOut,
        rooms: parseInt(rooms),
        guests: parseInt(guests),
      };

      fetchAvailableRooms(searchParams);
    } else {
      if (router.isReady) {
        setLoading(false);
        setError("Search parameters incomplete");
      }
    }
  }, [router.isReady, checkIn, checkOut, rooms, guests]);

  const calculateNights = (checkInDate, checkOutDate) => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalPrice = (pricePerNight, nights, roomsNeeded) => {
    return pricePerNight * nights * roomsNeeded;
  };

  const handleBookNow = async (room) => {
    try {
      const nights = calculateNights(checkIn, checkOut);
      const roomsNeeded = parseInt(rooms) || 1;
      const pricePerNight =
        room.roomType.promotionPrice &&
        room.roomType.promotionPrice < room.roomType.pricePerNight
          ? room.roomType.promotionPrice
          : room.roomType.pricePerNight;
      const totalAmount = calculateTotalPrice(
        pricePerNight,
        nights,
        roomsNeeded
      );

      // Mock ข้อมูล Guest ก่อน (จะอัพเดทภายหลัง)
    const mockGuestData = {
      firstName: "John",
      lastName: "Doe", 
      email: "john.doe@example.com",
      phone: "0812345678",
      country: "Thailand",
      dateOfBirth: "1990-01-01"
    };

      const bookingData = {
        guest: mockGuestData,
        booking: {
          checkInDate: checkIn,
          checkOutDate: checkOut,
          adults: parseInt(guests),
          additionalRequests: "", // หรือจาก form
          totalAmount: totalAmount,
        },
        bookingRoom: {
          roomId: room.id,
          roomTypeId: room.roomType.id,
          pricePerNight: pricePerNight,
        },
        specialRequests: [], // array ของ special requests ถ้ามี
        payment: {
          totalAmount: totalAmount,
          method: "credit", // default หรือจาก user selection
        },
      };

      // เรียก API สร้าง booking
      const response = await api.post("/booking/post-booking-detail", bookingData);

      if (response.data && response.data.success) {
        // ถ้าสร้าง booking สำเร็จ ให้ redirect ไปหน้า payment พร้อมกับ booking ID
        const bookingId = response.data.data.booking.id;
        const bookingNumber = response.data.data.booking.bookingNumber;      
        router.push({
          pathname: '/payment',
          query: {
            guestId: response.data.data.guest.id,
            bookingId: bookingId,
            bookingNumber: bookingNumber,
            roomTypeId: room.roomType.id,
            pricePerNight: room.roomType.isPromotion ? room.roomType.promotionPrice : room.roomType.pricePerNight,
            roomId: room.id,
            checkIn: checkIn,
            checkOut: checkOut,
            adults: parseInt(guests),
            rooms: parseInt(rooms),
            totalAmount: totalAmount
          }
        });
      } else {
        throw new Error(response.data.message || "Failed to create booking");
      }

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 ">Loading data...</div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (availableRooms.length === 0) {
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

  return (
    <div>
      {availableRooms.map((room, index) => {
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

        const nights = calculateNights(checkIn, checkOut);
        const roomsNeeded = parseInt(rooms) || 1;
        const finalPrice =
          promotionPrice && promotionPrice < pricePerNight
            ? promotionPrice
            : pricePerNight;
        const totalPrice = calculateTotalPrice(finalPrice, nights, roomsNeeded);

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
                      {`Total ${nights} night(s) : THB ${formatPrice(
                        totalPrice
                      )}`}
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

                  <button
                    onClick={() => handleBookNow(room)}
                    className="bg-orange-600 text-white px-8 py-3 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-sm text-base sm:text-sm md:text-base cursor-pointer whitespace-nowrap hover:bg-orange-500 transition-all duration-300 min-w-[130px] sm:min-w-0"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default RoomLists;
