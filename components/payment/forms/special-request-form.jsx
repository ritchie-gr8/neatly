// components/payment/forms/special-request-form.js (Updated version)
import React, { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useBooking } from "@/contexts/booking-context";
import { validateField } from "@/lib/validations/booking-validation";
import { cn } from "@/lib/utils";

const SpecialRequestForm = () => {
  const {
    bookingData,
    updateSpecialRequests,
    validationErrors,
    setValidationErrorsForSection,
  } = useBooking();

  const formData = bookingData.specialRequests || {
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
  };

  const currentErrors = validationErrors.specialRequests || {};

  const validateAdditionalRequest = (value) => {
    const error = validateField("additionalRequest", value);

    setValidationErrorsForSection("specialRequests", {
      ...currentErrors,
      additionalRequest: error,
    });
  };

  const handleStandardRequestChange = (requestType) => {
    const newStandardRequests = {
      ...formData.standardRequests,
      [requestType]: !formData.standardRequests[requestType],
    };

    const newData = {
      ...formData,
      standardRequests: newStandardRequests,
    };

    updateSpecialRequests(newData);
  };

  const handleSpecialRequestChange = (requestType) => {
    const newSpecialRequests = {
      ...formData.specialRequests,
      [requestType]: !formData.specialRequests[requestType],
    };

    const newData = {
      ...formData,
      specialRequests: newSpecialRequests,
    };

    updateSpecialRequests(newData);
  };

  const handleAdditionalRequestChange = (e) => {
    const value = e.target.value;
    const newData = {
      ...formData,
      additionalRequest: value,
    };

    updateSpecialRequests(newData);

    validateAdditionalRequest(value);
  };

  return (
    <section className="bg-white font-inter md:w-full md:p-10 md:border md:border-gray-300 md:rounded-sm">
      {/* Standard Request */}
      <div className="px-4 md:px-0 pt-6 md:pt-0">
        <p className="font-medium text-h5 text-gray-600 md:text-gray-800">
          Standard Request
        </p>
        <p className="text-b2 text-gray-600 ">
          These requests are not confirmed (Depend on the available room)
        </p>
        <form className="py-6 font-inter">
          <label className="flex items-center relative cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.standardRequests.earlyCheckIn}
              onChange={() => handleStandardRequestChange("earlyCheckIn")}
            />
            <div className="w-6 h-6 bg-white peer-checked:bg-orange-500 border border-gray-400 rounded-sm peer-checked:border-orange-300"></div>
            <FiCheck className="absolute w-4 h-4 top-1 left-1 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            <span className="text-gray-700 ml-3">Early check-in</span>
          </label>

          <label className="flex items-center relative cursor-pointer mt-6">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.standardRequests.lateCheckOut}
              onChange={() => handleStandardRequestChange("lateCheckOut")}
            />
            <div className="w-6 h-6 bg-white peer-checked:bg-orange-500 border border-gray-400 rounded-sm peer-checked:border-orange-300"></div>
            <FiCheck className="absolute w-4 h-4 top-1 left-1 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            <span className="text-gray-700 ml-3">Late check-out</span>
          </label>

          <label className="flex items-center relative cursor-pointer mt-6">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.standardRequests.nonSmokingRoom}
              onChange={() => handleStandardRequestChange("nonSmokingRoom")}
            />
            <div className="w-6 h-6 bg-white peer-checked:bg-orange-500 border border-gray-400 rounded-sm peer-checked:border-orange-300"></div>
            <FiCheck className="absolute w-4 h-4 top-1 left-1 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            <span className="text-gray-700 ml-3">Non-smoking room</span>
          </label>

          <label className="flex items-center relative cursor-pointer mt-6">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.standardRequests.highFloorRoom}
              onChange={() => handleStandardRequestChange("highFloorRoom")}
            />
            <div className="w-6 h-6 bg-white peer-checked:bg-orange-500 border border-gray-400 rounded-sm peer-checked:border-orange-300"></div>
            <FiCheck className="absolute w-4 h-4 top-1 left-1 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            <span className="text-gray-700 ml-3">A room on the high floor</span>
          </label>

          <label className="flex items-center relative cursor-pointer mt-6">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.standardRequests.quietRoom}
              onChange={() => handleStandardRequestChange("quietRoom")}
            />
            <div className="w-6 h-6 bg-white peer-checked:bg-orange-500 border border-gray-400 rounded-sm peer-checked:border-orange-300"></div>
            <FiCheck className="absolute w-4 h-4 top-1 left-1 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            <span className="text-gray-700 ml-3">A quiet room</span>
          </label>
        </form>
      </div>

      {/* Special Request */}
      <div className="px-4 md:px-0 md:pt-0">
        <p className="font-medium text-h5 text-gray-600 md:text-gray-800">
          Special Request
        </p>
        <p className="text-b2 text-gray-600 ">Additional charge may apply</p>
        <form className="pt-6 pb-10 font-inter">
          <label className="flex items-center relative cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.specialRequests.babyCot}
              onChange={() => handleSpecialRequestChange("babyCot")}
            />
            <div className="w-6 h-6 bg-white peer-checked:bg-orange-500 border border-gray-400 rounded-sm peer-checked:border-orange-300"></div>
            <FiCheck className="absolute w-4 h-4 top-1 left-1 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            <span className="text-gray-700 ml-3">Baby cot (+THB 400)</span>
          </label>

          <label className="flex items-center relative cursor-pointer mt-6">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.specialRequests.airportTransfer}
              onChange={() => handleSpecialRequestChange("airportTransfer")}
            />
            <div className="w-6 h-6 bg-white peer-checked:bg-orange-500 border border-gray-400 rounded-sm peer-checked:border-orange-300"></div>
            <FiCheck className="absolute w-4 h-4 top-1 left-1 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            <span className="text-gray-700 ml-3">
              Airport transfer (+THB 200)
            </span>
          </label>

          <label className="flex items-center relative cursor-pointer mt-6">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.specialRequests.extraBed}
              onChange={() => handleSpecialRequestChange("extraBed")}
            />
            <div className="w-6 h-6 bg-white peer-checked:bg-orange-500 border border-gray-400 rounded-sm peer-checked:border-orange-300"></div>
            <FiCheck className="absolute w-4 h-4 top-1 left-1 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            <span className="text-gray-700 ml-3">Extra bed (+THB 500)</span>
          </label>

          <label className="flex items-center relative cursor-pointer mt-6">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.specialRequests.extraPillows}
              onChange={() => handleSpecialRequestChange("extraPillows")}
            />
            <div className="w-6 h-6 bg-white peer-checked:bg-orange-500 border border-gray-400 rounded-sm peer-checked:border-orange-300"></div>
            <FiCheck className="absolute w-4 h-4 top-1 left-1 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            <span className="text-gray-700 ml-3">Extra pillows (+THB 100)</span>
          </label>

          <label className="flex items-center relative cursor-pointer mt-6">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.specialRequests.phoneChargers}
              onChange={() => handleSpecialRequestChange("phoneChargers")}
            />
            <div className="w-6 h-6 bg-white peer-checked:bg-orange-500 border border-gray-400 rounded-sm peer-checked:border-orange-300"></div>
            <FiCheck className="absolute w-4 h-4 top-1 left-1 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            <span className="text-gray-700 ml-3">
              Phone chargers and adapters (+THB 100)
            </span>
          </label>

          <label className="flex items-center relative cursor-pointer mt-6">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.specialRequests.breakfast}
              onChange={() => handleSpecialRequestChange("breakfast")}
            />
            <div className="w-6 h-6 bg-white peer-checked:bg-orange-500 border border-gray-400 rounded-sm peer-checked:border-orange-300"></div>
            <FiCheck className="absolute w-4 h-4 top-1 left-1 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            <span className="text-gray-700 ml-3">Breakfast (+THB 150)</span>
          </label>
        </form>
      </div>

      {/* Additional Request */}
      <div className="px-4 md:px-0 md:pt-0 pb-6 md:pb-0">
        <p className="text-gray-900 mb-1">Additional Request</p>
        <textarea
          className={cn(
            "w-full h-20 border rounded-sm p-3 pr-4 text-black mb-1",
            currentErrors.additionalRequest
              ? "border-red-500"
              : "border-gray-400"
          )}
          value={formData.additionalRequest}
          onChange={handleAdditionalRequestChange}
          placeholder="Enter any additional requests..."
        />
        {currentErrors.additionalRequest && (
          <p className="text-red-500 text-sm mt-1">
            {currentErrors.additionalRequest}
          </p>
        )}
      </div>
    </section>
  );
};

export default SpecialRequestForm;
