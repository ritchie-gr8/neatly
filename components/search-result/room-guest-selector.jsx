import React, { useState, useEffect } from 'react';
import { FiUsers } from 'react-icons/fi';
import { FiChevronDown } from 'react-icons/fi';

const RoomGuestSelector = ({ 
  rooms, 
  setRooms, 
  guests, 
  setGuests, 
  maxCapacity = 10, 
  isAdmin = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [actualMaxCapacity, setActualMaxCapacity] = useState(maxCapacity);
  
  useEffect(() => {
    const parsedMaxCapacity = parseInt(maxCapacity);
    if (!isNaN(parsedMaxCapacity) && parsedMaxCapacity > 0) {
      setActualMaxCapacity(parsedMaxCapacity);
    } else {
      setActualMaxCapacity(10);
    }
  }, [maxCapacity]);
  
  useEffect(() => {
    if (rooms !== 1 || guests !== 1) {
      setIsSelected(true);
    }
  }, [rooms, guests]);

  const minGuests = rooms;
  
  const getMaxGuests = (roomCount) => {
    return actualMaxCapacity * roomCount;
  };
  
  const maxGuests = getMaxGuests(rooms);
  
  useEffect(() => {
    if (guests < minGuests) {
      setGuests(minGuests);
    } else if (guests > maxGuests) {
      setGuests(maxGuests);
    }
  }, [rooms, minGuests, maxGuests, setGuests, guests]);
  
  const handleAddRoom = () => {
    const newRooms = rooms + 1;
    setRooms(newRooms);
    
    if (guests < newRooms) {
      setGuests(newRooms);
    }
    
    const newMaxGuests = getMaxGuests(newRooms);
    if (guests > newMaxGuests) {
      setGuests(newMaxGuests);
    }
    
    setIsSelected(true);
  };
  
  const handleRemoveRoom = () => {
    if (rooms > 1) {
      const newRooms = rooms - 1;
      setRooms(newRooms);
      
      const newMaxGuests = getMaxGuests(newRooms);
      if (guests > newMaxGuests) {
        setGuests(newMaxGuests);
      }
      
      if (guests < newRooms) {
        setGuests(newRooms);
      }
      
      setIsSelected(true);
    }
  };
  
  const handleAddGuest = () => {
    if (guests < maxGuests) {
      setGuests(guests + 1);
      setIsSelected(true);
    }
  };
  
  const handleRemoveGuest = () => {
    if (guests > minGuests) {
      setGuests(guests - 1);
      setIsSelected(true);
    }
  };
  
  const getGuestRangeText = () => {
    if (rooms === 1) {
      return `Min ${minGuests} guest - Max ${maxGuests} guests`;
    } else {
      return `Min ${minGuests} guests - Max ${maxGuests} guests`;
    }
  };
  
  const validateGuestSelection = (roomCount, guestCount) => {
    return guestCount >= roomCount && guestCount <= getMaxGuests(roomCount);
  };
  
  const getRoomExplanationText = () => {
    if (rooms === 1) {
      return `1 room: 1-${actualMaxCapacity} guests`;
    } else {
      return `${rooms} rooms: Min ${rooms} guests (at least 1 per room), Max ${actualMaxCapacity * rooms} guests`;
    }
  };
  
  return (
    <div className="relative w-full">
      <div 
        className="py-2.5 pl-3 pr-4 flex items-center justify-between p-3 border-2 border-gray-400 rounded-sm cursor-pointer hover:border-gray-400 md:w-60"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <span className={`text-gray-600 ${isSelected ? "text-black" : "text-gray-600"}`}>
            {rooms} {rooms === 1 ? 'room' : 'rooms'}, {guests} {guests === 1 ? 'guest' : 'guests'}
          </span>
        </div>
        <FiChevronDown 
          size={16} 
          className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''} `}
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-sm shadow-lg">
          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Rooms</h3>
              <div className="flex items-center justify-between">
                <button 
                  className={`w-8 h-8 flex items-center justify-center border rounded-full text-lg cursor-pointer hover:border-gray-700 transition-all duration-300 ${rooms <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700'}`}
                  onClick={handleRemoveRoom}
                  disabled={rooms <= 1}
                >
                  -
                </button>
                <span className="text-gray-700 font-medium">{rooms}</span>
                <button 
                  className="w-8 h-8 flex items-center justify-center border rounded-full text-lg cursor-pointer hover:border-gray-700 transition-all duration-300 text-gray-700"
                  onClick={handleAddRoom}
                >
                  +
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Guests</h3>
              <div className="flex items-center justify-between">
                <button 
                  className={`w-8 h-8 flex items-center justify-center border rounded-full text-lg cursor-pointer hover:border-gray-700 transition-all duration-300 ${guests <= minGuests ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700'}`}
                  onClick={handleRemoveGuest}
                  disabled={guests <= minGuests}
                >
                  -
                </button>
                <span className="text-gray-700 font-medium">{guests}</span>
                <button 
                  className={`w-8 h-8 flex items-center justify-center border rounded-full text-lg cursor-pointer hover:border-gray-700 transition-all duration-300 ${guests >= maxGuests ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700'}`}
                  onClick={handleAddGuest}
                  disabled={guests >= maxGuests}
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {getGuestRangeText()}
              </p>
              
              <p className="text-xs text-gray-500 mt-1">
                {getRoomExplanationText()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomGuestSelector;