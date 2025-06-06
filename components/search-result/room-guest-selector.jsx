import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const RoomGuestSelector = ({
  roomCount: propRoomCount,
  guestCount: propGuestCount,
  onRoomChange,
  onGuestChange,
}) => {
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [maxCapacity, setMaxCapacity] = useState();

  useEffect(() => {
    if (propRoomCount !== undefined) {
      setRoomCount(propRoomCount);
    }
  }, [propRoomCount]);

  useEffect(() => {
    if (propGuestCount !== undefined) {
      setGuestCount(propGuestCount);
    }
  }, [propGuestCount]);

  const decreaseRoom = () => {
    if (roomCount > 1) {
      const newCount = roomCount - 1;  
      setRoomCount(newCount);
      onRoomChange?.(newCount);
    }
  };

  const increaseRoom = () => {
    const newCount = roomCount + 1;
    setRoomCount(newCount);
    onRoomChange?.(newCount);
  };

  const decreaseGuest = () => {
    if (guestCount > roomCount) {
      const newCount = guestCount - 1;
      setGuestCount(newCount);
      onGuestChange?.(newCount); 
    }
  };

  const increaseGuest = () => {
    if (maxCapacity && guestCount < maxCapacity * roomCount) {
      const newCount = guestCount + 1;
      setGuestCount(newCount);
      onGuestChange?.(newCount);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (guestCount < roomCount) {
      const newCount = roomCount;
      setGuestCount(newCount);
      onGuestChange?.(newCount); 
    }
  }, [roomCount, guestCount, onGuestChange]); 

  useEffect(() => {
    const fetchMaxCapacity = async () => {
      try {
        const response = await fetch("api/rooms/get-max-capacity");
        const data = await response.json();

        if (data.success) {
          setMaxCapacity(data.maxCapacity);
        } else {
          console.error("Failed to fetch max capacity:", data.error);
        }
      } catch (error) {
        console.error("Error fetching max capacity:", error);
      }
    };

    fetchMaxCapacity();
  }, []);

  const isDecreaseRoomDisabled = roomCount <= 1;
  const isDecreaseGuestDisabled = guestCount <= roomCount;
  const isIncreaseGuestDisabled = !maxCapacity || guestCount >= maxCapacity * roomCount;

  return (
    <div className="bg-white w-full  flex flex-col relative">
      <div ref={dropdownRef} className="w-full flex flex-col justify-start">
        <div
          onClick={toggleDropdown}
          className="flex justify-between items-center border shadow-xs rounded-md px-4 py-3 cursor-pointer"
        >
          <div>
            <span className="text-gray-900 text-b2">
              {roomCount} rooms, {guestCount} guests
            </span>
          </div>
          <FiChevronDown
            className={`text-gray-600 text-md cursor-pointer transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border p-4 rounded-sm mt-2">
            <p>Rooms</p>
            <div className="my-4 flex flex-row justify-between">
              <button
                onClick={decreaseRoom}
                disabled={isDecreaseRoomDisabled}
                className={`border w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium transition-all ${
                  isDecreaseRoomDisabled
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                    : "border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                -
              </button>
              <p>{roomCount}</p>
              <button
                onClick={increaseRoom}
                className="cursor-pointer border w-8 h-8 rounded-full hover:border-gray-900"
              >
                +
              </button>
            </div>

            <p>Guests</p>
            <div className="mt-4 flex flex-row justify-between">
              <button
                onClick={decreaseGuest}
                disabled={isDecreaseGuestDisabled}
                className={`border w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium transition-all ${
                  isDecreaseGuestDisabled
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                    : "border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                -
              </button>
              <p>{guestCount}</p>
              <button
                onClick={increaseGuest}
                disabled={isIncreaseGuestDisabled}
                className={`border w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium transition-all ${
                  isIncreaseGuestDisabled
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                    : "border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomGuestSelector;
