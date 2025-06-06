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

const data = [
  {
    month: "January",
    booking: 52,
    date: new Date("2024-01-01"),
    guestRaw: [
      { type: "New guests", count: 34 },
      { type: "Returning guests", count: 18 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 40 },
      { type: "Cash", count: 12 },
    ],
  },
  {
    month: "February",
    booking: 43,
    date: new Date("2024-02-01"),
    guestRaw: [
      { type: "New guests", count: 20 },
      { type: "Returning guests", count: 23 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 28 },
      { type: "Cash", count: 15 },
    ],
  },
  {
    month: "March",
    booking: 61,
    date: new Date("2024-03-01"),
    guestRaw: [
      { type: "New guests", count: 44 },
      { type: "Returning guests", count: 17 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 35 },
      { type: "Cash", count: 26 },
    ],
  },
  {
    month: "April",
    booking: 74,
    date: new Date("2024-04-01"),
    guestRaw: [
      { type: "New guests", count: 55 },
      { type: "Returning guests", count: 19 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 47 },
      { type: "Cash", count: 27 },
    ],
  },
  {
    month: "May",
    booking: 24,
    date: new Date("2024-05-01"),
    guestRaw: [
      { type: "New guests", count: 10 },
      { type: "Returning guests", count: 14 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 16 },
      { type: "Cash", count: 8 },
    ],
  },
  {
    month: "June",
    booking: 80,
    date: new Date("2024-06-01"),
    guestRaw: [
      { type: "New guests", count: 60 },
      { type: "Returning guests", count: 20 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 51 },
      { type: "Cash", count: 29 },
    ],
  },
  {
    month: "July",
    booking: 85,
    date: new Date("2024-07-01"),
    guestRaw: [
      { type: "New guests", count: 66 },
      { type: "Returning guests", count: 19 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 61 },
      { type: "Cash", count: 24 },
    ],
  },
  {
    month: "August",
    booking: 90,
    date: new Date("2024-08-01"),
    guestRaw: [
      { type: "New guests", count: 55 },
      { type: "Returning guests", count: 35 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 72 },
      { type: "Cash", count: 18 },
    ],
  },
  {
    month: "September",
    booking: 83,
    date: new Date("2024-09-01"),
    guestRaw: [
      { type: "New guests", count: 51 },
      { type: "Returning guests", count: 32 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 48 },
      { type: "Cash", count: 35 },
    ],
  },
  {
    month: "October",
    booking: 110,
    date: new Date("2024-10-01"),
    guestRaw: [
      { type: "New guests", count: 70 },
      { type: "Returning guests", count: 40 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 90 },
      { type: "Cash", count: 20 },
    ],
  },
  {
    month: "November",
    booking: 75,
    date: new Date("2024-11-01"),
    guestRaw: [
      { type: "New guests", count: 30 },
      { type: "Returning guests", count: 45 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 42 },
      { type: "Cash", count: 33 },
    ],
  },
  {
    month: "December",
    booking: 95,
    date: new Date("2024-12-01"),
    guestRaw: [
      { type: "New guests", count: 60 },
      { type: "Returning guests", count: 35 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 70 },
      { type: "Cash", count: 25 },
    ],
  },
  {
    month: "January",
    booking: 65,
    date: new Date("2025-01-01"),
    guestRaw: [
      { type: "New guests", count: 36 },
      { type: "Returning guests", count: 29 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 54 },
      { type: "Cash", count: 11 },
    ],
  },
  {
    month: "February",
    booking: 30,
    date: new Date("2025-02-01"),
    guestRaw: [
      { type: "New guests", count: 18 },
      { type: "Returning guests", count: 12 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 20 },
      { type: "Cash", count: 10 },
    ],
  },
  {
    month: "March",
    booking: 88,
    date: new Date("2025-03-01"),
    guestRaw: [
      { type: "New guests", count: 58 },
      { type: "Returning guests", count: 30 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 66 },
      { type: "Cash", count: 22 },
    ],
  },
  {
    month: "April",
    booking: 105,
    date: new Date("2025-04-01"),
    guestRaw: [
      { type: "New guests", count: 70 },
      { type: "Returning guests", count: 35 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 85 },
      { type: "Cash", count: 20 },
    ],
  },
  {
    month: "May",
    booking: 47,
    date: new Date("2025-05-01"),
    guestRaw: [
      { type: "New guests", count: 21 },
      { type: "Returning guests", count: 26 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 35 },
      { type: "Cash", count: 12 },
    ],
  },
  {
    month: "June",
    booking: 8,
    date: new Date("2025-06-01"),
    guestRaw: [
      { type: "New guests", count: 5 },
      { type: "Returning guests", count: 3 },
    ],
    paymentRaw: [
      { type: "Credit card", count: 6 },
      { type: "Cash", count: 2 },
    ],
  },
];

const groupedData = [
  {
    date: "January",
    "Superior Garden View": 85,
    Deluxe: 40,
    Superior: 20,
    Supreme: 50,
  },
  {
    date: "February",
    "Superior Garden View": 35,
    Deluxe: 45,
    Superior: 25,
    Supreme: 30,
  },
  {
    date: "March",
    "Superior Garden View": 20,
    Deluxe: 45,
    Superior: 50,
    Supreme: 50,
  },
  {
    date: "April",
    "Superior Garden View": 100,
    Deluxe: 70,
    Superior: 75,
    Supreme: 50,
  },
  {
    date: "May",
    "Superior Garden View": 75,
    Deluxe: 85,
    Superior: 80,
    Supreme: 85,
  },
  {
    date: "June",
    "Superior Garden View": 30,
    Deluxe: 60,
    Superior: 55,
    Supreme: 35,
  },
];

const transformToPercent = (data) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  const rawPercents = data.map((item) => (item.count / total) * 100);
  const flooredPercents = rawPercents.map((p) => Math.floor(p));
  const flooredSum = flooredPercents.reduce((sum, p) => sum + p, 0);
  let diff = 100 - flooredSum;
  const decimals = rawPercents.map((p, i) => p - flooredPercents[i]);

  while (diff > 0) {
    const maxIndex = decimals.indexOf(Math.max(...decimals));
    flooredPercents[maxIndex] += 1;
    decimals[maxIndex] = 0;
    diff--;
  }
  return data.map((item, i) => ({
    ...item,
    percent: flooredPercents[i],
  }));
};

const today = new Date();
const currentYear = today.getFullYear();
const lastYear = currentYear - 1;
const minDate = new Date(lastYear, 0, 1);
const janThisYear = new Date(today.getFullYear(), 0, 1);

const OccupancyAndGuest = () => {
  const [startDate, setStartDate] = useState(janThisYear);
  const [endDate, setEndDate] = useState(today);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewBy, setViewBy] = useState("overall");
  const [guestVisit, setGuestVisit] = useState(
    transformToPercent(data[0].guestRaw)
  );
  const [paymentMethod, setPaymentMethod] = useState(
    transformToPercent(data[0].paymentRaw)
  );

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
    fetchData();
  };

  const handleViewby = (view) => {
    setViewBy(view);
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const filtered = data
        .filter((item) => item.date >= startDate && item.date <= endDate)
        .map((item) => ({
          ...item,
          label: `${item.date.toLocaleString("default", {
            month: "short",
          })}${item.date.getFullYear().toString().slice(-2)}`,
        }));
      const maxBooking = Math.max(...filtered.map((item) => item.booking), 1);
      const normalizedData = filtered.map((item) => ({
        ...item,
        bookingPercentage: (item.booking / maxBooking) * 100,
      }));

      setFilteredData(normalizedData);

      const aggregateCounts = (arrays) => {
        const map = new Map();
        arrays.forEach((arr) => {
          arr.forEach(({ type, count }) => {
            map.set(type, (map.get(type) || 0) + count);
          });
        });
        return Array.from(map.entries()).map(([type, count]) => ({
          type,
          count,
        }));
      };

      const aggregatedGuestRaw = aggregateCounts(
        filtered.map((item) => item.guestRaw)
      );
      const aggregatedPaymentRaw = aggregateCounts(
        filtered.map((item) => item.paymentRaw)
      );

      setGuestVisit(transformToPercent(aggregatedGuestRaw));
      setPaymentMethod(transformToPercent(aggregatedPaymentRaw));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate]);

  const ref = useInViewFetch(fetchData);

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
          <p>From</p>
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
        {viewBy === "roomtypes" && (
          <div className="flex gap-6 text-gray-700">
            <div className="flex items-center font-semibold  gap-2">
              <span className="bg-orange-500 w-4 h-4 rounded-full"></span>
              Superior Garden View
            </div>
            <div className="flex items-center font-semibold gap-2">
              <span className="bg-green-700 w-4 h-4 rounded-full"></span>
              Deluxe</div>
            <div className="flex items-center font-semibold gap-2">
              <span className="bg-[#E5A5A5] w-4 h-4 rounded-full"></span>
              Superior</div>
            <div className="flex items-center font-semibold gap-2">
              <span className="bg-[#F5DA81] w-4 h-4 rounded-full"></span>
              Supreme</div>
          </div>
        )}
      </div>
      <div className="h-[300px] relative overflow-visible">
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white z-10">
            <Loading />
          </div>
        )}
        {viewBy === "overall" ? (
          // ----------------------------- Overall Chart -----------------------------
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={filteredData}
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
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={({ x, y, payload, index }) => {
                  const total = filteredData.length;
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
                        <p>{label}</p>
                        <p>Booking: {payload[0].payload.booking}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="bookingPercentage"
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
            <BarChart data={groupedData}>
              <CartesianGrid
                vertical={false}
                horizontal={true}
                strokeDasharray="1 1"
              />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ dy: 12 }}/>
              <YAxis
                tickFormatter={(value) => `${value}%`}
                tick={{ dx: -55, textAnchor: "start" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />

              <Bar
                dataKey="Superior Garden View"
                fill="#F97316"
                barSize={12}
                radius={[8, 8, 8, 8]}
              />
              <Bar
                dataKey="Deluxe"
                fill="#465C50"
                barSize={12}
                radius={[8, 8, 8, 8]}
              />
              <Bar
                dataKey="Superior"
                fill="#E5A5A5"
                barSize={12}
                radius={[8, 8, 8, 8]}
              />
              <Bar
                dataKey="Supreme"
                fill="#F5DA81"
                barSize={12}
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
                  <div className="font-bold text-black translate-y-6 -translate-x-4">
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
                  <div className="font-bold text-black translate-y-6 -translate-x-4">
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
