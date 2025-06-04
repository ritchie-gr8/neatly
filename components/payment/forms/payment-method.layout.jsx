import React, { useState, useEffect } from "react";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { HiOutlineBanknotes } from "react-icons/hi2";
import CreditCardForm from "./credit-card-form";
import CashForm from "./cash-form";
import { useBooking } from "@/contexts/booking-context";

const PaymentMethodForm = () => {
  const { bookingData, updatePaymentMethod } = useBooking();
  const currentPaymentMethod = bookingData.paymentMethod?.type || 'credit';
  const [paymentMethod, setPaymentMethod] = useState(currentPaymentMethod);

  useEffect(() => {
    const newPaymentMethod = bookingData.paymentMethod?.type || 'credit';
    setPaymentMethod(newPaymentMethod);
  }, [bookingData.paymentMethod?.type]);

  const handlePaymentMethodChange = (e, method) => {
    e.stopPropagation();
    console.log("Payment method selected:", method);
    setPaymentMethod(method);
    
    updatePaymentMethod({
      type: method
    });
  };

  const payByCreditCard = () => {
    alert("Credit card payment processed successfully!");
  };

  const payByCash = () => {
    alert("Cash payment option selected. You will pay at the hotel.");
  };

  const renderForm = () => {
    switch (paymentMethod) {
      case "credit":
        return <CreditCardForm onNext={payByCash} onBack={payByCreditCard} />;
      case "cash":
        return <CashForm onBack={payByCreditCard} />;
      default:
        return <CreditCardForm onNext={payByCash} onBack={payByCreditCard} />;
    }
  };

  const getBorderStyle = (method) => {
    if (paymentMethod === method) {
      return {
        borderColor: "#E76B39",
        color: "#E76B39",
        cursor: "pointer",
      };
    } else {
      return {
        borderColor: "#9AA1B9",
        color: "#9AA1B9",
        cursor: "pointer",
      };
    }
  };

  return (
    <section className="bg-white font-inter md:w-full md:p-10 md:border md:border-gray-300 md:rounded-sm">
      <div className="md:pb-10 pt-6 md:pt-0 px-4 md:px-0 flex flex-row w-full gap-2 md:gap-4 ">
        <div
          style={getBorderStyle("credit")}
          onClick={(e) => handlePaymentMethodChange(e, "credit")}
          className="h-20 rounded-sm w-1/2 flex flex-row justify-center items-center border-2 border-orange-500 text-orange-500 text-h5 font-semibold hover:shadow-lg"
        >
          <HiOutlineCreditCard className="font-semibold text-h4" />
          <p className="ml-2">Credit Card</p>
        </div>

        <div
          style={getBorderStyle("cash")}
          onClick={(e) => handlePaymentMethodChange(e, "cash")}
          className="px-6 rounded-sm w-1/2 flex flex-row justify-center items-center border-2 border-gray-500 text-gray-600 text-h5 font-semibold hover:shadow-lg"
        >
          <HiOutlineBanknotes className="font-semibold text-h4" />
          <p className="ml-2">Cash</p>
        </div>
      </div>

      {renderForm()}
    </section>
  );
};

export default PaymentMethodForm;
