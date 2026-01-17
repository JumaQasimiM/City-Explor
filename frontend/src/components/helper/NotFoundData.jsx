import { FaFileAlt } from "react-icons/fa";
export const NotFoundData = ({
  text = "No data found",
  description = "Try adding new data or changing filters",
  icon = <FaFileAlt />,
}) => (
  <div
    className="
      flex flex-col items-center justify-center
      py-14 px-6
      text-center
      bg-white dark:bg-slate-800
      border border-dashed border-gray-300 dark:border-slate-600
      rounded-xl
    "
  >
    {/* Icon */}
    <div
      className="
        w-14 h-14 mb-4
        flex items-center justify-center
        rounded-full
        bg-teal-100 dark:bg-teal-900
        text-teal-600 dark:text-teal-300
        text-2xl
      "
    >
      {icon}
    </div>

    {/* Title */}
    <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">
      {text}
    </p>

    {/* Description */}
    <p className="text-xs mt-2 text-gray-500 dark:text-gray-400 max-w-xs">
      {description}
    </p>
  </div>
);
