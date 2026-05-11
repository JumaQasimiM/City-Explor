import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ApiUrl } from "../../../api/ApiUrl";

import { InputField } from "../../../components/helper/Input";
import { SelectField } from "../../../components/helper/SelectField";

import { useEditPlace, usePlaceById } from "../../../hooks/usePlaces";

import { useCities } from "../../../hooks/useCities";
import { useCategories } from "../../../hooks/useCategories";
import { useAuth } from "../../../context/AuthContext";

export const EditPlace = ({ id, onClose }) => {
  const { data: place } = usePlaceById(id);
  const { updatePlace, loading } = useEditPlace();

  const { cities = [] } = useCities();
  const { categories = [] } = useCategories();

  const [servicesList, setServicesList] = useState([]);
  /* ========= auth check the admin have to be =============*/
  const { user } = useAuth();
  const role = user?.user?.role;
  const isViewer = role === "viewer";

  /* ================= STATE ================= */
  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    category: "",
    city: "",
    owner: "",
    opening_hours: "",
    contact_number: "",
    website: "",
    latitude: "",
    longitude: "",
    services: [],
  });

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    fetch(`${ApiUrl}/services/`)
      .then((res) => res.json())
      .then((data) => setServicesList(data))
      .catch(() => toast.error("Failed to load services"));
  }, []);

  /* ================= INIT ================= */
  useEffect(() => {
    if (!place) return;

    setForm({
      name: place.name || "",
      description: place.description || "",
      address: place.address || "",
      category: place.category || "",
      city: place.city || "",
      owner: place.owner || "",
      opening_hours: place.opening_hours || "",
      contact_number: place.contact_number || "",
      website: place.website || "",
      latitude: place.latitude || "",
      longitude: place.longitude || "",
      services: place.services || [],
    });
  }, [place]);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "category" || name === "city" ? Number(value) : value,
    }));
  };

  const handleServiceChange = (id) => {
    setForm((prev) => {
      const exists = prev.services.includes(id);

      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== id)
          : [...prev.services, id],
      };
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      category: Number(form.category),
      city: Number(form.city),
      owner: Number(form.owner),
      services: form.services,
    };

    try {
      await updatePlace(id, payload);
      toast.success("Place updated successfully ");
      onClose();
    } catch (error) {
      toast.error(error.message || "Update failed ");
    }
  };

  if (!place) return null;

  return (
    <section className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-500 rounded shadow-xl flex flex-col max-h-[90vh]">
        {/* HEADER */}
        <header className="flex justify-between items-center px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-bold">Edit Place</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Modify place information
            </p>
          </div>

          <button onClick={onClose} className="text-red-500">
            <FaXmark size={20} />
          </button>
        </header>

        {/* BODY */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-8"
        >
          {/* GENERAL */}
          <Card title="General">
            <div className="grid md:grid-cols-3 gap-4">
              <InputField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />

              <SelectField
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                options={categories}
                optionLabel="name"
              />
              <SelectField
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                options={cities}
                optionLabel="name"
              />
            </div>
          </Card>

          {/* LOCATION */}
          <Card title="Location">
            <div className="grid md:grid-cols-3 gap-4">
              <InputField
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
              <InputField
                label="Latitude"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
              />
              <InputField
                label="Longitude"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
              />
            </div>
          </Card>

          {/* CONTACT */}
          <Card title="Contact">
            <div className="grid md:grid-cols-3 gap-4">
              <InputField
                label="Opening Hours"
                name="opening_hours"
                value={form.opening_hours}
                onChange={handleChange}
              />

              <InputField
                label="Phone"
                name="contact_number"
                value={form.contact_number}
                onChange={handleChange}
              />

              <InputField
                label="Website"
                name="website"
                value={form.website}
                onChange={handleChange}
              />
            </div>
          </Card>

          {/* SERVICES */}
          <Card title="Services">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {servicesList.map((s) => (
                <label key={s.id} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={form.services.includes(s.id)}
                    onChange={() => handleServiceChange(s.id)}
                  />
                  {s.title}
                </label>
              ))}
            </div>
          </Card>

          {/* DESCRIPTION */}
          <Card title="Description">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </Card>
        </form>

        {/* FOOTER */}
        <footer className="px-6 py-4 border-t flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>

          {!isViewer && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          )}
        </footer>
      </div>
    </section>
  );
};

/* CARD */
const Card = ({ title, children }) => (
  <div className="bg-gray-50 p-4 rounded dark:bg-slate-700">
    <h3 className="font-semibold mb-3">{title}</h3>
    {children}
  </div>
);
