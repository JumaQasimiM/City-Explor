import { FaXmark } from "react-icons/fa6";
import { InputField } from "../../../components/helper/Input";
import { SelectField } from "../../../components/helper/SelectField";

export const EditPlace = () => {
  return (
    <section className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-7xl bg-white dark:bg-slate-900 rounded mt-380 md:mt-200">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between p-6 md:px-8 md:py-6 border-b dark:border-slate-700">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              Edit Place
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Update place information and settings
            </p>
          </div>

          <button className="text-gray-400 hover:text-red-500 transition cursor-pointer">
            <FaXmark size={22} />
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form className="p-1 md:p-8 space-y-10">
          {/* ===== General Information ===== */}
          <Card
            title="General Information"
            subtitle="Basic details about the place"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Place Name"
                name="name"
                placeholder="e.g. Palm Garden Restaurant"
                required
              />

              <InputField
                label="Average Price"
                name="price"
                type="number"
                placeholder="$"
              />

              <SelectField
                label="Category"
                name="category_id"
                placeholder="Select category"
                optionLabel="name"
              />
            </div>
          </Card>

          {/* ===== Location & Ownership ===== */}
          <Card
            title="Location & Ownership"
            subtitle="Address and ownership information"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Address"
                name="address"
                placeholder="Full address"
              />

              <SelectField
                label="City"
                name="city_id"
                placeholder="Select city"
                optionLabel="name"
              />

              <InputField label="Owner" value="John Doe" disabled />
            </div>
          </Card>

          {/* ===== Services ===== */}
          <Card
            title="Services"
            subtitle="Optional services provided by this place"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <input
                  key={i}
                  placeholder={`Service ${i + 1}`}
                  className="px-4 py-2 rounded-lg border border-gray-300
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                  dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                />
              ))}
            </div>
          </Card>

          {/* ===== Description ===== */}
          <Card
            title="Description"
            subtitle="Short description visible to users"
          >
            <textarea
              name="description"
              rows={4}
              placeholder="Write a short description about this place..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-blue-500 focus:outline-none
              dark:bg-slate-800 dark:border-slate-600 dark:text-white"
            />
          </Card>

          {/* ===== Media ===== */}
          <Card title="Media" subtitle="Upload images for this place">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((_, i) => (
                <label
                  key={i}
                  className="flex items-center justify-center h-32 border-2 border-dashed
                  rounded-lg cursor-pointer text-gray-400
                  hover:border-blue-500 hover:text-blue-500 transition
                  dark:border-slate-600 dark:hover:border-blue-400"
                >
                  Upload Image
                  <input type="file" className="hidden" />
                </label>
              ))}
            </div>
          </Card>

          {/* ===== ACTIONS ===== */}
          <div className="flex justify-end gap-4 pt-4 border-t dark:border-slate-700">
            <button
              type="button"
              className="px-6 py-3 rounded-lg border border-gray-300
              hover:bg-gray-100 transition
              dark:border-slate-600 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-blue-600
              hover:bg-blue-700 transition
              text-white font-semibold shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

/* ================= REUSABLE CARD ================= */
const Card = ({ title, subtitle, children }) => (
  <div className="bg-gray-50 dark:bg-slate-800 rounded p-2 md:p-6 space-y-6">
    <div>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);
