// pages/payment/index.jsx - ใช้ API แทน Context
import BasicInfoForm from "@/components/payment/forms/basic-info-form";
import SpecialRequestForm from "@/components/payment/forms/special-request-form";
import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default.layout";
import PaymentMethodForm from "@/components/payment/forms/payment-method.layout";
import { useRouter } from "next/router";
import api from "@/lib/axios";
import dynamic from 'next/dynamic';

// ใช้ dynamic import สำหรับ BookingDetailSection
const BookingDetailSection = dynamic(
  () => import("@/components/payment/shared/booking-detail-section"),
  { 
    ssr: false, // ปิด Server-side rendering
    loading: () => (
      <div>
        <div className="bg-green-800 md:rounded-t-sm p-4 md:py-4 md:px-6">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded mr-3"></div>
            <h2 className="text-h5 font-inter font-semibold text-white">
              Loading Booking Detail...
            </h2>
          </div>
        </div>
        <div className="bg-green-600 md:rounded-b-sm py-6 px-4 md:p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-green-400 rounded"></div>
            <div className="h-4 bg-green-400 rounded"></div>
            <div className="h-4 bg-green-400 rounded"></div>
          </div>
        </div>
      </div>
    )
  }
);

// ❌ ลบฟังก์ชัน processPayment ออก (ใช้ mock data แทน)
// const processPayment = async (bookingData) => { ... }

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  
  // ❌ ลบการใช้ useBooking context ออก
  // const { getCompleteBookingData, setValidationErrorsForSection, bookingData, countdown } = useBooking();
  
  // ✅ สร้าง state ใหม่สำหรับ form data (mock data)
  const [formData, setFormData] = useState({
    basicInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    specialRequests: {
      requests: ''
    },
    paymentMethod: {
      type: 'credit', // 'credit' หรือ 'cash'
      creditCard: {
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        cardOwner: ''
      }
    }
  });

  // ✅ สร้าง validation errors state
  const [validationErrors, setValidationErrors] = useState({
    basicInfo: {},
    specialRequests: {},
    paymentMethod: {}
  });

  // ❌ ลบ countdown จาก context - ใช้ countdown จาก BookingDetailSection แทน

  // ❌ ลบ useEffect สำหรับ countdown redirect - ให้ BookingDetailSection จัดการเอง

  // ✅ ฟังก์ชันง่าย ๆ สำหรับ validation (mock)
  const validateCurrentStep = () => {
    let hasErrors = false;
    let errors = {};

    if (currentStep === 1) {
      // Basic Info validation
      if (!formData.basicInfo.firstName.trim()) {
        errors.firstName = 'First name is required';
        hasErrors = true;
      }
      if (!formData.basicInfo.lastName.trim()) {
        errors.lastName = 'Last name is required';
        hasErrors = true;
      }
      if (!formData.basicInfo.email.trim()) {
        errors.email = 'Email is required';
        hasErrors = true;
      }
      if (!formData.basicInfo.phone.trim()) {
        errors.phone = 'Phone is required';
        hasErrors = true;
      }
      
      setValidationErrors(prev => ({ ...prev, basicInfo: errors }));
      
    } else if (currentStep === 2) {
      // Special Requests validation (optional - ไม่บังคับ)
      setValidationErrors(prev => ({ ...prev, specialRequests: {} }));
      
    } else if (currentStep === 3) {
      // Payment Method validation
      if (formData.paymentMethod.type === 'credit') {
        if (!formData.paymentMethod.creditCard.cardNumber.trim()) {
          errors.cardNumber = 'Card number is required';
          hasErrors = true;
        }
        if (!formData.paymentMethod.creditCard.expiryDate.trim()) {
          errors.expiryDate = 'Expiry date is required';
          hasErrors = true;
        }
        if (!formData.paymentMethod.creditCard.cvc.trim()) {
          errors.cvc = 'CVC is required';
          hasErrors = true;
        }
        if (!formData.paymentMethod.creditCard.cardOwner.trim()) {
          errors.cardOwner = 'Card owner name is required';
          hasErrors = true;
        }
      }
      
      setValidationErrors(prev => ({ ...prev, paymentMethod: errors }));
    }

    return !hasErrors;
  };

  // ปิดการใช้งาน handleStepClick - ให้กดได้แค่ปุ่ม Next/Back เท่านั้น
  const handleStepClick = (e, stepNumber) => {
    e.stopPropagation();
    console.log("Step click disabled - use Next/Back buttons instead");
    return;
  };

  // ✅ แก้ไขฟังก์ชัน goToNextStep ให้ validate ก่อน
  const goToNextStep = () => {
    console.log("=== NEXT BUTTON VALIDATION ===");
    
    // Validate current step
    const isValid = validateCurrentStep();
    
    if (isValid) {
      console.log("✅ Validation passed - moving to next step");
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
    } else {
      console.log("🚫 Cannot proceed to next step due to validation errors");
    }
  };

  const goToPrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // ✅ ฟังก์ชัน mock สำหรับ complete booking
  const handleCompleteBooking = async () => {
    console.log("=== COMPLETE BOOKING INITIATED ===");
    
    try {
      // Validate all steps
      const isValid = validateCurrentStep();
      
      if (!isValid) {
        alert("Please check the form and fix any highlighted errors before proceeding.");
        return;
      }

      console.log("✅ All validations passed!");
      console.log("📋 Form Data:", formData);

      // Mock payment processing
      if (formData.paymentMethod.type === "credit") {
        console.log("💳 Processing credit card payment...");
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock success
        alert(`🎉 Payment Successful!\n\nBooking confirmed!\nPayment method: Credit Card`);
        router.push('/payment-success');
        
      } else {
        // Handle cash payment
        console.log("💵 Cash payment selected - booking confirmed");
        alert("🎉 Booking Confirmed!\n\nPayment method: Cash\nPlease pay at the hotel during check-in.");
        router.push('/payment-success');
      }
      
    } catch (error) {
      console.error("❌ Error during booking completion:", error);
      alert("❌ An error occurred while processing your booking. Please try again.");
    }
  };

  // ✅ ฟังก์ชันสำหรับอัพเดท form data และ errors
  const updateFormData = (section, data, errors = null) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
    
    // อัพเดท errors ด้วย (ถ้ามี)
    if (errors !== null) {
      setValidationErrors(prev => ({
        ...prev,
        [section]: errors
      }));
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoForm 
            data={formData.basicInfo}
            errors={validationErrors.basicInfo}
            onUpdate={(data, errors) => updateFormData('basicInfo', data, errors)}
          />
        );
      case 2:
        return (
          <SpecialRequestForm 
            data={formData.specialRequests}
            errors={validationErrors.specialRequests}
            onUpdate={(data) => updateFormData('specialRequests', data)}
          />
        );
      case 3:
        return (
          <PaymentMethodForm 
            data={formData.paymentMethod}
            errors={validationErrors.paymentMethod}
            onUpdate={(data) => updateFormData('paymentMethod', data)}
          />
        );
      default:
        return (
          <BasicInfoForm 
            data={formData.basicInfo}
            errors={validationErrors.basicInfo}
            onUpdate={(data) => updateFormData('basicInfo', data)}
          />
        );
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
            {/* ✅ BookingDetailSection จะดึงข้อมูลจาก API เอง */}
            <BookingDetailSection />
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

// ✅ ลบ BookingProvider wrapper ออก - ไม่ใช้ context แล้ว
const index = () => {
  return <PaymentPage />;
};

export default index;