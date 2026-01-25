export const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  readOnly = false,
  disabled = false,
}) => (
  <div className="flex flex-col">
    <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      disabled={disabled}
      className="px-3 py-2 disabled:cursor-not-allowed read-only:opacity-50 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
    />
  </div>
);
