import BasicInfoForm from "@/components/payment/forms/basic-info-form";
import SpecialRequestForm from "@/components/payment/forms/special-request-form";
import React, { useEffect, useState } from "react";
import BookingDetialSection from "@/components/payment/shared/booking-detial-section";
import DefaultLayout from "@/layouts/default.layout";
import PaymentMethodForm from "@/components/payment/forms/payment-method.layout";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BookingProvider, useBooking } from "@/contexts/booking-context";
import { useRouter } from "next/router";
import {
  validateCompleteBooking,
  validateBasicInfo,
  validateSpecialRequests,
  validatePaymentMethod,
} from "@/lib/validations/booking-validation";
import api from "@/lib/axios";
import Loading from "@/components/global/loading";
const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    getCompleteBookingData,
    setValidationErrorsForSection,
    bookingData,
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
        setValidationErrorsForSection("basicInfo", basicInfoValidation.errors);
        hasErrors = true;
      } else {
        setValidationErrorsForSection("basicInfo", {});
      }
    } else if (currentStep === 2) {
      const specialRequestsValidation = validateSpecialRequests(
        bookingData.specialRequests
      );

      if (!specialRequestsValidation.isValid) {
        setValidationErrorsForSection(
          "specialRequests",
          specialRequestsValidation.errors
        );
        hasErrors = true;
      } else {
        setValidationErrorsForSection("specialRequests", {});
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
          setValidationErrorsForSection(
            "basicInfo",
            validation.errors.basicInfo
          );
        }
        if (Object.keys(validation.errors.specialRequests).length > 0) {
          setValidationErrorsForSection(
            "specialRequests",
            validation.errors.specialRequests
          );
        }
        if (Object.keys(validation.errors.paymentMethod).length > 0) {
          setValidationErrorsForSection(
            "paymentMethod",
            validation.errors.paymentMethod
          );
        }

        return;
      }

    
      if (
        !completeBookingData.bookingDetail.roomData?.id ||
        !completeBookingData.bookingDetail.roomData?.roomType?.id
      ) {
        alert("ไม่พบข้อมูลห้องพัก กรุณาเลือกห้องพักใหม่");
        router.push("/rooms"); 
        return;
      }

  
      const bookingPayload = {
        guest: {
          id: router.query.guestId,
          firstName: completeBookingData.basicInfo.firstName,
          lastName: completeBookingData.basicInfo.lastName,
          email: completeBookingData.basicInfo.email,
          phone: completeBookingData.basicInfo.phone,
          country: completeBookingData.basicInfo.country,
          dateOfBirth: completeBookingData.basicInfo.dateOfBirth,
        },
        booking: {
          id: parseInt(router.query.bookingId || -1),
          checkInDate: completeBookingData.bookingDetail.searchParams.checkIn,
          checkOutDate: completeBookingData.bookingDetail.searchParams.checkOut,
          adults: completeBookingData.bookingDetail.totalGuests,
          additionalRequests:
            completeBookingData.specialRequests.additionalRequest,
          totalAmount: completeBookingData.priceBreakdown.totalPrice,
        },
        bookingRoom: {
          roomId: completeBookingData.bookingDetail.roomData.id,
          roomTypeId: completeBookingData.bookingDetail.roomData.roomType.id,
          pricePerNight: completeBookingData.priceBreakdown.pricePerNight,
        },
        specialRequests:
          completeBookingData.priceBreakdown.selectedSpecialRequests,
        payment: {
          method: completeBookingData.paymentMethod.type,
          totalAmount: completeBookingData.priceBreakdown.totalPrice,
          ...(completeBookingData.paymentMethod.type === "credit" && {
            card: {
              name: completeBookingData.paymentMethod.creditCard.cardOwner,
              number:
                completeBookingData.paymentMethod.creditCard.cardNumber.replace(
                  /\s/g,
                  ""
                ),
              expiration_month:
                completeBookingData.paymentMethod.creditCard.expiryDate.split(
                  "/"
                )[0],
              expiration_year: `20${
                completeBookingData.paymentMethod.creditCard.expiryDate.split(
                  "/"
                )[1]
              }`,
              security_code: completeBookingData.paymentMethod.creditCard.cvc,
            },
          }),
        },
      };

      console.log("Sending booking payload:", bookingPayload);

      const response = await fetch("/api/booking/create-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      const result = await response.json();
     
      if (result.success) {
        
        if (result.data?.booking?.bookingNumber) {
          router.push(
            `/payment-success?bookingNumber=${result.data.booking.bookingNumber}`
          );
        } else {
          alert("การจองสำเร็จแล้ว แต่ไม่พบเลขที่การจอง กรุณาติดต่อเจ้าหน้าที่");
          router.push("/"); 
        }
      } else {
        setIsFailed(true);
      }
    } catch (error) {
      console.error("Booking error:", error);

      
      let errorMessage = "เกิดข้อผิดพลาดในการจองห้องพัก: ";

      if (error.message.includes("Foreign key constraint")) {
        errorMessage += "ห้องพักที่เลือกไม่มีอยู่ในระบบ กรุณาเลือกห้องพักอื่น";
      } else if (error.message.includes("404")) {
        errorMessage += "ไม่พบหน้าที่ต้องการ กรุณาลองใหม่อีกครั้ง";
      } else {
        errorMessage += error.message || "กรุณาลองใหม่อีกครั้ง";
      }

      alert(errorMessage);

 
      if (
        error.message.includes("Foreign key constraint") ||
        error.message.includes("room") ||
        error.message.includes("Room")
      ) {
        router.push("/rooms");
      }
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

  const handleDeleteBooking = () => {
    setLoading(true);
    const { bookingId, guestId } = router.query;
    api.delete("/booking/delete-expired-booking", {
      data: {
        bookingId: bookingId,
        guestId: guestId,
      },
    })

    router.push("/");
  };

  const FailedPage = () => {
    return (
      <div className="bg-white md:bg-util-bg w-full min-h-screen md:px-80 md:pt-20 ">
        <div className="bg-orange-100 text-center px-6 py-48 flex items-center justify-center flex-col">
          <HiOutlineExclamationCircle className="text-orange-600 w-16 h-16 mb-4" />
          <p className="text-h3 text-orange-600 font-noto-serif">
            Payment failed
          </p>
          <p className="text-b2 text-orange-500 mt-3 md:mx-6">
            There seems to be an issue with your card. Please check your card
            details and try again later, or use a different payment method.
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col px-6 pt-9 font-semibold cursor-pointer md:flex-row md:justify-center text-center">
          <div
            className="btn-primary px-8 py-4 items-center justify-center"
            onClick={() => handleDeleteBooking()}
          >
            {loading ? (
              <Loading size="xs" customClasses={{
                text: "text-base !text-orange-200",
                dot: "text-base",
                gap: "gap-2",
                py: "py-0",
              }} />
            ) : (
              "Back to Home"
            )}
          </div>
          <div
            className="px-8 pt-6  items-center justify-center text-orange-500 hover:underline"
            onClick={() => setIsFailed(false)}
          >
            Check Booking Detail
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white md:bg-gray-200">
      {!isFailed && (
        <>
          <DefaultLayout title="Payment">
            <header className="bg-gray-200 md:px-40 md:pt-20 md:pb-10">
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
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      style={{
                        pointerEvents: isSubmitting ? "none" : "auto",
                      }}
                    >
                      {isSubmitting
                        ? "Processing..."
                        : currentStep === 3
                        ? "Confirm Booking"
                        : "Next"}
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
                onClick={
                  currentStep === 3 ? handleCompleteBooking : goToNextStep
                }
                className={`btn-primary px-8 py-4 cursor-pointer transition-all duration-200 hover:opacity-90 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{
                  pointerEvents: isSubmitting ? "none" : "auto",
                }}
              >
                {isSubmitting
                  ? "Processing..."
                  : currentStep === 3
                  ? "Confirm Booking"
                  : "Next"}
              </div>
            </footer>
          </div>
        </>
      )}
      {isFailed && (
        <FailedPage
          handleRetryPayment={() => handleCompleteBooking()}
          handleBackToPaymentDetails={() => setIsFailed(false)}
        />
      )}
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
