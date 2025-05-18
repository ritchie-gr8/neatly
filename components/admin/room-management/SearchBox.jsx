import React, { useState, useRef } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import useClickOutside from "@/hooks/useClickOutside";
// import { Button } from "@/components/ui/button";

const SearchBox = ({
  onFilterChange,
  categories,
  selectedCategory,
  setSelectedCategory,
  onSearchChange,
  searchTerm,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
    setCategorySearchTerm("");
  });

  return (
    <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 bg-brown-200 sm:rounded-2xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div
          className="relative w-full md:max-w-[360px] bg-white rounded-lg 
        h-[48px] flex items-center justify-between border border-brown-300"
        >
          <Input
            placeholder="Search"
            className="font-medium text-b1 !outline-none !border-none focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm ? (
            <X
              size={24}
              strokeWidth={1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-600 cursor-pointer"
              onClick={() => onSearchChange("")}
            />
          ) : (
            <Search
              size={24}
              strokeWidth={1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-600"
            />
          )}
        </div>

        <div className="relative w-full md:w-[360px]" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between p-3 bg-white border border-brown-300 rounded-lg"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            <span className="text-brown-600">
              {selectedCategory?.name || "All Categories"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-brown-600 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div
              className="absolute z-10 w-full mt-1 bg-white border border-brown-300 rounded-lg shadow-lg"
              role="listbox"
            >
              <div className="p-2 border-b">
                <Input
                  placeholder="Search categories..."
                  value={categorySearchTerm}
                  onChange={(e) => setCategorySearchTerm(e.target.value)}
                  className="w-full !outline-none !border-none focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    onFilterChange(null);
                    setIsDropdownOpen(false);
                    setCategorySearchTerm("");
                  }}
                  className={`w-full bg-transparent text-left p-2 hover:bg-brown-200 cursor-pointer ${
                    !selectedCategory ? "!bg-brown-200" : ""
                  }`}
                >
                  All Categories
                </button>
                {filteredCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category);
                      onFilterChange(category.name);
                      setIsDropdownOpen(false);
                      setCategorySearchTerm("");
                    }}
                    className={`w-full text-left p-2 hover:bg-brown-200 cursor-pointer ${
                      selectedCategory?.id === category.id ? "bg-brown-200" : ""
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
