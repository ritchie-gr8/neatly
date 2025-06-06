import { useCallback, useState } from "react";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { FaCheck, FaArrowRight } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import useInViewFetch from "@/hooks/useInViewFetch";
import Loading from "@/components/global/loading";

function Card({ icon, overlayIcon, bg, iconBg, title, description, time, loading, className }) {
    return (
      <div className={cn("flex items-center rounded-lg px-6 py-4 flex-1", className)}>
        <div className="relative">
          <div className={cn("rounded-full p-3   mr-4", iconBg, bg)}>
            {icon}
          </div>
          <div className={cn("absolute bottom-3 right-7 p-1 rounded-full", bg.replace("text-", "bg-"))}>
            {overlayIcon}
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div>
            <p className={cn("text-xl font-semibold", bg)}>{title}</p>
            <p className={cn("text-md font-light", bg)}>{description}</p>
          </div>
          {loading ? (
            <Loading text="Loading" size="md"/>
          ) : (
            <span className={cn("font-semibold text-xl", bg)}>{time}</span>
          )}
        </div>
      </div>
    );
}

function calculateAverageTime(times) {
    const toMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };
  
    const toTimeString = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes % 60);
      const period = hours >= 12 ? "PM" : "AM";
      const adjustedHour = ((hours + 11) % 12 + 1); // convert 0–23 to 1–12
      return `${adjustedHour}:${minutes.toString().padStart(2, "0")} ${period}`;
    };
  
    const avg = times.reduce((sum, t) => sum + toMinutes(t), 0) / times.length;
    return toTimeString(avg);
}

const mockData = [
    { checkIn: "15:50", checkOut: "22:10" },
    { checkIn: "16:15", checkOut: "22:50" },
    { checkIn: "16:05", checkOut: "22:40" },
    { checkIn: "15:55", checkOut: "22:20" },
    { checkIn: "16:10", checkOut: "22:40" },
  ];

export default function CheckInCheckOutTimes() {
  const [isLoading, setIsLoading] = useState(true);
  const [times, setTimes] = useState({
    checkIn: null,
    checkOut: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        const avgCheckIn = calculateAverageTime(mockData.map(d => d.checkIn));
        const avgCheckOut = calculateAverageTime(mockData.map(d => d.checkOut));
  
        setTimes({
          checkIn: avgCheckIn,
          checkOut: avgCheckOut,
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    //setIsLoading(false);
    }
  }, [setTimes]);

  const ref = useInViewFetch(fetchData);

  return (
    <div ref={ref} className="bg-white rounded-lg shadow w-full p-10">
      <p className="text-h5 font-semibold text-gray-600 pb-6">
        Check-in and Check-out Times Averages
      </p>
      <div className="flex flex-col sm:flex-row gap-4 h-30">
      <Card
          icon={<HiOutlineBuildingOffice size={48} />}
          overlayIcon={<FaCheck size={14} className="text-white" />}
          bg="text-green-600"
          iconBg="bg-green-300"
          title="Check-in"
          description="Check-in time from 2:00 PM onwards"
          time={times.checkIn}
          loading={isLoading}
          className={"bg-green-100"}
        />
        <Card
          icon={<HiOutlineBuildingOffice size={48} />}
          overlayIcon={<FaArrowRight size={14} className="text-white" />}
          bg="text-orange-500"
          iconBg="bg-orange-200"
          title="Check-out"
          description="Check-out time by 12:00 PM"
          time={times.checkOut}
          loading={isLoading}
          className={"bg-orange-100"}
        />
      </div>
    </div>
  );
}
