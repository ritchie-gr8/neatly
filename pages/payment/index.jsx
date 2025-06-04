import BasicInfoForm from "@/components/payment/forms/basic-info-form";
import SpecialRequestForm from "@/components/payment/forms/special-request-form";
import React, { useState } from "react";
import BookingDetialSection from "@/components/payment/shared/booking-detial-section";
import DefaultLayout from "@/layouts/default.layout";
import PaymentMethodForm from "@/components/payment/forms/payment-method.layout";
import { BookingProvider, useBooking } from "@/contexts/booking-context";
import { useRouter } from "next/router";
import { 
  validateCompleteBooking,
  validateBasicInfo,
  validateSpecialRequests,
  validatePaymentMethod
} from "@/lib/validations/booking-validation";

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { 
    getCompleteBookingData, 
    setValidationErrorsForSection,
    bookingData
  } = useBooking();

  const handleStepClick = (e, stepNumber) => {
    e.stopPropagation();
    return;
  };

  const goToNextStep = () => {
    let hasErrors = false;

    if (currentStep === 1) {
      const basicInfoValidation = validateBasicInfo(bookingData.basicInfo);
      
      if (!basicInfoValidation.isValid) {
        setValidationErrorsForSection('basicInfo', basicInfoValidation.errors);
        hasErrors = true;
      } else {
        setValidationErrorsForSection('basicInfo', {});
      }
      
    } else if (currentStep === 2) {
      const specialRequestsValidation = validateSpecialRequests(bookingData.specialRequests);
      
      if (!specialRequestsValidation.isValid) {
        setValidationErrorsForSection('specialRequests', specialRequestsValidation.errors);
        hasErrors = true;
      } else {
        setValidationErrorsForSection('specialRequests', {});
      }
    }
    
    if (!hasErrors) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
    }
  };

  const goToPrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleCompleteBooking = async () => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      const completeBookingData = getCompleteBookingData();
      const validation = validateCompleteBooking(completeBookingData);
      
      if (!validation.isValid) {
        if (Object.keys(validation.errors.basicInfo).length > 0) {
          setValidationErrorsForSection('basicInfo', validation.errors.basicInfo);
        }
        if (Object.keys(validation.errors.specialRequests).length > 0) {
          setValidationErrorsForSection('specialRequests', validation.errors.specialRequests);
        }
        if (Object.keys(validation.errors.paymentMethod).length > 0) {
          setValidationErrorsForSection('paymentMethod', validation.errors.paymentMethod);
        }
        
        alert("Please check the form and fix any highlighted errors before proceeding.");
        return;
      }

      const bookingPayload = {
        guest: {
          firstName: completeBookingData.basicInfo.firstName,
          lastName: completeBookingData.basicInfo.lastName,
          email: completeBookingData.basicInfo.email,
          phone: completeBookingData.basicInfo.phone,
          country: completeBookingData.basicInfo.country,
          dateOfBirth: completeBookingData.basicInfo.dateOfBirth
        },
        booking: {
          checkInDate: completeBookingData.bookingDetail.searchParams.checkIn,
          checkOutDate: completeBookingData.bookingDetail.searchParams.checkOut,
          adults: completeBookingData.bookingDetail.totalGuests,
          additionalRequests: completeBookingData.specialRequests.additionalRequest,
          totalAmount: completeBookingData.priceBreakdown.totalPrice
        },
        bookingRoom: {
          roomId: completeBookingData.bookingDetail.roomData.id,
          roomTypeId: completeBookingData.bookingDetail.roomData.roomType.id,
          pricePerNight: completeBookingData.priceBreakdown.pricePerNight
        },
        specialRequests: completeBookingData.priceBreakdown.selectedSpecialRequests,
        payment: {
          method: completeBookingData.paymentMethod.type,
          totalAmount: completeBookingData.priceBreakdown.totalPrice
        }
      };

      const response = await fetch('/api/booking/post-booking-detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload)
      });

      const result = await response.json();

      if (result.success) {
        // 🎉 แสดงข้อมูลทั้งหมดสำหรับเพื่อนนำไปใช้กับ Omise
        console.log("🎉 BOOKING CONFIRMED! Complete data for Omise:");
        console.log("=====================================");
        
        // 👤 Basic Information
        console.log("👤 Basic Information:");
        console.log({
          firstName: completeBookingData.basicInfo.firstName,
          lastName: completeBookingData.basicInfo.lastName,
          email: completeBookingData.basicInfo.email,
          phone: completeBookingData.basicInfo.phone,
          country: completeBookingData.basicInfo.country,
          dateOfBirth: completeBookingData.basicInfo.dateOfBirth
        });

        // 💳 Payment Method
        console.log("💳 Payment Method:");
        console.log({
          type: completeBookingData.paymentMethod.type,
          creditCard: completeBookingData.paymentMethod.type === 'credit' ? {
            cardNumber: completeBookingData.paymentMethod.creditCard.cardNumber,
            cardOwner: completeBookingData.paymentMethod.creditCard.cardOwner,
            expiryDate: completeBookingData.paymentMethod.creditCard.expiryDate,
            cvc: completeBookingData.paymentMethod.creditCard.cvc
          } : null
        });

        // 🏨 Booking Details
        console.log("🏨 Booking Details:");
        console.log({
          bookingNumber: result.data.booking.bookingNumber,
          bookingId: result.data.booking.id,
          guestId: result.data.guest.id,
          roomId: completeBookingData.bookingDetail.roomData.id,
          roomTypeId: completeBookingData.bookingDetail.roomData.roomType.id,
          roomName: completeBookingData.bookingDetail.roomData.roomType.name,
          checkIn: completeBookingData.bookingDetail.searchParams.checkIn,
          checkOut: completeBookingData.bookingDetail.searchParams.checkOut,
          adults: completeBookingData.bookingDetail.totalGuests,
          rooms: completeBookingData.bookingDetail.totalRooms,
          nights: completeBookingData.bookingDetail.nights
        });

        // ✨ Special Requests
        console.log("✨ Special Requests:");
        console.log({
          standardRequests: completeBookingData.specialRequests.standardRequests,
          specialRequests: completeBookingData.specialRequests.specialRequests,
          additionalRequest: completeBookingData.specialRequests.additionalRequest,
          selectedRequests: completeBookingData.priceBreakdown.selectedSpecialRequests
        });

        // 💰 Price Breakdown
        console.log("💰 Price Breakdown:");
        console.log({
          pricePerNight: completeBookingData.priceBreakdown.pricePerNight,
          basePrice: completeBookingData.priceBreakdown.basePrice,
          specialRequestsPrice: completeBookingData.priceBreakdown.specialRequestsPrice,
          totalPrice: completeBookingData.priceBreakdown.totalPrice
        });

        // 📦 Complete Raw Data
        console.log("📦 Complete Raw Data:");
        console.log(completeBookingData);

        // 🎯 Formatted data สำหรับ Omise API
        console.log("🎯 Formatted data for Omise API:");
        const omisePayload = {
          // Customer Info
          customer: {
            firstName: completeBookingData.basicInfo.firstName,
            lastName: completeBookingData.basicInfo.lastName,
            email: completeBookingData.basicInfo.email,
            phone: completeBookingData.basicInfo.phone,
            country: completeBookingData.basicInfo.country,
            dateOfBirth: completeBookingData.basicInfo.dateOfBirth
          },

          // Payment Info
          payment: {
            amount: Math.round(completeBookingData.priceBreakdown.totalPrice * 100), // Omise ใช้หน่วยสตางค์
            currency: "THB",
            method: completeBookingData.paymentMethod.type,
            card: completeBookingData.paymentMethod.type === 'credit' ? {
              number: completeBookingData.paymentMethod.creditCard.cardNumber,
              name: completeBookingData.paymentMethod.creditCard.cardOwner,
              expiration_month: completeBookingData.paymentMethod.creditCard.expiryDate?.split('/')[0],
              expiration_year: completeBookingData.paymentMethod.creditCard.expiryDate?.split('/')[1],
              security_code: completeBookingData.paymentMethod.creditCard.cvc
            } : null
          },

          // Booking Info
          booking: {
            bookingNumber: result.data.booking.bookingNumber,
            bookingId: result.data.booking.id,
            guestId: result.data.guest.id,
            roomId: completeBookingData.bookingDetail.roomData.id,
            roomTypeId: completeBookingData.bookingDetail.roomData.roomType.id,
            checkIn: completeBookingData.bookingDetail.searchParams.checkIn,
            checkOut: completeBookingData.bookingDetail.searchParams.checkOut,
            adults: completeBookingData.bookingDetail.totalGuests,
            rooms: completeBookingData.bookingDetail.totalRooms,
            nights: completeBookingData.bookingDetail.nights,
            specialRequests: completeBookingData.priceBreakdown.selectedSpecialRequests
          },

          // Metadata for reference
          metadata: {
            roomName: completeBookingData.bookingDetail.roomData.roomType.name,
            pricePerNight: completeBookingData.priceBreakdown.pricePerNight,
            basePrice: completeBookingData.priceBreakdown.basePrice,
            specialRequestsPrice: completeBookingData.priceBreakdown.specialRequestsPrice,
            totalPrice: completeBookingData.priceBreakdown.totalPrice
          }
        };
        
        console.log(omisePayload);
        console.log("=====================================");
        
        const successMessage = `
🎉 Booking Created Successfully!

📋 Booking Number: ${result.data.booking.bookingNumber}
👤 Guest: ${completeBookingData.basicInfo.firstName} ${completeBookingData.basicInfo.lastName}
📧 Email: ${completeBookingData.basicInfo.email}
💰 Total Amount: THB ${completeBookingData.priceBreakdown.totalPrice.toLocaleString()}
💳 Payment Method: ${completeBookingData.paymentMethod.type === 'credit' ? 'Credit Card' : 'Cash'}

${completeBookingData.priceBreakdown.selectedSpecialRequests.length > 0 ? 
  '🎁 Special Requests:\n' + 
  completeBookingData.priceBreakdown.selectedSpecialRequests.map(req => 
    `  • ${req.displayName}: +THB ${req.price}`
  ).join('\n') + '\n' : ''
}
✅ Your booking has been confirmed!
        `.trim();
        
        alert(successMessage);
        
        router.push(`/booking-confirmation/${result.data.booking.bookingNumber}`);
        
      } else {
        throw new Error(result.message || 'Failed to create booking');
      }
      
    } catch (error) {
      alert("An error occurred while creating your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoForm />;
      case 2:
        return <SpecialRequestForm />;
      case 3:
        return <PaymentMethodForm />;
      default:
        return <BasicInfoForm />;
    }
  };

  const getStepStyle = (step) => {
    if (currentStep === step) {
      return {
        backgroundColor: "#E76B39",
        color: "#ffffff",
      };
    } else if (currentStep > step) {
      return {
        backgroundColor: "#FAEDE8",
        color: "#E76B39",
      };
    } else {
      return {
        backgroundColor: "#F1F2F6",
        color: "#9AA1B9",
      };
    }
  };

  const getTextStyle = (step) => {
    if (currentStep === step) {
      return { color: "#E76B39" };
    } else if (currentStep > step) {
      return { color: "#2A2E3F" };
    } else {
      return { color: "#9AA1B9" };
    }
  };

  return (
    <div className="bg-white md:bg-gray-200">
      <DefaultLayout title="Payment">
        <header className="bg-gray-200 md:px-40 md:pt-20 md:pb-10 cursor-pointer">
          <div className="text-green-800 font-noto-serif text-h3 md:text-h2 px-4 md:px-0 py-6">
            Booking Room
          </div>

          <div className="text-gray-600 px-4 md:px-0 pb-6 font-inter font-semibold md:flex md:flex-row md:items-center md:pb-10 md:border-b md:border-gray-300">
            <div
              onClick={(e) => handleStepClick(e, 1)}
              className="flex flex-row items-center cursor-default"
              style={{ pointerEvents: "none" }}
            >
              <div
                style={getStepStyle(1)}
                className="flex justify-center text-h4 bg-gray-300 w-14 rounded-sm"
              >
                1
              </div>
              <div style={getTextStyle(1)} className="text-h5 ml-4">
                Basic Information
              </div>
            </div>

            <div
              onClick={(e) => handleStepClick(e, 2)}
              className="flex flex-row items-center mt-4 md:mt-0 md:ml-16 cursor-default"
              style={{ pointerEvents: "none" }}
            >
              <div
                style={getStepStyle(2)}
                className="flex justify-center text-h4 bg-gray-300 w-14 rounded-sm"
              >
                2
              </div>
              <div style={getTextStyle(2)} className="text-h5 ml-4">
                Special Request
              </div>
            </div>

            <div
              onClick={(e) => handleStepClick(e, 3)}
              className="flex flex-row items-center mt-4 md:mt-0 md:ml-16 cursor-default"
              style={{ pointerEvents: "none" }}
            >
              <div
                style={getStepStyle(3)}
                className="flex justify-center text-h4 bg-gray-300 w-14 rounded-sm"
              >
                3
              </div>
              <div style={getTextStyle(3)} className="text-h5 ml-4">
                Payment Method
              </div>
            </div>
          </div>
        </header>

        <div className="md:gap-6 md:flex md:flex-row md:justify-between md:mx-40 md:mb-40">
          <div className="md:flex md:flex-col md:w-1/2">
            {renderForm()}

            <div className="hidden md:block md:mt-10">
              <footer className="font-semibold flex flex-row justify-between items-center py-6 md:py-0 px-4 md:px-0">
                <p
                  onClick={goToPrevStep}
                  className={`md:ml-2 cursor-pointer transition-colors duration-200 ${
                    currentStep === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-orange-500 hover:text-orange-600 hover:underline"
                  }`}
                  style={{
                    pointerEvents: currentStep === 1 ? "none" : "auto",
                  }}
                >
                  Back
                </p>

                <div
                  onClick={
                    currentStep === 3 ? handleCompleteBooking : goToNextStep
                  }
                  className={`btn-primary px-8 py-4 cursor-pointer transition-all duration-200 hover:opacity-90 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={{
                    pointerEvents: isSubmitting ? "none" : "auto",
                  }}
                >
                  {isSubmitting ? "Processing..." : (currentStep === 3 ? "Confirm Booking" : "Next")}
                </div>
              </footer>
            </div>
          </div>

          <div className="md:w-1/2">
            <BookingDetialSection />
          </div>
        </div>
      </DefaultLayout>

      <div className="md:hidden">
        <footer className="font-semibold flex flex-row justify-between items-center py-6 md:py-0 px-4 md:px-0">
          <p
            onClick={goToPrevStep}
            className={`md:ml-2 cursor-pointer transition-colors duration-200 ${
              currentStep === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-orange-500 hover:text-orange-600 hover:underline"
            }`}
            style={{
              pointerEvents: currentStep === 1 ? "none" : "auto",
            }}
          >
            Back
          </p>

          <div
            onClick={currentStep === 3 ? handleCompleteBooking : goToNextStep}
            className={`btn-primary px-8 py-4 cursor-pointer transition-all duration-200 hover:opacity-90 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              pointerEvents: isSubmitting ? "none" : "auto",
            }}
          >
            {isSubmitting ? "Processing..." : (currentStep === 3 ? "Confirm Booking" : "Next")}
          </div>
        </footer>
      </div>
    </div>
  );
};

const index = () => {
  return (
    <BookingProvider>
      <PaymentPage />
    </BookingProvider>
  );
};

export default index;