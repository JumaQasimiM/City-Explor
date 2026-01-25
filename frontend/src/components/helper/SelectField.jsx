export const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder,
  optionLabel,
}) => (
  <div className="flex flex-col">
    <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
      {label}
    </label>
    {/* select */}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="px-3 py-2 rounded border
                 focus:ring-2 focus:ring-blue-500
                 dark:bg-slate-700 dark:text-white"
    >
      <option value="">{placeholder}</option>

      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {typeof optionLabel === "function"
            ? optionLabel(item)
            : item[optionLabel]}
        </option>
      ))}
    </select>
  </div>
);
