import { useState, useMemo } from "react";
import { useCities, useDeleteCity, useCreateCity } from "../../hooks/useCities";
import { useCountries } from "../../hooks/useCountry";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { NotFoundData } from "../../components/helper/NotFoundData";
import { toast } from "react-toastify";
import { EditCity } from "./EditModals/EditCity";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CityCategoPlaceChart } from "../../components/dashboardComponent/CityPlaceChart";

export const Cities = () => {
  /* ================= STATE ================= */
  const [cityName, setCityName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [formError, setFormError] = useState("");
  const [cityEditId, setCityEditId] = useState(null);

  /* ================= DATA ================= */
  const { cities, loading, error, hasCity, refetch } = useCities();
  const { countries } = useCountries();
  const { createCity, loading: creating } = useCreateCity();
  const { deleteCity, loading: deleting } = useDeleteCity();

  /* ================= COUNTRY MAP ================= */
  const countryMap = useMemo(
    () => Object.fromEntries((countries || []).map((c) => [c.id, c.name])),
    [countries],
  );

  /* ================= HANDLERS ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName.trim()) return setFormError("City name is required");
    if (cityName.length > 15) return setFormError("Max 15 characters allowed");
    if (!countryId) return setFormError("Please select a country");

    setFormError("");

    const success = await createCity({
      name: cityName.trim(),
      country_id: countryId,
    });

    if (success) {
      toast.success("City added successfully");
      setCityName("");
      setCountryId("");
      refetch();
    } else {
      toast.error("Failed to add city");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this city?")) return;

    const success = await deleteCity(id);
    success ? toast.success("City deleted") : toast.error("Delete failed");
    success && refetch();
  };

  /* ================= LOADING / ERROR ================= */
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <section className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-8">
        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            City Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage cities and assign them to countries
          </p>
        </div>

        {/* ================= ADD CITY ================= */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 dark:bg-slate-700/40 p-5 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            placeholder="City name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600
              bg-white dark:bg-slate-800 text-slate-800 dark:text-white
              focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600
              bg-white dark:bg-slate-800 text-slate-800 dark:text-white
              focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            disabled={creating || !cityName || !countryId}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium
              rounded-md px-6 py-2 transition disabled:opacity-50"
          >
            {creating ? "Adding..." : "Add City"}
          </button>

          {formError && (
            <p className="md:col-span-3 text-sm text-red-500">{formError}</p>
          )}
        </form>

        {/* ================= CITY LIST ================= */}
        {!hasCity ? (
          <NotFoundData text="No cities found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm text-slate-500 dark:text-slate-400 border-b dark:border-slate-700">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">City</th>
                  <th className="py-3 px-2">Country</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {cities.map((city, index) => (
                  <tr
                    key={city.id}
                    className="border-b dark:border-slate-700
                      hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
                  >
                    <td className="py-3 px-2">{index + 1}</td>

                    <td className="py-3 px-2 font-medium text-slate-800 dark:text-white">
                      {city.name}
                    </td>

                    <td className="py-3 px-2 text-slate-500 dark:text-slate-300">
                      {countryMap[city.country_id] || "Unknown"}
                    </td>

                    <td className="py-3 px-2">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setCityEditId(city.id)}
                          className="p-2 rounded-md text-blue-500 hover:bg-blue-500/10 transition"
                        >
                          <FaEdit size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(city.id)}
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
        {/* chart */}
        <div
          className="grid grid-cols-1
                           bg-white dark:bg-slate-800
                            border-t border-gray-200 dark:border-slate-700"
        >
          {/* charts */}
          <CityCategoPlaceChart />
        </div>
      </section>

      {/* ================= EDIT MODAL ================= */}
      {cityEditId && (
        <EditCity
          id={cityEditId}
          onClose={() => {
            setCityEditId(null);
            refetch();
          }}
        />
      )}
    </>
  );
};
