import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import { useCities } from "../../hooks/useCities";
import { useCategories } from "../../hooks/useCategories";
import { toast } from "react-toastify";
import { InputField } from "../../components/helper/Input";
import { SelectField } from "../../components/helper/SelectField";

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
      services: form.services.filter(Boolean),
      city_id: form.city_id,
      category_id: form.category_id,
      user_id: form.user_id,
    };

    try {
      await fetch("http://localhost:3000/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast.success("Place added successfully!");
      navigate("/dashboard/places");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add place");
    }
  };

  const { users } = useUsers();
  const { cities } = useCities();
  const { categories } = useCategories();

  return (
    <section className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Add New Place
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
                     bg-white dark:bg-slate-800 p-6 rounded-xl shadow"
        >
          {/* Place Name */}
          <InputField
            label="Place Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter place name"
            required
          />

          {/* Address */}
          <InputField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter address"
          />

          {/* Price */}
          <InputField
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
          />

          {/* Category */}
          <SelectField
            label="Category"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            options={categories}
            placeholder="Select category"
            optionLabel="name"
          />

          {/* City */}
          <SelectField
            label="City"
            name="city_id"
            value={form.city_id}
            onChange={handleChange}
            options={cities}
            placeholder="Select city"
            optionLabel="name"
          />

          {/* Owner */}
          <SelectField
            label="Owner"
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            options={users}
            placeholder="Select user"
            optionLabel={(u) => `${u.firstname} ${u.lastname}`}
          />

          {/* Services */}
          <div className="flex flex-col lg:col-span-1">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Services
            </label>
            {form.services.map((s, i) => (
              <input
                key={i}
                value={s}
                onChange={(e) => handleServiceChange(i, e.target.value)}
                placeholder={`Service ${i + 1}`}
                className="mb-2 px-3 py-2 rounded border w-full
                           focus:ring-2 focus:ring-blue-500
                           dark:bg-slate-700 dark:text-white"
              />
            ))}
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Short description about the place"
              className="px-3 py-2 rounded border w-full
                         focus:ring-2 focus:ring-blue-500
                         dark:bg-slate-700 dark:text-white"
            />
          </div>

          {/* Images */}
          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Images
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="file"
                  className="border rounded p-2 dark:bg-slate-700 w-full"
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 lg:col-span-3 flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700
                         text-white px-6 py-3 rounded-lg font-semibold transition w-full md:w-auto"
            >
              Save Place
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
