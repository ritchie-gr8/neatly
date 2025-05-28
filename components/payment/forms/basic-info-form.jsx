// components/payment/forms/basic-info-form.js (Updated version)
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import CustomDatePicker from "@/components/global/date-picker";
import { COUNTRY } from "@/constants/country";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useBooking } from "@/contexts/booking-context";
import { validateField } from "@/lib/validations/booking-validation";

const BasicInfoForm = () => {
  const { user } = useAuth();
  const { 
    bookingData, 
    updateBasicInfo, 
    validationErrors, 
    setValidationErrorsForSection 
  } = useBooking();
  const [isInitialized, setIsInitialized] = useState(false);

  const [formData, setFormData] = useState(bookingData.basicInfo);

  // Get current validation errors for basic info
  const currentErrors = validationErrors.basicInfo || {};

  const parseDate = (dateString) => {
    if (!dateString) return null;

    if (dateString instanceof Date) return dateString;

    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  const hasDataInContext = () => {
    return (
      bookingData.basicInfo.firstName ||
      bookingData.basicInfo.lastName ||
      bookingData.basicInfo.email ||
      bookingData.basicInfo.phone ||
      bookingData.basicInfo.dateOfBirth ||
      bookingData.basicInfo.country
    );
  };

  // Validate single field and update errors
  const validateSingleField = (fieldName, value) => {
    const error = validateField(fieldName, value, formData);
    
    setValidationErrorsForSection('basicInfo', {
      ...currentErrors,
      [fieldName]: error
    });
  };

  useEffect(() => {
    if (user && !isInitialized) {
      if (!hasDataInContext()) {
        // ครั้งแรก: ใช้ข้อมูลจาก auth context
        console.log("Loading initial user data from auth context:", {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          country: user.country
        });
        
        const userData = {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          dateOfBirth: parseDate(user.dateOfBirth),
          country: user.country || "",
        };
        
        setFormData(userData);
        updateBasicInfo(userData);
      } else {
        console.log("Using existing modified data from context:", bookingData.basicInfo);
        setFormData(bookingData.basicInfo);
      }
      setIsInitialized(true);
    }
  }, [user, isInitialized, bookingData.basicInfo, updateBasicInfo]);

  useEffect(() => {
    if (isInitialized) {
      setFormData(bookingData.basicInfo);
    }
  }, [bookingData.basicInfo, isInitialized]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const newData = { ...formData, [id]: value };

    setFormData(newData);
    updateBasicInfo(newData);
    
    // Validate the field in real-time
    validateSingleField(id, value);
  };

  const handleDateChange = (date) => {
    const newData = { ...formData, dateOfBirth: date };

    setFormData(newData);
    updateBasicInfo(newData);
    
    // Validate date field
    validateSingleField('dateOfBirth', date);
  };

  const handleCountryChange = (value) => {
    const newData = { ...formData, country: value };

    setFormData(newData);
    updateBasicInfo(newData);
    
    // Validate country field
    validateSingleField('country', value);
  };

  return (
    <section className="bg-white font-inter md:w-full md:p-10 md:border md:border-gray-300 md:rounded-sm">
      <div className="px-4 md:px-0 py-6 md:pt-0 text-gray-600 md:text-gray-800 font-medium text-h5">
        Basic Information
      </div>

      <form className="px-4 md:px-0 pb-6 md:pb-0 text-gray-900 ">
        <div className="flex flex-col">
          <label>First name</label>
          <input
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={cn(
              "mb-1 py-3 pl-3 pr-4 border rounded-sm w-full text-black",
              currentErrors.firstName ? "border-red-500" : "border-gray-400"
            )}
          />
          {currentErrors.firstName && (
            <p className="text-red-500 text-sm mt-1 mb-5">{currentErrors.firstName}</p>
          )}
          {!currentErrors.firstName && <div className="mb-6"></div>}
        </div>

        <div className="flex flex-col">
          <label>Last name</label>
          <input
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Cho"
            className={cn(
              "mb-1 py-3 pl-3 pr-4 border rounded-sm w-full text-black",
              currentErrors.lastName ? "border-red-500" : "border-gray-400"
            )}
          />
          {currentErrors.lastName && (
            <p className="text-red-500 text-sm mt-1 mb-5">{currentErrors.lastName}</p>
          )}
          {!currentErrors.lastName && <div className="mb-6"></div>}
        </div>

        <div className="flex flex-col">
          <label>Email</label>
          <input
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="kate.cho@gmail.com"
            className={cn(
              "mb-1 py-3 pl-3 pr-4 border rounded-sm w-full text-black",
              currentErrors.email ? "border-red-500" : "border-gray-400"
            )}
          />
          {currentErrors.email && (
            <p className="text-red-500 text-sm mt-1 mb-5">{currentErrors.email}</p>
          )}
          {!currentErrors.email && <div className="mb-6"></div>}
        </div>

        <div className="flex flex-col">
          <label>Phone number</label>
          <input
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="088 888 8888"
            className={cn(
              "mb-1 py-3 pl-3 pr-4 border rounded-sm w-full text-black",
              currentErrors.phone ? "border-red-500" : "border-gray-400"
            )}
          />
          {currentErrors.phone && (
            <p className="text-red-500 text-sm mt-1 mb-5">{currentErrors.phone}</p>
          )}
          {!currentErrors.phone && <div className="mb-6"></div>}
        </div>

        <div className="flex flex-col">
          <label>Date of Birth</label>
          <CustomDatePicker
            value={formData.dateOfBirth}
            defaultValue={formData.dateOfBirth}
            onDateChange={handleDateChange}
            className={cn(
              "px-3 py-3 text-black border shadow-none rounded-sm mb-1",
              currentErrors.dateOfBirth ? "border-red-500" : "border-gray-400"
            )}
          />
          {currentErrors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1 mb-5">{currentErrors.dateOfBirth}</p>
          )}
          {!currentErrors.dateOfBirth && <div className="mb-6"></div>}
        </div>

        <div className="flex flex-col">
          <label>Country</label>
          <Select value={formData.country} onValueChange={handleCountryChange}>
            <div>
              <SelectTrigger
                className={cn(
                  "text-md mb-1 py-6 pl-3 pr-4 border rounded-sm w-full cursor-pointer bg-white",
                  currentErrors.country ? "border-red-500" : "border-gray-400",
                  formData.country ? "text-black" : "text-gray-600"
                )}
              >
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
            </div>

            <SelectContent className="bg-white text-black max-h-60">
              {Object.entries(COUNTRY).map(([code, name]) => (
                <SelectItem
                  key={code}
                  value={code}
                  className="text-black hover:bg-gray-100 cursor-pointer"
                >
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {currentErrors.country && (
            <p className="text-red-500 text-sm mt-1 mb-5">{currentErrors.country}</p>
          )}
          {!currentErrors.country && <div className="mb-6"></div>}
        </div>
      </form>
    </section>
  );
};

export default BasicInfoForm;