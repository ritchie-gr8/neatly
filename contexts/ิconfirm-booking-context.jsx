// contexts/confirm-booking-context.js
import React, { createContext, useContext, useState } from "react";

const ConfirmBookingContext = createContext();

export const ConfirmBookingProvider = ({ children }) => {
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const confirmBooking = (bookingData) => {
    console.log("🎉 BOOKING CONFIRMED! Complete data for Omise:");
    console.log("=====================================");
    
    // Basic Information
    console.log("👤 Basic Information:");
    console.log({
      firstName: bookingData.basicInfo.firstName,
      lastName: bookingData.basicInfo.lastName,
      email: bookingData.basicInfo.email,
      phone: bookingData.basicInfo.phone,
      country: bookingData.basicInfo.country,
      dateOfBirth: bookingData.basicInfo.dateOfBirth
    });

    // Payment Method
    console.log("💳 Payment Method:");
    console.log({
      type: bookingData.paymentMethod.type,
      creditCard: bookingData.paymentMethod.type === 'credit' ? {
        cardNumber: bookingData.paymentMethod.creditCard.cardNumber,
        cardOwner: bookingData.paymentMethod.creditCard.cardOwner,
        expiryDate: bookingData.paymentMethod.creditCard.expiryDate,
        cvc: bookingData.paymentMethod.creditCard.cvc
      } : null
    });

    // Booking Details
    console.log("🏨 Booking Details:");
    console.log({
      roomId: bookingData.bookingDetail.roomData.id,
      roomTypeId: bookingData.bookingDetail.roomData.roomType.id,
      roomName: bookingData.bookingDetail.roomData.roomType.name,
      checkIn: bookingData.bookingDetail.searchParams.checkIn,
      checkOut: bookingData.bookingDetail.searchParams.checkOut,
      adults: bookingData.bookingDetail.totalGuests,
      rooms: bookingData.bookingDetail.totalRooms,
      nights: bookingData.bookingDetail.nights
    });

    // Special Requests
    console.log("✨ Special Requests:");
    console.log({
      standardRequests: bookingData.specialRequests.standardRequests,
      specialRequests: bookingData.specialRequests.specialRequests,
      additionalRequest: bookingData.specialRequests.additionalRequest,
      selectedRequests: bookingData.priceBreakdown.selectedSpecialRequests
    });

    // Price Breakdown
    console.log("💰 Price Breakdown:");
    console.log({
      pricePerNight: bookingData.priceBreakdown.pricePerNight,
      basePrice: bookingData.priceBreakdown.basePrice,
      specialRequestsPrice: bookingData.priceBreakdown.specialRequestsPrice,
      totalPrice: bookingData.priceBreakdown.totalPrice
    });

    // Complete data for Omise API
    console.log("📦 Complete Data for Omise API:");
    console.log(JSON.stringify(bookingData, null, 2));
    
    console.log("=====================================");

    // เก็บข้อมูลใน state
    setConfirmedBookingData(bookingData);
    setIsConfirmed(true);

    return bookingData;
  };

  const resetConfirmation = () => {
    setConfirmedBookingData(null);
    setIsConfirmed(false);
    console.log("🔄 Booking confirmation reset");
  };

  const getConfirmedData = () => {
    return confirmedBookingData;
  };

  // ฟังก์ชันสำหรับ format ข้อมูลให้เหมาะกับ Omise
  const getOmisePayload = () => {
    if (!confirmedBookingData) return null;

    const omiseData = {
      // Customer Info
      customer: {
        firstName: confirmedBookingData.basicInfo.firstName,
        lastName: confirmedBookingData.basicInfo.lastName,
        email: confirmedBookingData.basicInfo.email,
        phone: confirmedBookingData.basicInfo.phone,
        country: confirmedBookingData.basicInfo.country,
        dateOfBirth: confirmedBookingData.basicInfo.dateOfBirth
      },

      // Payment Info
      payment: {
        amount: Math.round(confirmedBookingData.priceBreakdown.totalPrice * 100), // Omise uses smallest currency unit (satang)
        currency: "THB",
        method: confirmedBookingData.paymentMethod.type,
        card: confirmedBookingData.paymentMethod.type === 'credit' ? {
          number: confirmedBookingData.paymentMethod.creditCard.cardNumber,
          name: confirmedBookingData.paymentMethod.creditCard.cardOwner,
          expiration_month: confirmedBookingData.paymentMethod.creditCard.expiryDate?.split('/')[0],
          expiration_year: confirmedBookingData.paymentMethod.creditCard.expiryDate?.split('/')[1],
          security_code: confirmedBookingData.paymentMethod.creditCard.cvc
        } : null
      },

      // Booking Info
      booking: {
        roomId: confirmedBookingData.bookingDetail.roomData.id,
        roomTypeId: confirmedBookingData.bookingDetail.roomData.roomType.id,
        checkIn: confirmedBookingData.bookingDetail.searchParams.checkIn,
        checkOut: confirmedBookingData.bookingDetail.searchParams.checkOut,
        adults: confirmedBookingData.bookingDetail.totalGuests,
        rooms: confirmedBookingData.bookingDetail.totalRooms,
        nights: confirmedBookingData.bookingDetail.nights,
        specialRequests: confirmedBookingData.priceBreakdown.selectedSpecialRequests
      },

      // Metadata for reference
      metadata: {
        roomName: confirmedBookingData.bookingDetail.roomData.roomType.name,
        pricePerNight: confirmedBookingData.priceBreakdown.pricePerNight,
        basePrice: confirmedBookingData.priceBreakdown.basePrice,
        specialRequestsPrice: confirmedBookingData.priceBreakdown.specialRequestsPrice,
        totalPrice: confirmedBookingData.priceBreakdown.totalPrice
      }
    };

    console.log("🎯 Formatted data for Omise API:");
    console.log(JSON.stringify(omiseData, null, 2));

    return omiseData;
  };

  return (
    <ConfirmBookingContext.Provider
      value={{
        confirmedBookingData,
        isConfirmed,
        confirmBooking,
        resetConfirmation,
        getConfirmedData,
        getOmisePayload
      }}
    >
      {children}
    </ConfirmBookingContext.Provider>
  );
};

export const useConfirmBooking = () => {
  const context = useContext(ConfirmBookingContext);
  if (!context) {
    throw new Error("useConfirmBooking must be used within a ConfirmBookingProvider");
  }
  return context;
};