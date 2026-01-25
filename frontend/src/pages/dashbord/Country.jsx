import { useState } from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  useCountries,
  useCreateCountry,
  useDeleteCountry,
} from "../../hooks/useCountry";

import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { NotFoundData } from "../../components/helper/NotFoundData";
import { EditCountry } from "./EditModals/Editcountry";

export const Country = () => {
  // ================= STATE =================
  const [countryName, setCountryName] = useState("");
  const [editCountryId, setEditCountryId] = useState(null);

  // ================= DATA =================
  const { countries, error, loading, hasCountry, refetch } = useCountries();
  const { createCountry, loading: createLoading } = useCreateCountry();
  const { deleteCountry, loading: deleteLoading } = useDeleteCountry();

  // ================= ADD =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!countryName.trim()) {
      toast.error("Country name is required");
      return;
    }

    const success = await createCountry({ name: countryName.trim() });

    if (success) {
      toast.success("Country created successfully");
      setCountryName("");
      refetch();
    } else {
      toast.error("Failed to create country");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const success = await deleteCountry(id);

    if (success) {
      toast.success("Country deleted successfully");
      refetch();
    } else {
      toast.error("Failed to delete country");
    }
  };

  // ================= EDIT =================
  const handleEdit = (id) => {
    setEditCountryId(id);
  };

  const handleCloseModal = () => {
    setEditCountryId(null);
    refetch();
  };

  // ================= UI STATES =================
  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <>
      <section className="md:p-6 bg-white/70 dark:bg-slate-800 rounded">
        {/* ADD FORM */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col gap-3 bg-teal-800 p-4 rounded"
        >
          <input
            type="text"
            placeholder="Country name"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            className="flex-1 px-4 py-2 rounded outline-none border border-gray-400"
          />

          <button
            type="submit"
            disabled={createLoading || !countryName.trim()}
            className="bg-green-600 px-5 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-1/4"
          >
            {createLoading ? "Adding..." : "Add"}
          </button>
        </form>

        {/* LIST */}
        {!hasCountry ? (
          <NotFoundData text="No countries found" />
        ) : (
          <ul className="space-y-2">
            {countries.map((country, index) => (
              <li
                key={country.id}
                className="flex justify-between items-center bg-teal-700 px-4 py-3 rounded"
              >
                <div className="flex gap-4 text-white">
                  <span>{index + 1}</span>
                  <span>{country.name}</span>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(country.id)}
                    className="px-3 py-1 rounded text-black cursor-pointer hover:scale-109 hover:text-blue-200"
                  >
                    <FaEdit size={23} className="" />
                  </button>

                  <button
                    onClick={() => handleDelete(country.id)}
                    disabled={deleteLoading}
                    className="px-3 py-1 rounded text-red-400 disabled:opacity-50 cursor-pointer hover:scale-109 hover:text-red-900"
                  >
                    {deleteLoading ? (
                      "Deleting..."
                    ) : (
                      <MdDeleteForever size={23} className="" />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* EDIT MODAL */}
      {editCountryId && (
        <EditCountry id={editCountryId} onClose={handleCloseModal} />
      )}
    </>
  );
};
