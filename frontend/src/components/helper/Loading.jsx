export const Loader = ({ text = "Loading..." }) => (
  <div className="flex items-center justify-center py-10 text-gray-500">
    <span className="animate-spin mr-2">⏳</span>
    <span>{text}</span>
  </div>
);
