import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import Loading from "../../global/loading";

export default function StatCard({
  title,
  value,
  icon,
  change,
  isPositive,
  isLoading,
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex justify-between items-start text-gray-900">
      <div className="flex flex-col gap-3">
        <h4 className="text-md">{title}</h4>

        {isLoading ? (
          <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse" />
        ) : (
          <p className="text-3xl font-semibold">{value}</p>
        )}

        {isLoading ? (
          <div className="max-h-6">
            <div className="w-54 h-6 bg-gray-200 rounded-full animate-pulse" />
          </div>
        ) : (
          <p
            className={`flex items-center text-sm gap-2 ${
              isPositive ? "text-green-600" : "text-orange-600"
            }`}
          >
            {isPositive ? (
              <IoMdTrendingUp size={20} />
            ) : (
              <IoMdTrendingDown size={20} color="#F93C65" />
            )}
            {change} {isPositive ? "Up" : "Down"} from last month
          </p>
        )}
      </div>

      <div className="text-gray-700 bg-gray-300 p-2.5 rounded-full w-12 h-12 text-xl flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}
