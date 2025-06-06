import React from "react";
import { PiHandDepositBold } from "react-icons/pi";

const CashForm = () => {
  return (
    <section>
      <div className="px-4 md:px-0 py-6 md:pt-0 text-gray-600 md:text-gray-800 font-medium text-h5">
        Cash
      </div>

      <form className="px-4 md:px-0 pb-6 md:pb-0 text-gray-900 ">
        <div className="flex flex-row justify-center items-center bg-gray-200 rounded-sm px-6 py-4 mb-6">
          <PiHandDepositBold className="text-orange-500 w-12 h-12"/>
          <p className="text-gray-900 text-b1 ml-4">
            Pay at the hotel with cash or cheque. No payment is required until
            you check in
          </p>
        </div>
      </form>
    </section>
  );
};

export default CashForm;
