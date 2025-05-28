// pages/payment/index.js (Updated version with Next button validation)
import BasicInfoForm from "@/components/payment/forms/basic-info-form";
import SpecialRequestForm from "@/components/payment/forms/special-request-form";
import React, { useState, useEffect } from "react";
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
  const router = useRouter();
  const { 
    getCompleteBookingData, 
    setValidationErrorsForSection,
    bookingData,
    countdown
  } = useBooking();

  // Redirect to payment-fail when countdown reaches 0
  useEffect(() => {
    if (countdown === 0) {
      console.log("⏰ Time expired! Redirecting to payment-fail page...");
      router.push('/payment-fail');
    }
  }, [countdown, router]);

  // ปิดการใช้งาน handleStepClick - ให้กดได้แค่ปุ่ม Next/Back เท่านั้น
  const handleStepClick = (e, stepNumber) => {
    e.stopPropagation();
    // ไม่ให้กดเปลี่ยน step ได้ - ต้องใช้ปุ่ม Next/Back เท่านั้น
    console.log("Step click disabled - use Next/Back buttons instead");
    return;
  };

  // แก้ไขฟังก์ชัน goToNextStep ให้ validate ก่อน
  const goToNextStep = () => {
    console.log("=== NEXT BUTTON VALIDATION ===");
    
    let hasErrors = false;
    
    // Validate current step
    if (currentStep === 1) {
      // Validate Basic Info
      const basicInfoValidation = validateBasicInfo(bookingData.basicInfo);
      
      if (!basicInfoValidation.isValid) {
        console.log("❌ Basic Info Validation Errors:", basicInfoValidation.errors);
        setValidationErrorsForSection('basicInfo', basicInfoValidation.errors);
        hasErrors = true;
      } else {
        console.log("✅ Basic Info validation passed");
        setValidationErrorsForSection('basicInfo', {});
      }
      
    } else if (currentStep === 2) {
      // Validate Special Requests
      const specialRequestsValidation = validateSpecialRequests(bookingData.specialRequests);
      
      if (!specialRequestsValidation.isValid) {
        console.log("❌ Special Requests Validation Errors:", specialRequestsValidation.errors);
        setValidationErrorsForSection('specialRequests', specialRequestsValidation.errors);
        hasErrors = true;
      } else {
        console.log("✅ Special Requests validation passed");
        setValidationErrorsForSection('specialRequests', {});
      }
    }
    
    // Only proceed to next step if no validation errors
    if (!hasErrors) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
    } else {
      console.log("🚫 Cannot proceed to next step due to validation errors");
    }
  };

  const goToPrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleCompleteBooking = () => {
    console.log("=== COMPLETE BOOKING INITIATED ===");
    
    try {
      // Get complete booking data with price calculations
      const completeBookingData = getCompleteBookingData();
      
      // Validate all form data
      const validation = validateCompleteBooking(completeBookingData);
      
      console.log("📋 Complete Booking Data:", {
        ...completeBookingData,
        timestamp: new Date().toISOString()
      });
      
      console.log("💰 Price Breakdown:", completeBookingData.priceBreakdown);
      
      if (!validation.isValid) {
        console.error("❌ Validation Errors:", validation.errors);
        
        // Set validation errors in context to display under inputs
        if (Object.keys(validation.errors.basicInfo).length > 0) {
          setValidationErrorsForSection('basicInfo', validation.errors.basicInfo);
        }
        
        if (Object.keys(validation.errors.specialRequests).length > 0) {
          setValidationErrorsForSection('specialRequests', validation.errors.specialRequests);
        }
        
        if (Object.keys(validation.errors.paymentMethod).length > 0) {
          setValidationErrorsForSection('paymentMethod', validation.errors.paymentMethod);
        }
        
        // Show a simple notification message instead of detailed alert
        alert("Please check the form and fix any highlighted errors before proceeding.");
        return;
      }
      
      console.log("✅ All validations passed!");
      console.log("📊 Data ready for submission to Omise and Database");
      
      // Log data prepared for Omise
      console.log("💳 Data for Omise Payment:", {
        amount: Math.round(completeBookingData.priceBreakdown.totalPrice * 100), // Convert to satang
        currency: "THB",
        customer: {
          email: completeBookingData.basicInfo.email,
          name: `${completeBookingData.basicInfo.firstName} ${completeBookingData.basicInfo.lastName}`,
          phone: completeBookingData.basicInfo.phone
        },
        card: completeBookingData.paymentMethod.type === "credit" ? {
          number: completeBookingData.paymentMethod.creditCard.cardNumber,
          expiration_month: completeBookingData.paymentMethod.creditCard.expiryDate.split('/')[0],
          expiration_year: `20${completeBookingData.paymentMethod.creditCard.expiryDate.split('/')[1]}`,
          security_code: completeBookingData.paymentMethod.creditCard.cvc,
          name: completeBookingData.paymentMethod.creditCard.cardOwner
        } : null,
        description: "Hotel Room Booking"
      });
      // Log card data (DEV ONLY)
      if (completeBookingData.paymentMethod.type === "credit") {
        const card = completeBookingData.paymentMethod.creditCard;
        console.log("🔒 Card Data (DEV ONLY):", {
          cardNumber: card.cardNumber,
          cardOwner: card.cardOwner,
          expiryDate: card.expiryDate,
          cvc: card.cvc,
        });
      }
      
      // Log data prepared for Database
      console.log("💾 Data for Database:", {
        guest: {
          firstName: completeBookingData.basicInfo.firstName,
          lastName: completeBookingData.basicInfo.lastName,
          email: completeBookingData.basicInfo.email,
          phone: completeBookingData.basicInfo.phone,
          country: completeBookingData.basicInfo.country,
          dateOfBirth: completeBookingData.basicInfo.dateOfBirth
        },
        bookingDetails: completeBookingData.bookingDetail,
        specialRequests: {
          standard: completeBookingData.specialRequests.standardRequests,
          special: completeBookingData.specialRequests.specialRequests,
          additional: completeBookingData.specialRequests.additionalRequest
        },
        payment: {
          method: completeBookingData.paymentMethod.type,
          totalAmount: completeBookingData.priceBreakdown.totalPrice
        },
        priceBreakdown: completeBookingData.priceBreakdown
      });
      
      // Success message
      const successMessage = `
🎉 Booking Ready for Processing!

📋 Guest: ${completeBookingData.basicInfo.firstName} ${completeBookingData.basicInfo.lastName}
📧 Email: ${completeBookingData.basicInfo.email}
💰 Total Amount: THB ${completeBookingData.priceBreakdown.totalPrice.toLocaleString()}
💳 Payment Method: ${completeBookingData.paymentMethod.type === 'credit' ? 'Credit Card' : 'Cash'}

${completeBookingData.priceBreakdown.selectedSpecialRequests.length > 0 ? 
  '🎁 Special Requests:\n' + 
  completeBookingData.priceBreakdown.selectedSpecialRequests.map(req => 
    `  • ${req.displayName}: +THB ${req.price}`
  ).join('\n') + '\n' : ''
}
✅ All data validated and ready for Omise & Database
      `.trim();
      
      alert(successMessage);
      
    } catch (error) {
      console.error("❌ Error during booking completion:", error);
      alert("An error occurred while processing your booking. Please try again.");
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
        {/* Header Section */}
        <header className="bg-gray-200 md:px-40 md:pt-20 md:pb-10 cursor-pointer">
          <div className="text-green-800 font-noto-serif text-h3 md:text-h2 px-4 md:px-0 py-6">
            Booking Room
          </div>

          <div className="text-gray-600 px-4 md:px-0 pb-6 font-inter font-semibold md:flex md:flex-row md:items-center md:pb-10 md:border-b md:border-gray-300">
            {/* Step 1 */}
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

            {/* Step 2 */}
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

            {/* Step 3 */}
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

            {/* Button */}
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
                  className="btn-primary px-8 py-4 cursor-pointer transition-all duration-200 hover:opacity-90"
                >
                  {currentStep === 3 ? "Confirm Booking" : "Next"}
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
            className="btn-primary px-8 py-4 cursor-pointer transition-all duration-200 hover:opacity-90"
          >
            {currentStep === 3 ? "Confirm Booking" : "Next"}
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