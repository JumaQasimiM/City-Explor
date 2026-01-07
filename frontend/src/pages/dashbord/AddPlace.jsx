import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddPlace = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (index, value) => {
    const updated = [...form.services];
    updated[index] = value;
    setForm({ ...form, services: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      address: form.address,
      price: Number(form.price),
      description: form.description,
      srevices: form.services.filter(Boolean),
      city_id: Number(form.city_id),
      category_id: Number(form.category_id),
      user_id: Number(form.user_id),
    };

    try {
      await fetch("http://localhost:3000/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("Place added successfully!");
      navigate("/dashboard/places");
    } catch (error) {
      console.error(error);
      alert("Failed to add place");
    }
  };

  return (
    <section className="p-4 sm:p-6 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Add New Place
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
          bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md"
      >
        {/* Place Name */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Place Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter place name"
            required
            className="px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Price
          </label>
          <input
            type="number"
            min="0"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Services */}
        <div className="flex flex-col col-span-1 sm:col-span-2 lg:col-span-1">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Services
          </label>
          {form.services.map((s, i) => (
            <input
              key={i}
              value={s}
              onChange={(e) => handleServiceChange(i, e.target.value)}
              placeholder={`Service ${i + 1}`}
              className="mb-2 px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            />
          ))}
        </div>

        {/* Description */}
        <div className="flex flex-col col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter a short description"
            rows={4}
            className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* City ID */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
            City ID
          </label>
          <input
            type="number"
            name="city_id"
            value={form.city_id}
            onChange={handleChange}
            placeholder="City ID"
            className="px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Category ID */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Category ID
          </label>
          <input
            type="number"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            placeholder="Category ID"
            className="px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* User ID */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
            User ID
          </label>
          <input
            type="number"
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            placeholder="User ID"
            className="px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Image Uploads */}
        <div className="flex flex-col col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 gap-2">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Images
          </label>
          <input type="file" className="border rounded p-2" />
          <input type="file" className="border rounded p-2" />
          <input type="file" className="border rounded p-2" />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            Save Place
          </button>
        </div>
      </form>
    </section>
  );
};
