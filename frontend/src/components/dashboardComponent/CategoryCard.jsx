import { FaUsers, FaMountainCity } from "react-icons/fa6";
import { RiHotelFill } from "react-icons/ri";
import { LuNotepadTextDashed } from "react-icons/lu";

export const CategoryCard = () => {
  const categories = [
    {
      label: "Bookings",
      icon: <LuNotepadTextDashed />,
      count: 13,
      color: "from-orange-400 to-orange-600",
      iconBg: "bg-orange-100 text-orange-600",
    },
    {
      label: "Users",
      icon: <FaUsers />,
      count: 134,
      color: "from-sky-400 to-sky-600",
      iconBg: "bg-sky-100 text-sky-600",
    },
    {
      label: "Places",
      icon: <RiHotelFill />,
      count: 134,
      color: "from-emerald-400 to-emerald-600",
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Cities",
      icon: <FaMountainCity />,
      count: 13,
      color: "from-purple-400 to-purple-600",
      iconBg: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
      {categories.map((item, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded p-5
                     bg-white dark:bg-slate-800
                     shadow-md hover:shadow-xl
                     transition-all duration-300 flex flex-col items-center justify-center text-center"
        >
          {/* Gradient bar */}
          <div
            className={`absolute top-2 left-0 w-full h-1 bg-gradient-to-r ${item.color}`}
          />

          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center
                        ${item.iconBg} mb-4 text-2xl`}
          >
            {item.icon}
          </div>

          {/* Count */}
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {item.count}
          </h2>

          {/* Label */}
          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};
