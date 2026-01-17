import {
  FaUsers,
  FaMountainCity,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaCommentDots,
} from "react-icons/fa6";
import { RiHotelFill } from "react-icons/ri";
import { useUsers } from "../../hooks/useUsers";
import { usePlaces } from "../../hooks/usePlaces";
import { useCities } from "../../hooks/useCities";

export const CategoryCard = () => {
  const { users } = useUsers();
  const { places } = usePlaces();
  const { cities } = useCities();
  const categories = [
    {
      label: "Comments",
      icon: <FaCommentDots />,
      count: 13,
      color: "from-orange-400 to-orange-600",
      monthly: 23,
      trend: "up",
      date: "01.10.2026",
    },
    {
      label: "Users",
      icon: <FaUsers />,
      count: users.length,
      color: "from-sky-400 to-sky-600",
      monthly: 45,
      trend: "down",
      date: "01.10.2026",
    },
    {
      label: "Places",
      icon: <RiHotelFill />,
      count: places.length,
      color: "from-emerald-400 to-emerald-600",
      monthly: 12,
      trend: "up",
      date: "01.10.2026",
    },
    {
      label: "Cities",
      icon: <FaMountainCity />,
      count: cities.length,
      color: "from-purple-400 to-purple-600",
      monthly: 5,
      trend: "down",
      date: "01.10.2026",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 my-6">
      {categories.map((item, index) => (
        <div
          key={index}
          className="relative p-2 bg-white dark:bg-slate-700 rounded
                     flex flex-col justify-between items-center text-center"
        >
          {/* Gradient top bar */}
          <div
            className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`}
          />

          {/* Icon with gradient border */}
          <div
            className={`w-20 h-20 flex items-center justify-center rounded-full
                        bg-white dark:bg-slate-700
                        border-4 border-transparent
                        bg-clip-padding p-1
                        relative`}
          >
            <div
              className={`w-full h-full rounded-full flex items-center justify-center
                          bg-gradient-to-r ${item.color} p-1`}
            >
              <div className="bg-white dark:bg-slate-800 w-full h-full rounded-full flex items-center justify-center text-3xl">
                {item.icon}
              </div>
            </div>
          </div>

          {/* Count */}
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            {item.count}
          </h2>

          {/* Label */}
          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {item.label}
          </p>

          {/* Trend & Monthly */}
          <div className="mt-4 w-full flex justify-between items-center px-4">
            <span className="text-xs text-gray-400">{item.date}</span>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                item.trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.monthly}{" "}
              {item.trend === "up" ? (
                <FaArrowTrendUp className="text-green-500" />
              ) : (
                <FaArrowTrendDown className="text-red-500" />
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
