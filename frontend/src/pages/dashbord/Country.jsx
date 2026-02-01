import { useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
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
  /* ================= STATE ================= */
  const [countryName, setCountryName] = useState("");
  const [editCountryId, setEditCountryId] = useState(null);

  /* ================= DATA ================= */
  const { countries, error, loading, hasCountry, refetch } = useCountries();
  const { createCountry, loading: creating } = useCreateCountry();
  const { deleteCountry, loading: deleting } = useDeleteCountry();

  /* ================= ADD ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!countryName.trim()) {
      toast.error("Country name is required");
      return;
    }

    const success = await createCountry({ name: countryName.trim() });

    if (success) {
      toast.success("Country added successfully");
      setCountryName("");
      refetch();
    } else {
      toast.error("Failed to add country");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this country?")) return;

    const success = await deleteCountry(id);
    success ? toast.success("Country deleted") : toast.error("Delete failed");
    success && refetch();
  };

  /* ================= UI STATES ================= */
  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <>
      <section className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-8">
        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            Country Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage available countries for cities and places
          </p>
        </div>

        {/* ================= ADD COUNTRY ================= */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 dark:bg-slate-700/40 p-5 rounded-lg flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Country name"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-slate-300
              dark:border-slate-600 bg-white dark:bg-slate-800
              text-slate-800 dark:text-white
              focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <button
            type="submit"
            disabled={creating || !countryName.trim()}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium
              rounded-md px-6 py-2 transition disabled:opacity-50"
          >
            {creating ? "Adding..." : "Add Country"}
          </button>
        </form>

        {/* ================= COUNTRY LIST ================= */}
        {!hasCountry ? (
          <NotFoundData text="No countries found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm text-slate-500 dark:text-slate-400 border-b dark:border-slate-700">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Country Name</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {countries.map((country, index) => (
                  <tr
                    key={country.id}
                    className="border-b dark:border-slate-700
                      hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
                  >
                    <td className="py-3 px-2">{index + 1}</td>

                    <td className="py-3 px-2 font-medium text-slate-800 dark:text-white">
                      {country.name}
                    </td>

                    <td className="py-3 px-2">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setEditCountryId(country.id)}
                          className="p-2 rounded-md text-blue-500 hover:bg-blue-500/10 transition"
                        >
                          <FaEdit size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(country.id)}
                          disabled={deleting}
                          className="p-2 rounded-md text-red-500 hover:bg-red-500/10 transition disabled:opacity-50"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ================= EDIT MODAL ================= */}
      {editCountryId && (
        <EditCountry
          id={editCountryId}
          onClose={() => {
            setEditCountryId(null);
            refetch();
          }}
        />
      )}
    </>
  );
};
