import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

const RevenueTrend = () => {
  const [startDate, setStartDate] = useState(janThisYear);
  const [endDate, setEndDate] = useState(today);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/analytics/revenue-trend", {
        params: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
      });

      const filteredData = response.data.result.map((item) => {
        // parse '2025-06' as a date
        const date = dayjs(item.month, 'YYYY-MM');
        // format as 'MMMMYY' e.g. 'June25'
        const label = date.format('MMMMYY');
        return {
          ...item,
          label,
        };
      });
      setFilteredData(filteredData);
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
      <div className="flex justify-between items-center mb-6">
        <p className="text-h5 font-semibold text-gray-600">Revenue Trend</p>
        <div className="flex items-center gap-4 text-md text-gray-600">
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
      <div className="h-[300px] relative overflow-visible">
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white z-10">
            <Loading />
          </div>
        )}
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
              axisLine={false}
              tickLine={false}
              tick={{ dx: -70, textAnchor: "start" }}
              tickFormatter={(value) => value.toLocaleString()}
              className="-translate-y-0.5"
            />
            <Tooltip
              cursor={{ stroke: "#EC632A", strokeWidth: 1 }} // keeps vertical line only
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-gray-200 rounded shadow p-2 text-sm text-gray-800">
                      <p className="font-bold">{label}</p>
                      <p>Revenue: ${payload[0].value.toLocaleString()}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#EC632A"
              strokeWidth={3}
              fill="url(#colorRevenue)"
              fillOpacity={1}
              dot={{ r: 5, strokeWidth: 2, fill: "#fff", stroke: "#EC632A" }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueTrend;
