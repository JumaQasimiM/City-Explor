import { useState } from "react";
import { toast } from "react-toastify";

import {
  useCountries,
  useCreateCountry,
  useDeleteCountry,
} from "../../hooks/useCountry";

import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { NotFoundData } from "../../components/helper/NotFoundData";

export const Country = () => {
  // ================= STATE =================
  const [countryName, setCountryName] = useState("");

  // ================= DATA =================
  const { countries, error, loading, hasCountry, refetch } = useCountries();
  const { createCountry, loading: createLoading } = useCreateCountry();
  const { deleteCountry, loading: deleteLoading } = useDeleteCountry();

  // ================= ADD COUNTRY =================
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

  // ================= DELETE COUNTRY =================
  const handleDelete = async (id) => {
    const success = await deleteCountry(id);

    if (success) {
      toast.success("Country deleted successfully");
      refetch();
    } else {
      toast.error("Failed to delete country");
    }
  };

  // ================= LOADING / ERROR =================
  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <section className="p-3 md:p-6 bg-white/70 dark:bg-slate-800 rounded">
      {/* ================= ADD FORM ================= */}
      <div className="mb-6 p-4 bg-teal-800 rounded-lg shadow">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3"
        >
          <input
            type="text"
            placeholder="Country name (e.g. Afghanistan)"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            className="flex-1 px-4 py-2 rounded
            border border-gray-400 text-gray-100
            focus:ring-2 focus:ring-green-400 outline-none"
          />

          <button
            type="submit"
            disabled={createLoading || !countryName.trim()}
            className="px-6 py-2 rounded-md
            bg-green-600 hover:bg-green-700
            text-white font-semibold
            transition disabled:opacity-50"
          >
            {createLoading ? "Adding..." : "Add Country"}
          </button>
        </form>
      </div>

      {/* ================= COUNTRY LIST ================= */}
      {!hasCountry ? (
        <NotFoundData text="No countries found" />
      ) : (
        <ul className="space-y-2">
          {countries.map((country, index) => (
            <li
              key={country.id}
              className="flex justify-between items-center
              px-4 py-3 rounded bg-teal-700 dark:bg-slate-900"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <span>{index + 1}</span>

                <span className="text-gray-100 font-medium">
                  {country.name}
                </span>
              </div>

              {/* RIGHT */}

              <div className="flex gap-3 text-sm">
                <button className=" bg-sky-500 hover:bg-sky-600 text-black py-1 px-2 rounded cursor-pointer">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(country.id)}
                  disabled={deleteLoading}
                  className="disabled:opacity-50 bg-red-500 hover:bg-red-600 text-black py-1 px-2 rounded cursor-pointer"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
