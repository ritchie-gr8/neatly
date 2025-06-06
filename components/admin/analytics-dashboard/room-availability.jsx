import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/global/loading";

const RoomAvailability = ({ data, month, onChangeMonth, isLoading }) => {
  return (
    <div className="flex w-[40%] bg-white rounded-lg shadow p-10">
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <p className="text-h5 font-semibold text-gray-600">
            Room Availability
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
                <SelectItem value="today">Today</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between items-end gap-6 pt-12">
          {isLoading ? (
            <>
              <span className="h-[240px]">
                <Loading />
              </span>
              <ul className="space-y-2 w-full max-w-[120px]  animate-pulse">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="h-4 w-20 rounded-full bg-gray-300" />
                    <span className="h-4 w-10 rounded-full bg-gray-300" />
                    <span className="h-4 w-10 rounded-full bg-gray-300 ml-auto" />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <ResponsiveContainer width={240} height={240}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    innerRadius={90}
                    outerRadius={120}
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Pie
                    data={data}
                    dataKey="value"
                    innerRadius={75}
                    outerRadius={95}
                    stroke="none"
                    style={{ opacity: 0.7 }}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <ul className="space-y-2 text-sm text-gray-700">
                {data.map((entry, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span>{entry.name}</span>
                    <span className="ml-auto text-sm">{entry.value}</span>
                    <span className="pl-1">Rooms</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomAvailability;
