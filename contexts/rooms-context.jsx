import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import api from "@/lib/axios";

const RoomsContext = createContext();

export const useRooms = () => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error("useRooms must be used within a RoomsProvider");
  }
  return context;
};

export const RoomsProvider = ({ children }) => {
  // All rooms data
  const [allRooms, setAllRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [maxCapacity, setMaxCapacity] = useState(0);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);
  
  // Search parameters
  const [searchParams, setSearchParams] = useState({
    checkIn: null,
    checkOut: null,
    rooms: 1,
    guests: 1
  });

  // Fetch all rooms (initial load)
  const fetchAllRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await api.get("/api/rooms/get-rooms");
      
      if (data.success) {
        setAllRooms(data.data.rooms || []);
        setFilteredRooms(data.data.rooms || []); // Initially show all rooms
        setMaxCapacity(data.data.maxCapacity || 0);
      } else {
        setError(data.message || "Failed to fetch rooms");
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError(err.response?.data?.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  // Search rooms with specific criteria
  const searchRooms = async (searchCriteria) => {
    try {
      setSearchLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams({
        checkIn: searchCriteria.checkIn || '',
        checkOut: searchCriteria.checkOut || '',
        rooms: searchCriteria.rooms?.toString() || '1',
        guests: searchCriteria.guests?.toString() || '1',
      });

      const { data } = await api.get(`/api/rooms/search-rooms?${queryParams.toString()}`);
      
      if (data.success) {
        setFilteredRooms(data.data || []);
        setSearchParams(searchCriteria);
        setMaxCapacity(data.maxCapacity || 0);
        return {
          success: true,
          rooms: data.data || [],
          maxCapacity: data.maxCapacity || 0,
          searchParams: data.searchParams
        };
      } else {
        setError(data.message || "No rooms found");
        setFilteredRooms([]);
        return {
          success: false,
          message: data.message,
          rooms: [],
          maxCapacity: data.maxCapacity || 0
        };
      }
    } catch (err) {
      console.error("Error searching rooms:", err);
      const errorMessage = err.response?.data?.message || "Failed to search rooms";
      setError(errorMessage);
      setFilteredRooms([]);
      return {
        success: false,
        message: errorMessage,
        rooms: [],
        maxCapacity: 0
      };
    } finally {
      setSearchLoading(false);
    }
  };

  // Filter rooms locally (without API call)
  const filterRoomsLocally = (criteria) => {
    if (!allRooms.length) return [];

    const { rooms: roomCount, guests: guestCount } = criteria;
    
    if (!roomCount || !guestCount) {
      setFilteredRooms(allRooms);
      return allRooms;
    }

    const guestsPerRoom = Math.ceil(guestCount / roomCount);
    const filtered = allRooms.filter(room => {
      const capacity = room.roomType?.capacity || 0;
      return capacity >= guestsPerRoom;
    });

    setFilteredRooms(filtered);
    setSearchParams(criteria);
    return filtered;
  };

  // Auto-fetch on mount
  useEffect(() => {
    if (!initialized) {
      fetchAllRooms();
    }
  }, [initialized]);

  // Helper functions
  const getRoomById = (roomId) => {
    const id = parseInt(roomId);
    return allRooms.find(room => room.id === id) || 
           filteredRooms.find(room => room.id === id);
  };

  const getRoomsByCapacity = (capacity) => {
    const rooms = filteredRooms.length > 0 ? filteredRooms : allRooms;
    return rooms.filter(room => room.roomType?.capacity >= capacity);
  };

  const getAvailableRooms = () => {
    return filteredRooms.length > 0 ? filteredRooms : allRooms;
  };

  // Reset filters to show all rooms
  const resetFilters = () => {
    setFilteredRooms(allRooms);
    setSearchParams({
      checkIn: null,
      checkOut: null,
      rooms: 1,
      guests: 1
    });
    setError(null);
  };

  // Refresh all data
  const refreshRooms = () => {
    fetchAllRooms();
  };

  // Computed values
  const hasActiveSearch = useMemo(() => {
    return searchParams.checkIn || searchParams.checkOut || 
           searchParams.rooms > 1 || searchParams.guests > 1;
  }, [searchParams]);

  const roomsToDisplay = useMemo(() => {
    return filteredRooms.length > 0 ? filteredRooms : allRooms;
  }, [filteredRooms, allRooms]);

  const value = {
    // Data
    allRooms,
    filteredRooms,
    roomsToDisplay,
    maxCapacity,
    searchParams,
    
    // Status
    loading,
    searchLoading,
    error,
    initialized,
    hasActiveSearch,
    
    // Actions
    fetchAllRooms,
    searchRooms,
    filterRoomsLocally,
    resetFilters,
    refreshRooms,
    
    // Helper functions
    getRoomById,
    getRoomsByCapacity,
    getAvailableRooms,
  };

  return (
    <RoomsContext.Provider value={value}>
      {children}
    </RoomsContext.Provider>
  );
};