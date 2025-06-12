import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatbotResponse } from "@/hooks/useChatbotResponse";

const RoomTypeForm = ({
  className,
  roomTypes = [],
  mode,
}) => {
  const { formData, errors, clearError, updateFormData, isLoading} = useChatbotResponse();

  const getInitialSelectedRoomTypes = () => {
    if (!formData || !formData.roomTypes) return [];
    return formData.roomTypes
      .map((rt) => {
        const roomType = roomTypes.find((r) => r.id === rt.roomTypeId);
        return roomType
      })
  };

  const [selectedRoomTypes, setSelectedRoomTypes] = useState(
    getInitialSelectedRoomTypes() || []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangeRoomTypeIds = (roomType) => {
    if (!formData.roomTypes) {
      updateFormData({ roomTypes: [roomType] });
    } else {
      updateFormData({ roomTypes: [...formData.roomTypes, roomType] });
    }

    if (!selectedRoomTypes.includes(roomType.name)) {
      setSelectedRoomTypes([...selectedRoomTypes, roomType]);
      setSearchValue("");
    }
    if (errors.roomTypes) clearError("roomTypes");
  };

  const filteredOptions =
    roomTypes?.filter(
      (option) =>
        !selectedRoomTypes.some(selected => selected?.id === option.id) &&
        option.name.toLowerCase().includes(searchValue.toLowerCase())
    ) || [];

  const handleRemoveRoomType = (roomType) => {
    const newSelectedRoomTypes = selectedRoomTypes.filter((type) => type.id !== roomType?.id);
    setSelectedRoomTypes(newSelectedRoomTypes);
    updateFormData({ roomTypes: newSelectedRoomTypes });
  };

  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    const selected = getInitialSelectedRoomTypes();
    setSelectedRoomTypes(selected);
  }, [roomTypes]);

  useEffect(() => {
    if (formData?.roomTypes?.length !== selectedRoomTypes?.length) {
      const selected = getInitialSelectedRoomTypes();
      setSelectedRoomTypes(selected);
    }
  }, [formData]);

  return (
    <div className={className}>
      <Label htmlFor="reply-title" className="mb-1 require-label">
        Reply title
      </Label>
      <Input
        id="reply-title"
        className={cn(
          "bg-util-white h-9 placeholder:text-b2",
          errors?.replyTitle && "border-red-500"
        )}
        value={formData.replyTitle}
        onChange={(e) => {
          updateFormData({ replyTitle: e.target.value });
          if (errors?.replyTitle) clearError("replyTitle");
        }}
        disabled={isLoading || mode === "view"}
        placeholder="e.g., Our Room Types, Available Accommodations"
      />
      {errors?.replyTitle && (
        <p className="text-red-500 text-xs mt-1">{errors.replyTitle}</p>
      )}

      <Label htmlFor="room-type" className="mt-4 mb-1 require-label">
        Room type
      </Label>
      <div className={cn("relative", mode === "view" && "pointer-events-none opacity-80")}>
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 border rounded-md bg-util-white px-3",
            errors?.roomTypes && "border-red-500",
            mode === "view" && "pointer-events-none opacity-80",
            selectedRoomTypes.length === 0 && "h-9",
            selectedRoomTypes.length > 0 && "h-fit py-2"
          )}
          onClick={mode !== "view" ? handleInputClick : undefined}
          ref={inputRef}
          disabled={isLoading}
        >
          { selectedRoomTypes?.length > 0 && selectedRoomTypes.map((roomType, index) => (
            <div
              key={roomType?.id || `${roomType?.name}-${index}`}
              className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded-md"
            >
              {roomType?.name}
              {mode !== "view" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveRoomType(roomType);
                  }}
                  disabled={isLoading}
                  className="flex items-center justify-center w-4 h-4 ml-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
          {mode !== "view" && (
            <input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              className="flex-grow h-full text-b2 border-none outline-none bg-transparent"
              placeholder={
                selectedRoomTypes.length === 0 ? "Select room types..." : ""
              }
              disabled={isLoading || mode === "view"}
            />
          )}
        </div>

        {isDropdownOpen && filteredOptions.length > 0 && mode !== "view" && (
          <div
            className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto text-b2"
            ref={dropdownRef}
          >
            {filteredOptions.map((option, index) => (
              <div
                key={option.id || `${option.name}-${index}`}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleChangeRoomTypeIds(option);
                  setIsDropdownOpen(false);
                }}
                disabled={isLoading}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {errors?.roomTypes && (
        <p className="text-red-500 text-xs mt-1">{errors.roomTypes}</p>
      )}

      <Label htmlFor="button-name" className="mt-4 mb-1 require-label">
        Button name
      </Label>
      <Input
        id="button-name"
        className={cn(
          "bg-util-white h-9 placeholder:text-b2",
          errors?.buttonName && "border-red-500"
        )}
        value={formData.buttonName}
        onChange={(e) => {
          updateFormData({ buttonName: e.target.value });
          if (errors?.buttonName) clearError("buttonName");
        }}
        disabled={isLoading || mode === "view"}
        placeholder="e.g., View Rooms, Book Now"
      />
      {errors?.buttonName && (
        <p className="text-red-500 text-xs mt-1">{errors.buttonName}</p>
      )}
    </div>
  );
};

export default RoomTypeForm;
