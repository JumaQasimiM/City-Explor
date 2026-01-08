export const NotFoundData = ({ text = "No data found" }) => (
  <div
    className="
      flex flex-col items-center justify-center
      py-12 px-4
      text-center
      text-gray-500 dark:text-gray-400
      border border-dashed border-gray-300 dark:border-gray-600
      rounded-lg
    "
  >
    <span className="text-4xl mb-3">📄</span>
    <p className="font-semibold text-sm">{text}</p>
    <p className="text-xs mt-1 opacity-70">
      Try adding new data or changing filters
    </p>
  </div>
);
