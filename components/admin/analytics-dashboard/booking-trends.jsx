import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/global/loading";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow p-2 border rounded text-sm">
        <p className="font-semibold">{label}</p>
        <p>{payload[0].payload.booking} bookings</p>
      </div>
    );
  }

  return null;
};

const BookingTrends = ({ month, onChangeMonth, data, isLoading }) => {
  return (
    <div className="flex w-[60%] bg-white rounded-lg shadow p-10">
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <p className="text-h5 font-semibold text-gray-600">
            Booking Trends by Day
          </p>
          <div className="w-[160px] text-gray-900">
            <Select
              value={month}
              onValueChange={onChangeMonth}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-util-white cursor-pointer">
                {isLoading ? (
                  <span className="text-muted-foreground">Loading...</span>
                ) : (
                  <SelectValue placeholder="Select a month" />
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this">This month</SelectItem>
                <SelectItem value="last">Last month</SelectItem>
                <SelectItem value="last2">Last 2 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex pt-12 text-gray-900 items-center justify-center">
          {isLoading ? (
            <span className="h-[240px]">
              <Loading />
            </span>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data}>
                <CartesianGrid
                  vertical={false}
                  horizontal={true}
                  strokeDasharray="1 1"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ dy: 12 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="percent"
                  fill="#EC632A"
                  barSize={12}
                  radius={10}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingTrends;
