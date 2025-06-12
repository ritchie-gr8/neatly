// components/payment/forms/credit-card-form.js (Updated version)
import React from "react";
import { useBooking } from "@/contexts/booking-context";
import { validateField } from "@/lib/validations/booking-validation";
import { cn } from "@/lib/utils";

const CreditCardForm = () => {
  const {
    bookingData,
    updatePaymentMethod,
    validationErrors,
    setValidationErrorsForSection,
  } = useBooking();

  const creditCardData = bookingData.paymentMethod?.creditCard || {
    cardNumber: "",
    cardOwner: "",
    expiryDate: "",
    cvc: "",
  };

  const currentErrors = validationErrors.paymentMethod || {};

  const validateSingleField = (fieldName, value) => {
    const error = validateField(fieldName, value);

    setValidationErrorsForSection("paymentMethod", {
      ...currentErrors,
      [fieldName]: error,
    });
  };

  const handleCreditCardChange = (e) => {
    const { id, value } = e.target;

    const newCreditCardData = {
      ...creditCardData,
      [id]: value,
    };

    updatePaymentMethod({
      creditCard: newCreditCardData,
    });

    validateSingleField(id, value);
  };

  return (
    <section>
      <div className="px-4 md:px-0 py-6 md:pt-0 text-gray-600 md:text-gray-800 font-medium text-h5">
        Credit Card
      </div>

      <form className="px-4 md:px-0 pb-6 md:pb-0 text-gray-900 ">
        <div className="flex flex-col">
          <label className="mb-1">Card Number</label>
          <input
            id="cardNumber"
            value={creditCardData.cardNumber}
            onChange={handleCreditCardChange}
            maxLength={16}
            placeholder="888 8888 8 88 88"
            className={cn(
              "mb-1 py-3 pl-3 pr-4 border rounded-sm w-full text-black",
              currentErrors.cardNumber ? "border-red-500" : "border-gray-400"
            )}
          />
          {currentErrors.cardNumber && (
            <p className="text-red-500 text-sm mt-1 mb-5">
              {currentErrors.cardNumber}
            </p>
          )}
          {!currentErrors.cardNumber && <div className="mb-6"></div>}
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Card Owner</label>
          <input
            id="cardOwner"
            value={creditCardData.cardOwner}
            onChange={handleCreditCardChange}
            placeholder="Kate Cho"
            className={cn(
              "mb-1 py-3 pl-3 pr-4 border rounded-sm w-full text-black",
              currentErrors.cardOwner ? "border-red-500" : "border-gray-400"
            )}
          />
          {currentErrors.cardOwner && (
            <p className="text-red-500 text-sm mt-1 mb-5">
              {currentErrors.cardOwner}
            </p>
          )}
          {!currentErrors.cardOwner && <div className="mb-6"></div>}
        </div>

        <div className=" flex flex-row justify-between gap-10 pb-6 md:pb-10">
          <div className="flex flex-col w-1/2">
            <label className="mb-1">Expiry Date</label>
            <input
              id="expiryDate"
              value={creditCardData.expiryDate}
              onChange={handleCreditCardChange}
              maxLength={5}
              placeholder="11/26"
              className={cn(
                "py-3 pl-3 pr-4 border rounded-sm w-full text-black mb-1",
                currentErrors.expiryDate ? "border-red-500" : "border-gray-400"
              )}
            />
            {currentErrors.expiryDate && (
              <p className="text-red-500 text-sm mt-1">
                {currentErrors.expiryDate}
              </p>
            )}
          </div>

          <div className="flex flex-col w-1/2">
            <label className="mb-1">CVC/CVV</label>
            <input
              id="cvc"
              value={creditCardData.cvc}
              onChange={handleCreditCardChange}
              maxLength={4}
              placeholder="888"
              className={cn(
                "py-3 pl-3 pr-4 border rounded-sm w-full text-black mb-1",
                currentErrors.cvc ? "border-red-500" : "border-gray-400"
              )}
            />
            {currentErrors.cvc && (
              <p className="text-red-500 text-sm mt-1">{currentErrors.cvc}</p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreditCardForm;
