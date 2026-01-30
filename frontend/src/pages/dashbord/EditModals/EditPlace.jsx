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

  const { updatePlace, error, loading } = useEditPlace();
  const { cities = [] } = useCities();
  const { categories = [] } = useCategories();

  /* ================= STATE ================= */
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newServices, setNewServices] = useState(["", "", "", ""]);
  const [newCityId, setNewCityId] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");

  /* ================= INIT ================= */
  useEffect(() => {
    if (!place) return;

    setNewName(place.name || "");
    setNewAddress(place.address || "");
    setNewPrice(place.price || "");
    setNewDescription(place.description || "");
    setNewServices(place.services?.length ? place.services : ["", "", "", ""]);
    setNewCityId(place.city_id || "");
    setNewCategoryId(place.category_id || "");
  }, [place]);

  /* ================= SERVICES ================= */
  const handleServiceChange = (index, value) => {
    setNewServices((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: newName,
      address: newAddress,
      price: Number(newPrice),
      description: newDescription,
      services: newServices.filter(Boolean),
      city_id: newCityId,
      category_id: newCategoryId,
    };

    const success = await updatePlace(id, payload);

    if (success) {
      toast.success("Place updated successfully");
      onClose();
    } else {
      toast.error(error || "Update failed");
    }
  };

  if (loading) return null;

  return (
    <section className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center md:p-4 overflow-y-auto">
      <div className="relative w-full max-w-7xl bg-white dark:bg-slate-900 rounded mt-200 md:mt-100">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between p-6 border-b dark:border-slate-700">
          <div>
            <h1 className="text-2xl font-bold">Edit Place</h1>
            <p className="text-sm text-gray-500">
              Update place information and settings
            </p>
          </div>

          <button
            onClick={onClose}
            className="hover:text-red-500 absolute top-4 right-4 cursor-pointer"
          >
            <FaXmark size={22} />
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="p-6 space-y-10">
          <Card title="General Information">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Place Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />

              <InputField
                label="Average Price"
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                required
              />

              <SelectField
                label="Category"
                options={categories}
                optionLabel="name"
                value={newCategoryId}
                onChange={(e) => setNewCategoryId(e.target.value)}
                required
              />
            </div>
          </Card>

          <Card title="Location & Ownership">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                required
              />

              <SelectField
                label="City"
                options={cities}
                optionLabel="name"
                value={newCityId}
                onChange={(e) => setNewCityId(e.target.value)}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {newServices.map((service, i) => (
                <input
                  key={i}
                  value={service}
                  onChange={(e) => handleServiceChange(i, e.target.value)}
                  placeholder={`Service ${i + 1}`}
                  className="px-4 py-2 rounded border
                  focus:ring-2 focus:ring-blue-500
                  dark:bg-slate-800 dark:text-white"
                />
              ))}
            </div>
          </Card>

          <Card title="Description">
            <textarea
              rows={4}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-4 py-3 rounded border
              focus:ring-2 focus:ring-blue-500
              dark:bg-slate-800 dark:text-white"
            />
          </Card>

          {/* ================= ACTIONS ================= */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

/* ================= CARD ================= */
const Card = ({ title, children }) => (
  <div className="bg-gray-50 dark:bg-slate-800 rounded p-3 md:p-6 space-y-6">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </div>
);
