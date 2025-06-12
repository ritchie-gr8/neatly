import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, Loader2, Trash2, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import AdminLayout from "@/layouts/admin.layout";
import api from "@/lib/axios";
import { toast } from "sonner";
import CustomPagination from "@/components/ui/custom-pagination";
import { useDebouce } from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
// Improved component for room status dropdown with outside click detection
// Replace the current StatusDropdown component with this updated version
const StatusDropdown = ({
  currentStatus,
  roomId,
  onStatusChange,
  roomStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    if (newStatus.statusName === currentStatus) {
      setIsOpen(false);
      setSearchTerm("");
      return;
    }

    setLoading(true);
    try {
      // API call to update the room status
      const response = await api.patch(`/admin/rooms/${roomId}`, {
        status: newStatus.statusName,
        id: newStatus.id,
      });

      if (response?.data?.success) {
        onStatusChange(roomId, newStatus);
      } else {
        toast.error("Failed to update room status");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update room status");
    } finally {
      setLoading(false);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "bg-gray-100";
    if (status.includes("Dirty")) return "bg-[#FFE5E5] text-[#A50606]";
    if (status.includes("Inspected")) return "bg-[#FFF9E5] text-[#766A00]";
    if (status.includes("Occupied")) return "bg-[#E4ECFF] text-[#084BAF]";
    if (status.includes("Vacant") && !status.includes("Clean")) return "bg-[#F0F2F8] text-[#006753]";
    if (status.includes("Clean")) return "bg-[#E5FFFA] text-[#006753]";
    return "bg-[#F0F1F8] text-[#6E7288]";
  };
  // Filter statuses based on search term
  const filteredStatuses = roomStatus.filter(status =>
    status.statusName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleClearStatus = () => {
    setSearchTerm("");
  }
  return (
    <div className="relative" ref={dropdownRef}>
      {loading ? (
        <div className="px-3 py-1 flex items-center justify-center">
          <Loader2 className="animate-spin h-4 w-4" />
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`px-3 py-1 rounded-md ${getStatusClass(currentStatus)} cursor-pointer hover:brightness-90`}
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            {currentStatus || "Select Status"}
          </button>

          {isOpen && (
            <div className="absolute z-[9999] mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-2 border-b">
                <div className="relative">
                  <Input
                    placeholder="Search status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-8 text-gray-600"
                  />
                  {/* <Search
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  /> */}
                  <button
                    type="button"
                    onClick={handleClearStatus}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className="max-h-60 overflow-auto">
                {filteredStatuses.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-gray-500">No status found</div>
                ) : (
                  filteredStatuses.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => handleStatusChange(status)}
                      className={`block w-full text-left px-4 py-2 text-sm font-medium cursor-pointer border-l-8 hover:bg-gray-50 ${
                        status.statusName === currentStatus ? " border-green-500" : "border-white"
                      }`}
                    >
                      <span className={`px-3 py-1 rounded-md whitespace-nowrap ${getStatusClass(status.statusName)}`}>
                        {status.statusName}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
// Improved component for creating a new room with validation
const CreateRoomForm = ({ onCancel, onSubmit, roomTypes, roomStatus }) => {
  const [roomData, setRoomData] = useState({
    roomNumber: "",
    roomTypeId: "",
    status: "",
  });

  const [validation, setValidation] = useState({
    roomNumber: "",
    roomTypeId: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRoomData({
      ...roomData,
      [name]: value,
    });

    // Clear validation error when field is edited
    if (validation[name]) {
      setValidation({
        ...validation,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newValidation = {
      roomNumber: !roomData.roomNumber.trim() ? "Room number is required" : "",
      roomTypeId: !roomData.roomTypeId ? "Room type is required" : "",
      status: !roomData.status ? "Status is required" : "",
    };

    setValidation(newValidation);
    return Object.values(newValidation).every((val) => !val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    console.log('pass validation', roomData)

    setLoading(true);
    setError(null);

    try {
      await onSubmit(roomData);
    } catch (err) {
      setError(err.message || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 border-b border-brown-300 px-16 py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="text-gray-900 hover:text-gray-600 cursor-pointer"
            onClick={onCancel}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </Button>
          <h5 className="text-h5 font-semibold text-gray-900 cursor-pointer">
            Create New Room
          </h5>
        </div>
      </div>

      <Card className="mx-16 p-6 rounded-none">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="roomNumber"
              >
                Room Number
              </label>
              <Input
                id="roomNumber"
                name="roomNumber"
                value={roomData.roomNumber}
                onChange={handleChange}
                placeholder="Enter room number"
                className="w-full"
                aria-invalid={!!validation.roomNumber}
                aria-describedby={
                  validation.roomNumber ? "roomNumber-error" : undefined
                }
              />
              {validation.roomNumber && (
                <p id="roomNumber-error" className="mt-1 text-red-500 text-sm">
                  {validation.roomNumber}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="roomTypeId"
              >
                Room Type
              </label>
              <select
                id="roomTypeId"
                name="roomTypeId"
                value={roomData.roomTypeId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                aria-invalid={!!validation.roomTypeId}
                aria-describedby={
                  validation.roomTypeId ? "roomType-error" : undefined
                }
              >
                <option value="">Select room type</option>
                {Array.isArray(roomTypes) &&
                  roomTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
              </select>
              {validation.roomTypeId && (
                <p id="roomType-error" className="mt-1 text-red-500 text-sm">
                  {validation.roomTypeId}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={roomData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                aria-invalid={!!validation.status}
                aria-describedby={
                  validation.status ? "status-error" : undefined
                }
              >
                <option value="">Please select status</option>
                {Array.isArray(roomStatus) &&
                  roomStatus.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.statusName}
                    </option>
                  ))}
              </select>
              {validation.status && (
                <p id="status-error" className="mt-1 text-red-500 text-sm">
                  {validation.status}
                </p>
              )}
            </div>
          </div>

          {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

          <div className="flex justify-end mt-6 gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="btn-primary font-open-sans text-base font-semibold text-util-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Room"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

// Main Room Management component with improved error handling and state management
const RoomManagement = () => {
  const [mode, setMode] = useState("view");
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [roomStatus, setRoomStatus] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [statusLoading, setStatusLoading] = useState(true);
  const [roomTypesLoading, setRoomTypesLoading] = useState(true);
  const debouncedSearchTerm = useDebouce(searchTerm, 500);

  // Define the page size (items per page)
  const pageSize = 10;

  // Improved room status fetching with error handling
  useEffect(() => {
    const fetchRoomStatus = async () => {
      try {
        setStatusLoading(true);
        const response = await api.get("/admin/room-status/list");
        if (Array.isArray(response.data.roomStatuses)) {
          setRoomStatus(response.data.roomStatuses);
        } else {
          console.error("Invalid room status format:", response.data);
          setRoomStatus([]);
        }
      } catch (err) {
        console.error("Error fetching room status:", err);
        setError("Failed to load room status. Please refresh the page.");
      } finally {
        setStatusLoading(false);
      }
    };

    fetchRoomStatus();
  }, []);

  // Improved room types fetching with error handling
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        setRoomTypesLoading(true);
        const response = await api.get("/admin/room-type/list");
        // console.log(response);
        if (response.data?.items) {
          setRoomTypes(response.data.items);
        } else {
          console.error("Invalid room types format:", response.data);
          setRoomTypes([]);
        }
      } catch (err) {
        console.error("Error fetching room types:", err);
        setError("Failed to load room types. Please refresh the page.");
      } finally {
        setRoomTypesLoading(false);
      }
    };

    fetchRoomTypes();
  }, []);

  // Fetch rooms when dependencies change
  useEffect(() => {
    if (!isInitialLoad || (!statusLoading && !roomTypesLoading)) {
      fetchRooms();
    }

    // Mark initial load as complete after first run
    if (isInitialLoad && !statusLoading && !roomTypesLoading) {
      setIsInitialLoad(false);
    }
  }, [
    currentPage,
    debouncedSearchTerm,
    isInitialLoad,
    statusLoading,
    roomTypesLoading,
  ]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/admin/rooms/list", {
        params: {
          page: currentPage,
          pageSize: pageSize,
          search: debouncedSearchTerm.trim(),
        },
      });
      const roomsData = response.data;
      // console.log(roomsData);
      const { totalPages, rooms, page } = response.data;

      // console.log(rooms);
      setRooms(rooms || []);
      setTotalPages(totalPages || 0);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("Failed to load rooms. Please try again.");
      setRooms([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleStatusChange = (roomId, newStatus) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              status: newStatus,
              roomStatus: { statusName: newStatus.statusName },
            }
          : room
      )
    );
  };
  // Create a new room via API call
  const handleCreateRoom = async (roomData) => {
    try {
      const response = await api.post("/admin/rooms/create", {
        roomNumber: roomData.roomNumber,
        roomStatusId: Number(roomData.status),
        roomTypeId: Number(roomData.roomTypeId),
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to create room");
      }
      // Switch back to view mode and refresh the rooms list
      setMode("view");
       // Add a small delay to ensure state updates happen in sequence
    setTimeout(async () => {
      await fetchRooms();
      toast.success(`Room ${roomData.roomNumber} created successfully`);
      setLoading(false);
    }, 100);
      return true;
    } catch (error) {
      console.error("Error creating room:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to create room. Please try again."
      );
    }
  };

  const openDeleteDialog = (room) => {
    setRoomToDelete(room);
    setDeleteDialogOpen(true);
    setDeleteError(null);
  };

  const handleDeleteRoom = async () => {
    if (!roomToDelete) return;

    setDeleteLoading(true);
    setDeleteError(null);

    try {
      // Delete room API call
      const response = await api.delete(`/admin/rooms/${roomToDelete.id}`);
      // console.log(response);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to delete room");
      }

      // Close dialog
      setDeleteDialogOpen(false);
      setRoomToDelete(null);
      // Get the current rooms count before refreshing
      const currentRoomsCount = rooms.length;

      // If this is the last room on the page and not on page 1, go back to previous page
      if (currentRoomsCount === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        // Otherwise, just refresh the current page
        await fetchRooms();
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      setDeleteError(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete room. Please try again."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // Focus trap for modal accessibility
  const modalRef = useRef(null);

  useEffect(() => {
    if (deleteDialogOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [deleteDialogOpen]);

  return (
    <AdminLayout title='Room Management'>
      {mode === "view" ? (
        <>
          <div className="flex justify-between items-center mb-6 border-b border-brown-300 px-16 py-4 bg-white">
            <h5 className="text-h5 font-semibold text-gray-900 ">
              Room Management
            </h5>
            <div className="flex items-center gap-4">
              <form className="relative w-[320px] text-gray-900 text-b1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  size={16}
                />
                <Input
                  className="pl-10 pr-10 bg-white placeholder:text-gray-600"
                  placeholder="Search room number..."
                  value={searchTerm}
                  onChange={handleSearch}
                  aria-label="Search rooms"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>

              <Button
                onClick={() => setMode("create")}
                className="btn-primary font-open-sans text-base font-semibold text-util-white"
                disabled={roomTypesLoading || statusLoading}
              >
                {roomTypesLoading || statusLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "+ Create Room"
                )}
              </Button>
            </div>
          </div>

          <Card className="mx-16 p-0 overflow-visible rounded-none">
            <CardContent className="p-0">
              {error && (
                <div className="p-4 text-red-500 text-center bg-red-50">
                  {error}
                </div>
              )}
              <table className="w-full">
                <thead>
                  <tr className="h-[42px]">
                    <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300 pl-4">
                      Room no.
                    </th>
                    <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                      Room type
                    </th>
                    <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                      Bed Type
                    </th>
                    <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                      Status
                    </th>
                    <th className="text-center text-b2 font-medium text-gray-800 bg-gray-300 pr-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-util-black">
                  {loading ? (
                    <>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <tr
                          key={index}
                          className="py-6 h-[60px] border-b border-gray-300"
                        >
                          {Array.from({ length: 5 }).map((_, index, arr) => (
                            <td key={index} className={`${index === 0 ? "pl-4" : ""}`}>
                              <Skeleton className={`h-4 rounded-xl ${index === arr.length - 1 ? "w-6 h-6 rounded-sm ml-12" : "w-20"}`} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ) : !Array.isArray(rooms) || rooms.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6">
                        {searchTerm ? (
                          <>No rooms found matching "{searchTerm}"</>
                        ) : (
                          "No rooms found."
                        )}
                      </td>
                    </tr>
                  ) : (
                    rooms.map((room) => (
                      <tr
                        key={room.id}
                        className="py-6 h-[60px] border-b hover:bg-gray-50"
                      >
                        <td className="pl-4">{room.roomNumber}</td>
                        <td>{room.roomType?.name || "-"}</td>
                        <td>{room.roomType?.bedType?.bedDescription || "-"}</td>
                        <td >
                          <StatusDropdown
                            currentStatus={room.roomStatus.statusName}
                            roomId={room.id}
                            onStatusChange={handleStatusChange}
                            roomStatus={roomStatus}
                          />
                        </td>
                        <td className="text-center pr-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800 hover:bg-red-100 cursor-pointer"
                            onClick={() => openDeleteDialog(room)}
                            aria-label={`Delete room ${room.roomNumber}`}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Improved Delete Confirmation Modal with keyboard navigation */}
          {deleteDialogOpen && (
            <div
              className="fixed inset-0 bg-black/80 bg-opacity-25 flex items-center justify-center z-50"
              role="dialog"
              aria-labelledby="delete-dialog-title"
              aria-describedby="delete-dialog-description"
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
                ref={modalRef}
                tabIndex={-1}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3
                    id="delete-dialog-title"
                    className="text-lg text-black font-medium"
                  >
                    Delete Room
                  </h3>
                  <button
                    onClick={() => setDeleteDialogOpen(false)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label="Close dialog"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div id="delete-dialog-description" className="mb-6 text-black">
                  Are you sure you want to delete room{" "}
                  {roomToDelete?.roomNumber}? This action cannot be undone.
                </div>

                {deleteError && (
                  <div className="mb-4 text-red-500 bg-red-50 p-3 rounded">
                    {deleteError}
                  </div>
                )}

                <div className="flex justify-end gap-4">
                  <Button
                    onClick={() => setDeleteDialogOpen(false)}
                    disabled={deleteLoading}
                    className="btn-primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteRoom}
                    disabled={deleteLoading}
                    className="btn-outline"
                  >
                    {deleteLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {totalPages > 0 && (
            <div className="flex justify-center py-4 mt-8">
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <CreateRoomForm
          onCancel={() => setMode("view")}
          onSubmit={handleCreateRoom}
          roomTypes={roomTypes}
          roomStatus={roomStatus}
        />
      )}
    </AdminLayout>
  );
};

export default RoomManagement;
