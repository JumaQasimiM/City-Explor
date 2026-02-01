import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { InputField } from "../../../components/helper/Input";
import { SelectField } from "../../../components/helper/SelectField";

import {
  useEditPlace,
  usePlaceById,
  usePlaceOwner,
} from "../../../hooks/usePlaces";
import { useCities } from "../../../hooks/useCities";
import { useCategories } from "../../../hooks/useCategories";

export const EditPlace = ({ id, onClose }) => {
  const { data: place } = usePlaceById(id);
  const { data: owner } = usePlaceOwner(place?.user_id);

  const { updatePlace, loading } = useEditPlace();
  const { cities = [] } = useCities();
  const { categories = [] } = useCategories();

  /* ================= STATE ================= */
  const [form, setForm] = useState({
    name: "",
    address: "",
    price: "",
    description: "",
    services: ["", "", "", ""],
    city_id: "",
    category_id: "",
  });

  /* ================= INIT ================= */
  useEffect(() => {
    if (!place) return;

    setForm({
      name: place.name || "",
      address: place.address || "",
      price: place.price || "",
      description: place.description || "",
      services: place.services?.length ? place.services : ["", "", "", ""],
      city_id: place.city_id || "",
      category_id: place.category_id || "",
    });
  }, [place]);

  /* ================= ESC CLOSE ================= */
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  /* ================= HANDLERS ================= */
  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const updateService = (i, value) => {
    setForm((prev) => {
      const updated = [...prev.services];
      updated[i] = value;
      return { ...prev, services: updated };
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      services: form.services.filter(Boolean),
    };

    const success = await updatePlace(id, payload);

    success
      ? toast.success("Place updated successfully")
      : toast.error("Update failed");

    success && onClose();
  };

  if (!place) return null;

  return (
    <section className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl bg-white dark:bg-slate-700 rounded-xl shadow-xl flex flex-col max-h-[90vh]">
        {/* ================= HEADER ================= */}
        <header className="flex justify-between items-center px-6 py-4 border-b dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold">Edit Place</h2>
            <p className="text-sm text-slate-800 dark:text-slate-300">
              Modify place information
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-500"
          >
            <FaXmark size={20} />
          </button>
        </header>

        {/* ================= BODY ================= */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-8"
        >
          <Card title="General Information">
            <div className="grid md:grid-cols-3 gap-6">
              <InputField
                label="Place Name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />

              <InputField
                label="Average Price"
                type="number"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                required
              />

              <SelectField
                label="Category"
                options={categories}
                optionLabel="name"
                value={form.category_id}
                onChange={(e) => updateField("category_id", e.target.value)}
                required
              />
            </div>
          </Card>

          <Card title="Location & Owner">
            <div className="grid md:grid-cols-3 gap-6">
              <InputField
                label="Address"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                required
              />

              <SelectField
                label="City"
                options={cities}
                optionLabel="name"
                value={form.city_id}
                onChange={(e) => updateField("city_id", e.target.value)}
                required
              />

              <InputField
                label="Owner"
                value={
                  owner ? `${owner.firstname} ${owner.lastname}` : "Loading..."
                }
                disabled
              />
            </div>
          </Card>

          <Card title="Services">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {form.services.map((s, i) => (
                <input
                  key={i}
                  value={s}
                  onChange={(e) => updateService(i, e.target.value)}
                  placeholder={`Service ${i + 1}`}
                  className="px-4 py-2 rounded-md border
                  focus:ring-2 focus:ring-indigo-500
                  dark:bg-slate-800"
                />
              ))}
            </div>
          </Card>

          <Card title="Description">
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full px-4 py-3 rounded-md border
              focus:ring-2 focus:ring-indigo-500
              dark:bg-slate-800"
            />
          </Card>
        </form>

        {/* ================= FOOTER ================= */}
        <footer className="px-6 py-4 border-t dark:border-slate-700 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-2 bg-indigo-600 hover:bg-indigo-700
            text-white rounded-md disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </footer>
      </div>
    </section>
  );
};

/* ================= CARD ================= */
const Card = ({ title, children }) => (
  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 space-y-5">
    <h3 className="font-semibold text-lg">{title}</h3>
    {children}
  </div>
);
