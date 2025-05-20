import { useState } from "react";
import { format } from "date-fns";
import { IoCalendarOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const generateYearOptions = (
  currentYear,
  yearsBack = 10,
  yearsForward = 10
) => {
  const years = [];
  for (let i = currentYear - yearsBack; i <= currentYear + yearsForward; i++) {
    years.push(i);
  }
  return years;
};

const generateMonthOptions = () => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(2000, i, 1);
    months.push({
      value: i,
      label: format(date, "MMMM"),
    });
  }
  return months;
};

const generateYearOptionsWithMinAndMax = (minYear, maxYear) => {
  if (!minYear || !maxYear) {
    return null;
  }
  const years = [];
  for (let i = minYear; i <= maxYear; i++) {
    years.push(i);
  }
  return years;
};

const CustomCalendarHeader = ({
  currentMonth,
  currentYear,
  onMonthChange,
  onYearChange,
  minYear,
  maxYear,
}) => {
  let years;
  if (minYear && maxYear) {
    years = generateYearOptionsWithMinAndMax(minYear, maxYear);
  } else {
    years = generateYearOptions(new Date().getFullYear());
  }
  const months = generateMonthOptions();

  return (
    <div className="flex justify-between items-center p-3 gap-3 border-b border-gray-200 cursor-pointer">
      <Select
        value={currentMonth.toString()}
        onValueChange={(value) => onMonthChange(parseInt(value))}
      >
        <SelectTrigger className="w-[120px] bg-white cursor-pointer">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value.toString()}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentYear.toString()}
        onValueChange={(value) => onYearChange(parseInt(value))}
      >
        <SelectTrigger className="w-[80px] bg-white cursor-pointer">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const CustomDatePicker = ({
  title,
  defaultValue,
  value,
  className,
  disabledDate = null,
  minYear = null,
  maxYear = null,
  onDateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    defaultValue ? defaultValue.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    defaultValue ? defaultValue.getFullYear() : new Date().getFullYear()
  );

  const handleDateSelect = (selectedDate) => {
    setIsOpen(false);
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
    onDateChange(selectedDate);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  const handleYearChange = (year) => {
    setCurrentYear(year);
  };

  console.log("value", value);
  console.log("defaultValue", defaultValue);

  return (
    <form className="flex flex-col justify-between">
      <label>{title}</label>

      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger className="flex">
          <div
            role="button"
            tabIndex={0}
            variant="outline"
            className={cn(
              "py-3 pl-3 pr-4 mb-6 w-full cursor-pointer bg-white justify-between flex items-center",
              "text-black",
              className,
              "flex-1 text-b2 border border-input shadow-xs rounded-md"
            )}
          >
            {value && format(value, "EEE, dd MMM yyyy")}
            {!value && (
              <span className="text-gray-600">Select your date of birth</span>
            )}
            <IoCalendarOutline className=" text-gray-600 text-xl" />
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 md:max-w-[240px] flex flex-col items-center"
          align="end"
          side="bottom"
          sideOffset={8}
        >
          <CustomCalendarHeader
            currentMonth={currentMonth}
            currentYear={currentYear}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
            minYear={minYear}
            maxYear={maxYear}
          />
          <Calendar
            mode="single"
            onSelect={handleDateSelect}
            disabled={(date) =>
              disabledDate
                ? disabledDate(date)
                : date < new Date().setHours(0, 0, 0, 0)
            }
            month={new Date(currentYear, currentMonth)}
            onMonthChange={(month) => {
              setCurrentMonth(month.getMonth());
              setCurrentYear(month.getFullYear());
            }}
          />
        </PopoverContent>
      </Popover>
    </form>
  );
};

export default CustomDatePicker;
