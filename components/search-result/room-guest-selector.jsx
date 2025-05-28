import useClickOutside from "@/hooks/useClickOutside";
import React, { useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

const RoomGuestSelector = ({
  rooms,
  onAddRoom,
  onRemoveRoom,
  guests,
  onAddGuest,
  onRemoveGuest,
  maxCapacity,
  pageType,
  className,
}) => {
  const ref = useRef(null);
  useClickOutside(ref, () => setIsOpen(false));

  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(pageType === "search-result");

  const handleClick = (cb) => {
    if (!isSelected) {
      setIsSelected(true);
    }

    cb();
  };

  return (
    <div className="relative w-full" ref={ref}>
      <div
        className={`py-2.5 pl-3 pr-4 h-12 flex items-center justify-between text-b2 p-3
        border border-input shadow-xs rounded-md cursor-pointer hover:border-gray-400 ${
          className ? className : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <span className="text-black">
            {rooms} {rooms === 1 ? "room" : "rooms"}, {guests}{" "}
            {guests === 1 ? "guest" : "guests"}
          </span>
        </div>
        <FiChevronDown
          size={16}
          className={`text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          } `}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-sm shadow-lg">
          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Rooms</h3>
              <div className="flex items-center justify-between">
                <button
                  className={`w-8 h-8 flex items-center justify-center border rounded-full text-lg cursor-pointer hover:border-gray-700 transition-all duration-300 ${
                    rooms <= 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleClick(onRemoveRoom)}
                  disabled={rooms <= 1}
                >
                  -
                </button>
                <span className="text-gray-700 font-medium">{rooms}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center border rounded-full text-lg cursor-pointer hover:border-gray-700 transition-all duration-300 text-gray-700"
                  onClick={() => handleClick(onAddRoom)}
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Guests</h3>
              <div className="flex items-center justify-between">
                <button
                  className={`w-8 h-8 flex items-center justify-center border rounded-full text-lg cursor-pointer hover:border-gray-700 transition-all duration-300 ${
                    guests <= 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleClick(onRemoveGuest)}
                  disabled={guests <= 1}
                >
                  -
                </button>
                <span className="text-gray-700 font-medium">{guests}</span>
                <button
                  className={`w-8 h-8 flex items-center justify-center border rounded-full text-lg cursor-pointer hover:border-gray-700 transition-all duration-300 ${
                    guests >= maxCapacity
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleClick(onAddGuest)}
                  disabled={guests >= maxCapacity}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomGuestSelector;
