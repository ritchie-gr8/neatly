import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomDatePicker from "@/components/global/date-picker";
import useInViewFetch from "@/hooks/useInViewFetch";
import Loading from "@/components/global/loading";
import api from "@/lib/axios";
import dayjs from "dayjs";

const today = new Date();
const currentYear = today.getFullYear();
const lastYear = currentYear - 1;
const minDate = new Date(lastYear, 0, 1);
const janThisYear = new Date(today.getFullYear(), 0, 1);

const OccupancyAndGuest = () => {
  const [startDate, setStartDate] = useState(janThisYear);
  const [endDate, setEndDate] = useState(today);
  const [rawData, setRawData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewBy, setViewBy] = useState("overall");
  const [viewByApplied, setViewByApplied] = useState("overall");
  const [guestVisit, setGuestVisit] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);

  const handleStartDate = (date) => {
    setStartDate(date);

    if (date >= endDate) {
      setEndDate(date);
    }
  };

  const handleEndDate = (date) => {
    setEndDate(date);

    if (date <= startDate) {
      setStartDate(date);
    }
  };

  const handleSearch = () => {
    setViewByApplied(viewBy);
    fetchData();
  };

  const handleViewby = (view) => {
    setViewBy(view);
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/analytics/occupancy-and-guest", {
        params: { startDate, endDate, viewBy },
      });
      const { monthlyData, aggregatedGuest, aggregatedPayment } = response.data;
   
      const isLongRange = monthlyData.length >= 12;
      let flattened;

      if (viewBy === "overall") {
        // Use bookingRaw and bookingPercent directly
        flattened = monthlyData.map((item) => {
          const month = isLongRange
          ? item.month.slice(0, 3) // "January" → "Jan"
          : item.month;
    
        return {
          month,
          booking: item.bookingRaw,
          bookingPercent: item.bookingPercent,
        };
        });
      } else if (viewBy === "roomtypes") {
        // For each month, flatten the roomTypeRaw and roomTypePercent into keys like DeluxeRaw, DeluxePercent
        flattened = monthlyData.map((item) => {
          const flatData = { month: isLongRange
            ? item.month.slice(0, 3) // "January" → "Jan"
            : item.month };

          // Flatten roomTypeRaw: { Deluxe: 5 } => DeluxeRaw: 5
          for (const [roomType, rawValue] of Object.entries(
            item.roomTypeRaw || {}
          )) {
            flatData[`${roomType}Raw`] = rawValue;
          }

          // Flatten roomTypePercent: { Deluxe: 100 } => DeluxePercent: 100
          for (const [roomType, percentValue] of Object.entries(
            item.roomTypePercent || {}
          )) {
            flatData[`${roomType}`] = percentValue;
          }

          return flatData;
        });
      } else {
        // fallback to empty array if needed
        flattened = [];
      }


      setProcessedData(flattened);
      setRawData(monthlyData);
      setGuestVisit(aggregatedGuest);
      setPaymentMethod(aggregatedPayment);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate, viewBy]);

  const ref = useInViewFetch(fetchData);

  const containerWidth = 60;
  const categoriesCount = processedData.length;
  const maxBarSize = 12;
  const minBarSize = 6;

  const calculatedBarSize = containerWidth / categoriesCount;

  const dynamicBarSize = Math.max(
    minBarSize,
    Math.min(maxBarSize, calculatedBarSize)
  );

  return (
    <div
      ref={ref}
      className="bg-white rounded-lg shadow w-full pl-10 pr-10 pb-12 pt-4"
    >
      {/* ----------------------------- Header -----------------------------*/}
      <div className="flex justify-between items-center mb-6">
        <p className="text-h5 font-semibold text-gray-600">Occupancy & Guest</p>
        <div className="flex items-center gap-4 text-md text-gray-600">
          <p>View by</p>
          <div className="w-40">
            <Select
              value={viewBy}
              onValueChange={handleViewby}
              defaultValue="overall"
              disabled={isLoading}
            >
              <SelectTrigger className="bg-util-white cursor-pointer text-black py-[22px]">
                {isLoading ? (
                  <span className="text-muted-foreground">Loading...</span>
                ) : (
                  <SelectValue placeholder="View by" />
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">Overall</SelectItem>
                <SelectItem value="roomtypes">Room types</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* <p>From</p> */}
          <div className="translate-y-3 flex-1 w-45 text-black">
            <CustomDatePicker
              value={startDate}
              defaultValue={janThisYear}
              onDateChange={handleStartDate}
              minYear={lastYear}
              maxYear={currentYear}
              disabledDate={(date) => date > today || date < minDate}
              disabled={isLoading}
            />
          </div>
          <p>to</p>
          <div className="translate-y-3 flex-1 w-45 text-black">
            <CustomDatePicker
              value={endDate}
              defaultValue={endDate}
              onDateChange={handleEndDate}
              minYear={lastYear}
              maxYear={currentYear}
              disabledDate={(date) => date > today || date < minDate}
              disabled={isLoading}
            />
          </div>
          <button
            className={cn(
              "text-white px-8 py-3 bg-orange-600  rounded-lg cursor-pointer shadow-xs",
              !isLoading && "hover:bg-orange-400",
              isLoading && "cursor-not-allowed opacity-50"
            )}
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      {/* ----------------------------- Upper Box -----------------------------*/}
      <div className="flex justify-between pb-6">
        <p className="font-semibold text-gray-700">Occupancy Rate</p>
        {viewByApplied === "roomtypes" && (
          <div className="flex gap-6 text-gray-700">
            <div className="flex items-center font-semibold  gap-2">
              <span className="bg-orange-500 w-4 h-4 rounded-full"></span>
              Superior Garden View
            </div>
            <div className="flex items-center font-semibold gap-2">
              <span className="bg-green-700 w-4 h-4 rounded-full"></span>
              Deluxe
            </div>
            <div className="flex items-center font-semibold gap-2">
              <span className="bg-[#E5A5A5] w-4 h-4 rounded-full"></span>
              Superior
            </div>
            <div className="flex items-center font-semibold gap-2">
              <span className="bg-[#F5DA81] w-4 h-4 rounded-full"></span>
              Supreme
            </div>
            <div className="flex items-center font-semibold gap-2">
              <span className="bg-[#60A5FA] w-4 h-4 rounded-full"></span>
              Premier Sea View
            </div>
            <div className="flex items-center font-semibold gap-2">
              <span className="bg-[#A78BFA] w-4 h-4 rounded-full"></span>
              Suit
            </div>
          </div>
        )}
      </div>
      <div className="h-[300px] relative overflow-visible">
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white z-10">
            <Loading />
          </div>
        )}
        {viewByApplied === "overall" ? (
          // ----------------------------- Overall Chart -----------------------------
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={processedData}
              margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC632A" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EC632A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                horizontal={true}
                strokeDasharray="1 1"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={({ x, y, payload, index }) => {
                  const total = processedData.length;
                  let textAnchor = "middle";
                  let xPosition = x;

                  if (index === 0) {
                    textAnchor = "start";
                  } else if (index === total - 1) {
                    textAnchor = "end";
                    xPosition = x + 12;
                  }

                  const fontSize = total <= 4 ? 16 : total <= 6 ? 14 : 12;

                  return (
                    <text
                      x={xPosition}
                      y={y + 18}
                      textAnchor={textAnchor}
                      dominantBaseline="middle"
                      fontSize={fontSize}
                      fill="#6B7280"
                    >
                      {payload.value}
                    </text>
                  );
                }}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ dx: -50, textAnchor: "start" }}
                width={40}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ stroke: "#EC632A", strokeWidth: 1 }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-gray-200 rounded shadow p-2 text-sm text-gray-800">
                        <p className="font-bold">{label}</p>
                        <p>Occupancy: {payload[0].payload.booking}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="bookingPercent"
                stroke="#EC632A"
                strokeWidth={3}
                fill="url(#colorRevenue)"
                fillOpacity={1}
                dot={{ r: 5, strokeWidth: 2, fill: "#fff", stroke: "#EC632A" }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          //----------------------------- Roomtypes Chart -----------------------------
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processedData}>
              <CartesianGrid
                vertical={false}
                horizontal={true}
                strokeDasharray="1 1"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={({ x, y, payload, index }) => {
                  const total = processedData.length;
                  let textAnchor = "middle";
                  let xPosition = x;

                  if (index === 0) {
                    textAnchor = "start";
                  } else if (index === total - 1) {
                    textAnchor = "end";
                    xPosition = x + 12;
                  }

                  const fontSize = total <= 4 ? 16 : total <= 6 ? 14 : 12;

                  return (
                    <text
                      x={xPosition}
                      y={y + 18}
                      textAnchor={textAnchor}
                      dominantBaseline="middle"
                      fontSize={fontSize}
                      fill="#6B7280"
                    >
                      {payload.value}
                    </text>
                  );
                }}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ dx: -55, textAnchor: "start" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-gray-200 rounded shadow p-2 text-sm text-gray-800">
                        <p className="font-bold">{label}</p>
                        {payload.map((entry, index) => {
                          const roomType = entry.name;
                          const raw = entry.payload[`${roomType}Raw`] ?? 0;

                          return (
                            <div
                              key={index}
                              className="flex justify-between gap-2"
                            >
                              <span>{roomType}:</span>
                              <span>{raw}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Bar
                dataKey="Superior Garden View"
                fill="#F97316"
                barSize={dynamicBarSize}
                radius={[8, 8, 8, 8]}
              />
              <Bar
                dataKey="Deluxe"
                fill="#465C50"
                barSize={dynamicBarSize}
                radius={[8, 8, 8, 8]}
              />
              <Bar
                dataKey="Superior"
                fill="#E5A5A5"
                barSize={dynamicBarSize}
                radius={[8, 8, 8, 8]}
              />
              <Bar
                dataKey="Supreme"
                fill="#F5DA81"
                barSize={dynamicBarSize}
                radius={[8, 8, 8, 8]}
              />
              <Bar
                dataKey="Premier Sea View"
                fill="#60A5FA"
                barSize={dynamicBarSize}
                radius={[8, 8, 8, 8]}
              />
              <Bar
                dataKey="Suit"
                fill="#A78BFA"
                barSize={dynamicBarSize}
                radius={[8, 8, 8, 8]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ----------------------------- Lower Box -----------------------------*/}
      <div className="flex flex-row w-full items-center gap-12 pt-8 pb-4">
        {/* Guest Visit */}
        <div className="flex flex-col w-[50%] gap-9">
          <p className="font-semibold text-gray-700 translate-y-4">
            Guest Visit
          </p>
          {isLoading
            ? // Skeletons for Guest Visit
              Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 animate-pulse"
                >
                  <div className="flex flex-col w-full gap-1">
                    <div className="h-4 w-1/4 bg-gray-300 rounded-full" />
                    <div className="h-3 w-full bg-gray-300 rounded-full" />
                  </div>
                </div>
              ))
            : guestVisit.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-full">
                    <ResponsiveContainer width="98%" height={24}>
                      <div className="text-black font-semibold">
                        {item.type}
                        <span className="text-gray-700 font-normal pl-2">
                          {item.count}
                        </span>
                        <span className="text-gray-700 font-normal pl-2">
                          people
                        </span>
                      </div>
                      <BarChart
                        data={[item]}
                        layout="vertical"
                        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      >
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis type="category" dataKey="type" hide />
                        <Bar
                          dataKey="percent"
                          barSize={12}
                          radius={[8, 8, 8, 8]}
                          background={{ fill: "#D1D5DB", radius: 8 }}
                          fill="#F97316"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div
                    className={cn(
                      "font-bold text-black translate-y-6 -translate-x-4",
                      item.percent < 10 && "pr-2",
                      item.percent === 0 && "pr-4"
                    )}
                  >
                    {item.percent}%
                  </div>
                </div>
              ))}
        </div>

        {/* Payment Method */}
        <div className="flex flex-col w-[50%] gap-9">
          <p className="font-semibold text-gray-700 translate-y-4">
            Payment Method
          </p>
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 animate-pulse"
                >
                  <div className="flex flex-col w-full gap-1">
                    <div className="h-4 w-1/4 bg-gray-300 rounded-full" />
                    <div className="h-3 w-full bg-gray-300 rounded-full" />
                  </div>
                </div>
              ))
            : paymentMethod.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-full ">
                    <ResponsiveContainer width="98%" height={24}>
                      <div className="text-black font-semibold">
                        {item.type}
                        <span className="text-gray-700 font-normal pl-2">
                          {item.count}
                        </span>
                        <span className="text-gray-700 font-normal pl-2">
                          people
                        </span>
                      </div>
                      <BarChart
                        data={[item]}
                        layout="vertical"
                        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      >
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis type="category" dataKey="type" hide />
                        <Bar
                          dataKey="percent"
                          barSize={12}
                          radius={[8, 8, 8, 8]}
                          background={{ fill: "#D1D5DB", radius: 8 }}
                          fill="#F97316"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div
                    className={cn(
                      "font-bold text-black translate-y-6 -translate-x-4",
                      item.percent < 10 && "pr-2",
                      item.percent === 0 && "pr-4"
                    )}
                  >
                    {item.percent}%
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default OccupancyAndGuest;
