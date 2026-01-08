import { IoIosWarning } from "react-icons/io";
export const ErrorMessage = ({ message = "Something went wrong" }) => (
  <div
    className="
      flex flex-col items-center justify-center
      py-10 px-4
      text-center
      text-red-600 dark:text-red-400
      bg-red-50 dark:bg-red-900/20
      border border-red-200 dark:border-red-800
      rounded-lg
    "
  >
    <span className="text-3xl mb-2 ">
      <IoIosWarning className="text-amber-400" size={45} />
    </span>
    <p className="font-semibold text-sm">{message}</p>
    <p className="text-xs mt-1 opacity-80">Please try again later</p>
  </div>
);
