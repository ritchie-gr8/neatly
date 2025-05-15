import { useState, useRef, useEffect, use } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const ROOM_TYPE_OPTIONS = [
  "Superior Garden View",
  "Deluxe",
  "Superior",
  "Supreme",
  "Ocean View",
  "Executive Suite",
  "Family Room",
  "Standard"
];

const RoomTypeForm = ({ className, roomTypes }) => {
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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

  // Filter options based on search value
  const filteredOptions = roomTypes?.filter(
    (option) =>
      !selectedRoomTypes.includes(option.name) &&
      option.name.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const handleRemoveRoomType = (roomType) => {
    setSelectedRoomTypes(selectedRoomTypes.filter((type) => type !== roomType));
  };

  const handleAddRoomType = (roomType) => {
    if (!selectedRoomTypes.includes(roomType)) {
      setSelectedRoomTypes([...selectedRoomTypes, roomType]);
      setSearchValue("");
    }
  };

  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setIsDropdownOpen(true);
  };

  return (
    <div className={className}>
      <Label htmlFor="room-type" className="mb-1">
        Room type
      </Label>
      <div className="relative">
        <div
          className="flex flex-wrap items-center gap-2 p-2 border rounded-md bg-util-white focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
          onClick={handleInputClick}
          ref={inputRef}
        >
          {selectedRoomTypes.map((roomType) => (
            <div
              key={roomType}
              className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded-md"
            >
              {roomType}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveRoomType(roomType);
                }}
                className="flex items-center justify-center w-4 h-4 ml-1 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            className="flex-grow h-8 border-none outline-none bg-transparent"
            placeholder={selectedRoomTypes.length === 0 ? "Select room types..." : ""}
          />
        </div>

        {isDropdownOpen && filteredOptions.length > 0 && (
          <div
            className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
            ref={dropdownRef}
          >
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleAddRoomType(option.name);
                  setIsDropdownOpen(false);
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <Label htmlFor="button-name" className="mt-4 mb-1">
        Button name
      </Label>
      <Input id="button-name" className="bg-util-white" />
    </div>
  );
};

export default RoomTypeForm;
