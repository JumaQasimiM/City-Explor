import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserById } from "../../hooks/useUsers";
import { useCities } from "../../hooks/useCities";
import { useCategories } from "../../hooks/useCategories";
import { toast } from "react-toastify";
import { InputField } from "../../components/helper/Input";
import { SelectField } from "../../components/helper/SelectField";
import { useAuth } from "../../context/AuthContext";

export const AddPlace = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { user: loggedInUser } = useGetUserById(user?.id);

  const { cities } = useCities();
  const { categories } = useCategories();

  const [form, setForm] = useState({
    name: "",
    address: "",
    price: "",
    description: "",
    services: ["", "", "", ""],
    city_id: "",
    category_id: "",
    user_id: "",
  });

  /* ================= OWNER ================= */
  useEffect(() => {
    if (loggedInUser) {
      setForm((prev) => ({ ...prev, user_id: loggedInUser.id }));
    }
  }, [loggedInUser]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (index, value) => {
    setForm((prev) => {
      const services = [...prev.services];
      services[index] = value;
      return { ...prev, services };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      services: form.services.filter(Boolean),
    };

    try {
      await fetch("http://localhost:3000/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast.success("Place created successfully");
      navigate("/dashboard/places");
    } catch {
      toast.error("Failed to create place");
    }
  };

  if (!user) return null;

  return (
    <section className="max-w-7xl mx-auto px-2 ld:px-6 md:py-10">
      {/* ================= HEADER ================= */}
      <header className="mb-10">
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Add New Place
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Create and manage places visible on the platform
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* ================= GENERAL INFO ================= */}
        <Card title="General Information">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Place Name"
              placeholder="Place Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Category"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              options={categories}
              placeholder="Select category"
              optionLabel="name"
            />

            <InputField
              label="Average Price"
              placeholder="Average Price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
          </div>
        </Card>

        {/* ================= LOCATION ================= */}
        <Card title="Location & Ownership">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Address"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />

            <SelectField
              label="City"
              name="city_id"
              value={form.city_id}
              onChange={handleChange}
              options={cities}
              placeholder="Select city"
              optionLabel="name"
            />

            <InputField
              label="Owner"
              value={
                loggedInUser
                  ? `${loggedInUser.firstname} ${loggedInUser.lastname}`
                  : ""
              }
              disabled
            />

            {/* hidden owner id */}
            <input type="hidden" name="user_id" value={form.user_id} />
          </div>
        </Card>

        {/* ================= SERVICES ================= */}
        <Card title="Services">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {form.services.map((service, i) => (
              <input
                key={i}
                value={service}
                onChange={(e) => handleServiceChange(i, e.target.value)}
                placeholder={`Service ${i + 1}`}
                className="px-3 py-2 rounded-md border transition
                focus:ring-2 focus:ring-blue-500
                dark:bg-slate-700 dark:text-white"
              />
            ))}
          </div>
        </Card>

        {/* ================= DESCRIPTION ================= */}
        <Card title="Description">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Short description about this place"
            className="w-full px-4 py-2 rounded-md border transition
            focus:ring-2 focus:ring-blue-500
            dark:bg-slate-700 dark:text-white"
          />
        </Card>

        {/* ================= MEDIA ================= */}
        <Card title="Upload images for this place" span={false}>
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

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-md border
            hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-md bg-blue-600
            hover:bg-blue-700 text-white font-semibold transition"
          >
            Create Place
          </button>
        </div>
      </form>
    </section>
  );
};

/* ================= REUSABLE CARD ================= */
const Card = ({ title, span = true, children }) => (
  <div className="bg-white dark:bg-slate-700 rounded shadow-sm p-2 md:p-6">
    <h2 className="text-lg font-semibold mb-6 border-b pb-2">
      {title}
      {span === true && <span className="text-red-400">*</span>}
    </h2>
    {children}
  </div>
);
