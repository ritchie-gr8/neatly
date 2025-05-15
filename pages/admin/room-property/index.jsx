import React, { useEffect, useState } from "react";
import AdminLayout from "@/layouts/admin.layout";
import api from "@/lib/axios";
import ViewMode from "@/components/admin/room-property/view-mode";
import EditorMode from "@/components/admin/room-property/editor-mode";
import { useDebouce } from "@/hooks/useDebounce";

const RoomPropertyPage = () => {
  const [loading, setLoading] = useState(true);
  const [roomTypes, setRoomTypes] = useState({
    items: [],
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState(null);
  const [mode, setMode] = useState("view");
  const [lastAction, setLastAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouce(searchTerm, 500);

  const fetchRoomTypes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/admin/room-type/list?page=${currentPage}${debouncedSearchTerm ? `&search=${encodeURIComponent(debouncedSearchTerm)}` : ''}`
      );
      setRoomTypes(data?.data);
    } catch (error) {
      console.error("Error fetching room types:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, [currentPage, debouncedSearchTerm]);

  useEffect(() => {
    if (lastAction) {
      fetchRoomTypes();
      setLastAction(null);
    }
  }, [lastAction]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectRoomType = (roomTypeId) => {
    setSelectedRoomTypeId(roomTypeId);
    setMode("edit");
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <AdminLayout>
      {mode === "view" && (
        <ViewMode
          setMode={setMode}
          roomTypes={roomTypes}
          loading={loading}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          handleSelectRoomType={handleSelectRoomType}
          setLastAction={setLastAction}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
      )}
      {mode === "create" && (
        <EditorMode setMode={setMode} setLastAction={setLastAction} />
      )}
      {mode === "edit" && (
        <EditorMode
          setMode={setMode}
          selectedRoomTypeId={selectedRoomTypeId}
          setLastAction={setLastAction}
        />
      )}
    </AdminLayout>
  );
};

export default RoomPropertyPage;
