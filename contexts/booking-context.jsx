import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const router = useRouter();
  const {user} = useAuth()
  const [countdown, setCountdown] = useState(300);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [bookingData, setBookingData] = useState({
    roomData: null,
    searchParams: null,
    loading: false,
    error: null,
    basicInfo: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      dateOfBirth: "",
    },
    specialRequests: {
      standardRequests: {
        earlyCheckIn: false,
        lateCheckOut: false,
        nonSmokingRoom: false,
        highFloorRoom: false,
        quietRoom: false,
      },
      specialRequests: {
        babyCot: false,
        airportTransfer: false,
        extraBed: false,
        extraPillows: false,
        phoneChargers: false,
        breakfast: false,
      },
      additionalRequest: "",
    },
    paymentMethod: {
      type: "credit",
      creditCard: {
        cardNumber: "",
        cardOwner: "",
        expiryDate: "",
        cvc: "",
      },
    },
  });

  const SPECIAL_REQUEST_PRICES = {
    babyCot: 400,
    airportTransfer: 200,
    extraBed: 500,
    extraPillows: 100,
    phoneChargers: 100,
    breakfast: 150,
  };

  const [validationErrors, setValidationErrors] = useState({
    basicInfo: {},
    specialRequests: {},
    paymentMethod: {},
  });

  const startCountdown = () => {
    setCountdown(300);
    setIsCountdownActive(true);
  };

  const stopCountdown = () => {
    setIsCountdownActive(false);
  };

  const resetCountdown = () => {
    setCountdown(300);
    setIsCountdownActive(false);
  };

  const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;

    if (isCountdownActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsCountdownActive(false);
            setTimeout(() => {
              router.push("/payment-fail");
            }, 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCountdownActive, countdown, router]);

  useEffect(() => {
    if (
      bookingData.roomData &&
      !isCountdownActive &&
      countdown === 300
    ) {
      startCountdown();
    }
  }, [
    bookingData.roomData,
    isCountdownActive,
    countdown,
  ]);

  useEffect(() => {
    if (router.isReady && router.query.bookingNumber) {
      fetchBookingDetail(router.query.bookingNumber);
    }
  }, [router.isReady, router.query.bookingNumber]);

  const updateBasicInfo = (newData) => {
    setBookingData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        ...newData,
      },
    }));
  };

  const updateSpecialRequests = (newData) => {
    setBookingData((prev) => ({
      ...prev,
      specialRequests: {
        ...prev.specialRequests,
        ...newData,
      },
    }));
  };

  const updatePaymentMethod = (newData) => {
    setBookingData((prev) => ({
      ...prev,
      paymentMethod: {
        ...prev.paymentMethod,
        ...newData,
      },
    }));
  };

  const setValidationErrorsForSection = (section, errors) => {
    setValidationErrors((prev) => ({
      ...prev,
      [section]: errors || {},
    }));
  };

  const setBookingFromQuery = (queryParams) => {
    // console.log("📋 Setting booking data from query:", queryParams);

    // รับข้อมูลห้องจาก query parameters โดยตรง
    const roomData = {
      id: queryParams.roomId,
      roomType: {
        id: queryParams.roomTypeId,
        name: queryParams.roomName || "Selected Room",
        pricePerNight: parseFloat(queryParams.pricePerNight),
        promotionPrice: queryParams.promotionPrice
          ? parseFloat(queryParams.promotionPrice)
          : null,
        capacity: parseInt(queryParams.capacity) || 2,
        bedType: {
          bedDescription: queryParams.bedDescription || "Standard Bed",
        },
        roomSize: queryParams.roomSize || "25",
        description:
          queryParams.description || "Comfortable room with modern amenities",
      },
    };

    setBookingData((prev) => ({
      ...prev,
      searchParams: queryParams,
      roomData: roomData,
      loading: false,
    }));

    // console.log("✅ Room data set from query:", roomData);
  };

    const fetchBookingDetail = async () => {
    try {
      const { bookingNumber } = router.query;

      if (!bookingNumber) {
        throw new Error("Booking number is required");
      }

      const response = await api.get(`/booking/${bookingNumber}`);
      const bookingData = response.data;

      // if (bookingData?.userId !== user?.id) {
      //   console.log("Booking not found or unauthorized", bookingData?.userId, user?.id);
      //   // router.push("/");
      // }

      const room = bookingData.bookingRooms[0]?.room;
      const roomType = room?.roomType;

      // const roomData = {
      //    id: room?.id,
      // roomType: {
      //   id: roomType?.id,
      //   name: roomType?.name,
      //   pricePerNight: parseFloat(roomType?.pricePerNight),
      //   promotionPrice: roomType?.promotionPrice
      //     ? parseFloat(roomType?.promotionPrice)
      //     : null,
      //   capacity: parseInt(roomType?.capacity),
      //   bedType: {
      //     bedDescription: roomType?.bedType?.bedDescription || "Standard Bed",
      //   },
      // },
      // }

      setBookingData((prev) => ({
        ...prev,
        guestId: bookingData.guestId,
        bookingId: bookingData.id,
        bookingNumber: bookingData.bookingNumber,
        roomTypeId: roomType?.id,
        pricePerNight: roomType?.pricePerNight,
        promotionPrice: roomType?.promotionPrice,
        isPromotion: roomType?.isPromotion,
        roomId: room?.id,
        checkIn: bookingData.checkInDate,
        checkOut: bookingData.checkOutDate,
        adults: bookingData.adults,
        rooms: bookingData.bookingRooms?.length || 1,
        totalAmount: bookingData.totalAmount,
        bookingStatus: bookingData.bookingStatus,
        roomData: {
          id: roomType?.id,
          name: roomType?.name,
          description: roomType?.description,
          capacity: roomType?.capacity,
          pricePerNight: roomType?.pricePerNight,
          promotionPrice: roomType?.promotionPrice,
          isPromotion: roomType?.isPromotion,
          imageUrl:
            roomType?.roomImages?.find((img) => img.imageDefault)?.imageUrl ||
            roomType?.imageUrl,
          roomImages: roomType?.roomImages || [],
          bedType: roomType?.bedType,
          roomNumber: room?.roomNumber,
        },
      }));

    } catch (err) {
      console.error("Error fetching booking data:", err);
      toast.error("Failed to fetch booking data");
    }
  };


  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    if (!bookingData.roomData || !bookingData.searchParams) return 0;

    const roomData = bookingData.roomData;
    const { checkIn, checkOut, rooms } = bookingData.searchParams;

    const pricePerNight =
      roomData.roomType?.pricePerNight || roomData.pricePerNight || 0;
    const promotionPrice =
      roomData.roomType?.promotionPrice || roomData.promotionPrice || 0;
    const finalPrice =
      promotionPrice && promotionPrice < pricePerNight
        ? promotionPrice
        : pricePerNight;

    const nights = calculateNights(checkIn, checkOut);
    const totalRooms = parseInt(rooms) || 1;

    const basePrice = finalPrice * nights * totalRooms;
    const specialRequestsPrice = calculateSpecialRequestsPrice();

    return basePrice + specialRequestsPrice;
  };

  const calculateSpecialRequestsPrice = () => {
    if (!bookingData.specialRequests) return 0;

    const { specialRequests } = bookingData.specialRequests;
    let total = 0;

    Object.keys(specialRequests).forEach((requestKey) => {
      if (specialRequests[requestKey] && SPECIAL_REQUEST_PRICES[requestKey]) {
        total += SPECIAL_REQUEST_PRICES[requestKey];
      }
    });

    return total;
  };

  const getSelectedSpecialRequests = () => {
    if (!bookingData.specialRequests) return [];

    const { specialRequests } = bookingData.specialRequests;
    const selected = [];

    Object.keys(specialRequests).forEach((requestKey) => {
      if (specialRequests[requestKey] && SPECIAL_REQUEST_PRICES[requestKey]) {
        const displayNames = {
          babyCot: "Baby cot",
          airportTransfer: "Airport transfer",
          extraBed: "Extra bed",
          extraPillows: "Extra pillows",
          phoneChargers: "Phone chargers and adapters",
          breakfast: "Breakfast",
          earlyCheckIn: "Early check-in",
          lateCheckOut: "Late check-out",
          nonSmokingRoom: "Non-smoking room",
          highFloorRoom: "A room on the high floor",
          quietRoom: "A quiet room",
        };

        selected.push({
          key: requestKey,
          displayName: displayNames[requestKey],
          price: SPECIAL_REQUEST_PRICES[requestKey],
        });
      }
    });

    return selected;
  };

  const getStandardRequestsList = () => {
    if (!bookingData.specialRequests) return [];

    const { standardRequests } = bookingData.specialRequests;
    const selected = [];

    Object.keys(standardRequests).forEach((requestKey) => {
      if (standardRequests[requestKey]) {
        const displayNames = {
          earlyCheckIn: "Early check-in",
          lateCheckOut: "Late check-out",
          nonSmokingRoom: "Non-smoking room",
          highFloorRoom: "A room on the high floor",
          quietRoom: "A quiet room",
        };

        selected.push({
          key: requestKey,
          displayName: displayNames[requestKey],
          price: 0,
          notes: "STANDARD",
        });
      }
    });

    return selected;
  };

  const getPriceBreakdown = () => {
    if (!bookingData.roomData) {
      return {
        basePrice: 0,
        specialRequestsPrice: 0,
        totalPrice: 0,
        selectedSpecialRequests: [],
        pricePerNight: 0,
        nights: 0,
        totalRooms: 0,
      };
    }

    const roomData = bookingData.roomData;
    const { checkIn, checkOut, rooms } = bookingData;

    const pricePerNight =
      roomData.roomType?.pricePerNight || roomData.pricePerNight || 0;
    const promotionPrice =
      roomData.roomType?.promotionPrice || roomData.promotionPrice || 0;
    const finalPrice =
      promotionPrice && promotionPrice < pricePerNight
        ? promotionPrice
        : pricePerNight;

    const nights = calculateNights(checkIn, checkOut);
    const totalRooms = parseInt(rooms) || 1;

    const basePrice = finalPrice * nights * totalRooms;
    const specialRequestsPrice = calculateSpecialRequestsPrice();
    const selectedSpecialRequests = getSelectedSpecialRequests();
    const selectedStandardRequests = getStandardRequestsList();

    return {
      basePrice,
      specialRequestsPrice,
      totalPrice: basePrice + specialRequestsPrice,
      selectedSpecialRequests,
      selectedStandardRequests,
      pricePerNight: finalPrice,
      nights,
      totalRooms,
    };
  };

  const getCompleteBookingData = () => {
    const priceBreakdown = getPriceBreakdown();

    return {
      basicInfo: bookingData.basicInfo,
      specialRequests: bookingData.specialRequests,
      paymentMethod: bookingData.paymentMethod,
      bookingDetail: {
        roomData: bookingData.roomData,
        searchParams: bookingData.searchParams,
        nights: calculateNights(
          bookingData.searchParams?.checkIn,
          bookingData.searchParams?.checkOut
        ),
        totalRooms: parseInt(bookingData.searchParams?.rooms) || 1,
        totalGuests: parseInt(bookingData.searchParams?.adults) || 1,
      },
      priceBreakdown: priceBreakdown,
    };
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        validationErrors,
        updateBasicInfo,
        updateSpecialRequests,
        updatePaymentMethod,
        setValidationErrorsForSection,
        setBookingFromQuery,
        calculateNights,
        calculateTotalPrice,
        calculateSpecialRequestsPrice,
        getSelectedSpecialRequests,
        getPriceBreakdown,
        getCompleteBookingData,
        countdown,
        isCountdownActive,
        startCountdown,
        stopCountdown,
        resetCountdown,
        formatCountdown,
        SPECIAL_REQUEST_PRICES,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
