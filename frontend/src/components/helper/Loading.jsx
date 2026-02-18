export const Loader = ({ text = "Loading...", fullScreen = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-16"
      }`}
    >
      {/* Spinner */}
      <div className="relative">
        <div className="h-10 w-10 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-4 border-teal-600 border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-4 text-sm font-medium text-gray-600 animate-pulse">
        {text}
      </p>
    </div>
  );
};
