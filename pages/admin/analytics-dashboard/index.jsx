import React, { useState, useEffect, useMemo } from "react";
import AdminLayout from "@/layouts/admin.layout";
import StatCard from "@/components/admin/analytics-dashboard/stat-card";
import api from "@/lib/axios";
import dayjs from "dayjs";

import RoomAvailability from "@/components/admin/analytics-dashboard/room-availability";
import BookingTrends from "@/components/admin/analytics-dashboard/booking-trends";
import RevenueTrend from "@/components/admin/analytics-dashboard/revenue-trend";
import OccupancyAndGuest from "@/components/admin/analytics-dashboard/occupancy-and-guest";
import CheckInCheckOutTimes from "@/components/admin/analytics-dashboard/check-in-out-timer";

//icons
import { IoWalletOutline, IoCartOutline } from "react-icons/io5";
import { PiCalendarCheck } from "react-icons/pi";
import { HiOutlineGlobeAlt } from "react-icons/hi2";

const AnalyticDashboard = () => {
  //FirstBox
  const [statLoading, setStatLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState([]);
  //SecondBox
  const [pieChartMonth, setPieChartMonth] = useState("today");
  const [pieChartData, setPieChartData] = useState([]);
  const [pieLoading, setPieLoading] = useState(false);
  const [barChartMonth, setBarChartMonth] = useState("this");
  const [barChartData, setBarChartData] = useState([]);
  const [barLoading, setBarLoading] = useState(false);

  const fetchCurrentStatus = async () => {
    try {
      setStatLoading(true);
      const { data } = await api.get("/admin/analytics/status");
      const { lastMonth, thisMonth } = data;

      const calculateChange = (last, current) => {
        const change = last === 0 ? 100 : ((current - last) / last) * 100;
        return {
          value: current,
          change: `${Math.abs(change).toFixed(1)}%`,
          isPositive: change >= 0,
        };
      };

      const stats = [
        {
          title: "Total booking",
          icon: <IoCartOutline size="auto" />,
          ...calculateChange(lastMonth.booking, thisMonth.booking),
        },
        {
          title: "Total sales",
          icon: <IoWalletOutline size="auto" />,
          ...calculateChange(lastMonth.sales, thisMonth.sales),
          value: thisMonth?.sales.toLocaleString(),
        },
        {
          title: "Total booking users",
          icon: <PiCalendarCheck size="auto" />,
          ...calculateChange(lastMonth.users, thisMonth.users),
        },
        {
          title: "Total site visitors",
          icon: <HiOutlineGlobeAlt size="auto" />,
          ...calculateChange(lastMonth.visitors, thisMonth.visitors),
        },
      ];
      setCurrentStatus(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setStatLoading(false);
    }
  };

  const fetchPieChartData = async () => {
    try {
      setPieLoading(true);
  
      const response = await api.get(`/admin/analytics/piechart?month=${pieChartMonth}`);
      const data = response.data.data;
      console.log("data",data)
  
      setPieChartData(data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
      setPieChartData([]); // fallback in case of error
    } finally {
      setPieLoading(false);
    }
  };

  const fetchBarChartData = async () => {
    try {
      setBarLoading(true);
      const month = barChartMonth;
      const response = await api.get(`/admin/analytics/barchart?month=${month}`);
      const data = response.data.data;
      setBarChartData(data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    } finally {
      setBarLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentStatus();
  }, []);

  useEffect(() => {
    fetchBarChartData();
  }, [barChartMonth]);

  useEffect(() => {
    fetchPieChartData();
  }, [pieChartMonth]);

  return (
    <AdminLayout>
      {/* ------------------------ Header ------------------------ */}
      <div className="flex justify-between items-center mb-6 border-b border-brown-300 px-16 py-[19px] bg-white">
        <h5 className="text-h5 font-semibold text-gray-900">
          Analytics Dashboard
        </h5>
      </div>

      {/* ------------------------ Content ------------------------ */}
      {/* First Box */}
      <div className="px-16">
        <div className="grid grid-cols-4 gap-4 py-6 max-w-10xl">
          {statLoading
            ? [...Array(4)].map((_, idx) => (
                <StatCard key={idx} isLoading={true} />
              ))
            : currentStatus.map((item, idx) => (
                <StatCard key={idx} {...item} isLoading={false} />
              ))}
        </div>
      </div>

      {/* Second Box */}
      <div className="flex w-full items-center gap-4 pb-6">
        <div className="flex w-full items-center px-16 gap-4 py-6">
          <RoomAvailability
            data={pieChartData}
            month={pieChartMonth}
            onChangeMonth={setPieChartMonth}
            isLoading={pieLoading}
          />
          <BookingTrends
            data={barChartData}
            month={barChartMonth}
            onChangeMonth={setBarChartMonth}
            isLoading={barLoading}
          />
        </div>
      </div>

      {/* Third Box */}
      <div className="flex w-full items-center px-16 gap-4 pb-12">
        <RevenueTrend />
      </div>

      {/* Fourth Box */}
      <div className="flex w-full items-center px-16 gap-4 pb-12">
        <OccupancyAndGuest />
      </div>

      {/* Fifth Box */}
      <div className="flex w-full items-center px-16 gap-4 pb-12">
        <CheckInCheckOutTimes />
      </div>
    </AdminLayout>
  );
};

export default AnalyticDashboard;
