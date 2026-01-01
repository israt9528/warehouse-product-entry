import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch, IoIosArrowDown, IoIosAddCircle } from "react-icons/io";

const DropdownWithSearch = ({
  label,
  options,
  selectedValue,
  onSelect,
  onAddNew,
  placeholder = "Select or search...",
  isRequired = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // Filter options based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="label text-black font-medium text-lg mb-2">
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {/* Selected value display */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 flex items-center justify-between hover:border-gray-400"
        >
          <span
            className={`truncate ${
              !selectedValue ? "text-gray-400" : "text-gray-800"
            }`}
          >
            {selectedValue || placeholder}
          </span>
          <IoIosArrowDown
            className={`h-5 w-5 text-purple-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Add new button */}
        <button
          type="button"
          onClick={onAddNew}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-blue-400 hover:text-purple-500 transition-colors duration-200"
          title={`Add new ${label.toLowerCase()}`}
        >
          <IoIosAddCircle size={24} />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fade-in">
            {/* Search input */}
            <div className="px-3 py-2 border-b border-gray-100">
              <div className="relative">
                <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            {/* Options list */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors duration-150 flex items-center justify-between ${
                      selectedValue === option
                        ? "bg-purple-50 text-purple-600"
                        : "text-gray-700"
                    }`}
                  >
                    <span>{option}</span>
                    {selectedValue === option && (
                      <span className="h-2 w-2 bg-purple-500 rounded-full"></span>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-center">
                  No options found
                  {searchTerm && (
                    <div className="mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          onAddNew(searchTerm);
                          setIsOpen(false);
                        }}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Add "{searchTerm}" as new {label.toLowerCase()}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Add new option at the bottom */}
            <div className="border-t border-gray-100 px-3 py-2">
              <button
                type="button"
                onClick={() => {
                  onAddNew(searchTerm || "");
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all duration-200 font-medium"
              >
                <IoIosAddCircle className="h-4 w-4" />
                Add New {label}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownWithSearch;
