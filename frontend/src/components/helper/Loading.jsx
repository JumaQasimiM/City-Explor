export const Loader = ({ text = "Loading…", fullScreen = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-12"
      }`}
    >
      {/* spinner */}
      <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-gray-700 dark:border-gray-700 dark:border-t-gray-300 animate-spin" />

      {/* text */}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{text}</p>
    </div>
  );
};
