// contexts/booking-context.js (Updated version)
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import api from "@/lib/axios";

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

// Special request prices
const SPECIAL_REQUEST_PRICES = {
  babyCot: 400,
  airportTransfer: 200,
  extraBed: 500,
  extraPillows: 100,
  phoneChargers: 100,
  breakfast: 150,
};

export const BookingProvider = ({ children }) => {
  const [countdown, setCountdown] = useState(300); 
  const countdownRef = useRef(null);

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({
    basicInfo: {},
    specialRequests: {},
    paymentMethod: {}
  });

  const [bookingData, setBookingData] = useState({
    basicInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: null,
      country: "",
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

  const [bookingDetail, setBookingDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calculate special requests total price
  const calculateSpecialRequestsPrice = (specialRequests) => {
    let totalPrice = 0;
    
    if (specialRequests && specialRequests.specialRequests) {
      Object.entries(specialRequests.specialRequests).forEach(([key, isSelected]) => {
        if (isSelected && SPECIAL_REQUEST_PRICES[key]) {
          totalPrice += SPECIAL_REQUEST_PRICES[key];
        }
      });
    }
    
    return totalPrice;
  };

  // Calculate total booking price
  const calculateTotalPrice = () => {
    if (!bookingDetail) return 0;
    
    const basePrice = parseFloat(bookingDetail.totalAmount || 0);
    const specialRequestsPrice = calculateSpecialRequestsPrice(bookingData.specialRequests);
    
    return basePrice + specialRequestsPrice;
  };

  // Get price breakdown
  const getPriceBreakdown = () => {
    const basePrice = bookingDetail ? parseFloat(bookingDetail.totalAmount || 0) : 0;
    const specialRequestsPrice = calculateSpecialRequestsPrice(bookingData.specialRequests);
    const totalPrice = basePrice + specialRequestsPrice;

    const selectedSpecialRequests = [];
    if (bookingData.specialRequests && bookingData.specialRequests.specialRequests) {
      Object.entries(bookingData.specialRequests.specialRequests).forEach(([key, isSelected]) => {
        if (isSelected && SPECIAL_REQUEST_PRICES[key]) {
          selectedSpecialRequests.push({
            name: key,
            price: SPECIAL_REQUEST_PRICES[key],
            displayName: getSpecialRequestDisplayName(key)
          });
        }
      });
    }

    return {
      basePrice,
      specialRequestsPrice,
      totalPrice,
      selectedSpecialRequests
    };
  };

  // Get display name for special requests
  const getSpecialRequestDisplayName = (key) => {
    const displayNames = {
      babyCot: "Baby cot",
      airportTransfer: "Airport transfer",
      extraBed: "Extra bed",
      extraPillows: "Extra pillows",
      phoneChargers: "Phone chargers and adapters",
      breakfast: "Breakfast"
    };
    return displayNames[key] || key;
  };

  // Get complete booking data with calculations
  const getCompleteBookingData = () => {
    const priceBreakdown = getPriceBreakdown();
    
    return {
      ...bookingData,
      bookingDetail,
      priceBreakdown,
      metadata: {
        createdAt: new Date().toISOString(),
        countdown,
      }
    };
  };

  const fetchBookingDetail = async (bookingId) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await api.get(`/payment/get-booking-detail?bookingId=${bookingId}`);

      console.log('data', data)
      if (data.success) {
        console.log('fetched from booking context')
        setBookingDetail(data.bookingDetails);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch booking details");
    } finally {
      setLoading(false);
    }
  };

  // Clear validation errors for a specific section
  const clearValidationErrors = (section) => {
    setValidationErrors(prev => ({
      ...prev,
      [section]: {}
    }));
  };

  // Set validation errors for a specific section
  const setValidationErrorsForSection = (section, errors) => {
    setValidationErrors(prev => ({
      ...prev,
      [section]: errors
    }));
  };

  const updateBasicInfo = (data) => {
    setBookingData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, ...data },
    }));
  };

  const updateSpecialRequests = (data) => {
    setBookingData((prev) => ({
      ...prev,
      specialRequests: { ...prev.specialRequests, ...data },
    }));
  };

  const updatePaymentMethod = (data) => {
    setBookingData((prev) => ({
      ...prev,
      paymentMethod: { ...prev.paymentMethod, ...data },
    }));
  };

  const resetBookingData = () => {
    setBookingData({
      basicInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: null,
        country: "",
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
    setBookingDetail(null);
    setError(null);
    setValidationErrors({
      basicInfo: {},
      specialRequests: {},
      paymentMethod: {}
    });
  };

  useEffect(() => {
    if (countdown === 0 && countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
      console.log("Countdown finished");
    }
  }, [countdown]);

  const startCountdown = () => {
    setCountdown(300);
    if (countdownRef.current) clearInterval(countdownRef.current);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  };

  const stopCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  const value = {
    bookingData,
    bookingDetail,
    loading,
    error,
    validationErrors,
    updateBasicInfo,
    updateSpecialRequests,
    updatePaymentMethod,
    resetBookingData,
    fetchBookingDetail,
    countdown,
    startCountdown,
    stopCountdown,
    // New price calculation functions
    calculateSpecialRequestsPrice,
    calculateTotalPrice,
    getPriceBreakdown,
    getCompleteBookingData,
    SPECIAL_REQUEST_PRICES,
    // New validation functions
    clearValidationErrors,
    setValidationErrorsForSection,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};