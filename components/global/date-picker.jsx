"use client";

import React, { forwardRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";


const customStyles = `
  .react-datepicker {
    font-family: Arial, sans-serif;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .react-datepicker__header {
    background-color: white;
    border-bottom: 1px solid #f0f0f0;
    padding-top: 10px;
  }
  
  .react-datepicker__month-container {
    padding: 0 8px 8px;
  }
  
  .react-datepicker__day-name {
    color: #6b7280;
    font-weight: normal;
  }
  
  .react-datepicker__day {
    margin: 0.2rem;
    width: 2rem;
    line-height: 2rem;
    border-radius: 4px;
  }
  
  .react-datepicker__day:hover {
    background-color: transparent;
    color: inherit;
  }

  .react-datepicker__day--selected {
    background-color: #000;
    color: white;
    font-weight: bold;
    border-radius: 4px;
  }
  
  .react-datepicker__day--selected:hover,
  .react-datepicker__day--range-start:hover,
  .react-datepicker__day--range-end:hover {
    background-color: #000000;
    color: white;
  }
  
  .react-datepicker__day--in-range {
    background-color: var(--color-green-500);
    color: white;
  }
  
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background-color: #000;
    color: white;
    font-weight: bold;
    border-radius: 4px;
  }
  
  .react-datepicker__day--keyboard-selected {
    background-color: #000;
    color: white;
  }
  
  .react-datepicker__day--keyboard-selected:hover {
    background-color: #000000;
    color: white;
  }
  
  .react-datepicker__day--outside-month {
    color: #ccc;
  }
  
  .react-datepicker__triangle {
    display: none;
  }
  
  .react-datepicker__current-month {
    font-weight: bold;
    padding-bottom: 8px;
  }
  
  .react-datepicker__navigation {
    top: 12px;
  }
  
  .react-datepicker__month-select,
  .react-datepicker__year-select {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 14px;
  }
  
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker__input-container input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .react-datepicker__day--disabled {
    color: #ccc;
    cursor: not-allowed;
  }
  
  /* Custom datepicker input styling */
  .custom-datepicker-input {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  /* Hover state for calendar icon */
  .calendar-icon {
    cursor: pointer;
  }
  
  .calendar-icon:hover {
    color: #000;
  }
`;

const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-2 mb-2">
      <div className="flex justify-between items-center w-full px-2">
        <div className="w-1/2 pr-1">
          <select
            className="w-full py-2 px-3 border border-gray-300 rounded-md"
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2 pl-1">
          <select
            className="w-full py-2 px-3 border border-gray-300 rounded-md"
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-5">
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          type="button"
          className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {"<"}
        </button>
        <div className="font-medium">
          {months[date.getMonth()]} {date.getFullYear()}
        </div>
        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          type="button"
          className="p-1 text-gray-500 hover:text-gray-800"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

const formatDateToDisplay = (date) => {
  if (!date) return "";

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  const dayOfWeek = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  
  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
};

const CustomDatePickerInput = forwardRef(({ value, onClick, placeholder, onCalendarClick, selectedDate, hasUserSelected }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-10 px-3 flex items-center justify-between rounded-sm border border-gray-300 appearance-none cursor-pointer custom-datepicker-input"
    >
      <span className={`text-sm font-medium ${hasUserSelected ? "text-gray-700" : "text-gray-400"}`}>
        {formatDateToDisplay(selectedDate)}
      </span>
      <FaCalendarAlt 
        className={`calendar-icon ${hasUserSelected ? "text-gray-700" : "text-gray-400"}`}
        onClick={(e) => {
          e.stopPropagation(); 
          onCalendarClick();
        }}
      />
    </div>
  );
});

CustomDatePickerInput.displayName = "CustomDatePickerInput";

const CustomDatePicker = ({
  label,
  selectedDate,
  onChange,
  minDate,
  maxDate,
  startDate,
  endDate,
  selectsStart = false,
  selectsEnd = false,
  placeholder = "Select date",
  defaultSelected = false,
  ...additionalProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [hasUserSelected, setHasUserSelected] = useState(defaultSelected);
  
  const handleCalendarToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleDateChange = (date) => {
    setHasUserSelected(true); 
    onChange(date); 
  };
  
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-gray-900 mb-2">
          {label}
        </label>
      )}
      
      <style>{customStyles}</style>
      
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
        startDate={startDate}
        endDate={endDate}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        renderCustomHeader={CustomHeader}
        dateFormat="MMMM do, yyyy" 
        placeholderText={placeholder}
        showPopperArrow={false}
        popperClassName="custom-popper z-50"
        customInput={
          <CustomDatePickerInput 
            placeholder={placeholder}
            onCalendarClick={handleCalendarToggle}
            selectedDate={selectedDate} 
            hasUserSelected={hasUserSelected} 
          />
        }
        open={isOpen} 
        onInputClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClickOutside={() => {
        }}
        shouldCloseOnSelect={false} 
        {...additionalProps}
      />
    </div>
  );
};

export default CustomDatePicker;