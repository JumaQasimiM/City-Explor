import { useState, useMemo } from "react";
import { useCities, useDeleteCity, useCreateCity } from "../../hooks/useCities";
import { useCountries } from "../../hooks/useCountry";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { NotFoundData } from "../../components/helper/NotFoundData";
import { toast } from "react-toastify";
import { EditCity } from "./EditModals/EditCity";

export const Cities = () => {
  // ================= STATE =================
  const [cityName, setCityName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [formError, setFormError] = useState("");
  const [cityEditId, setCityEditId] = useState(null);

  // ================= DATA =================
  const { cities, loading, error, hasCity, refetch } = useCities();
  const { countries } = useCountries();
  const { createCity, loading: creating } = useCreateCity();
  const { deleteCity, loading: deleting } = useDeleteCity();

  // ================= COUNTRY MAP =================
  const countryMap = useMemo(() => {
    return Object.fromEntries((countries || []).map((c) => [c.id, c.name]));
  }, [countries]);

  // ================= HANDLERS =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName.trim()) return setFormError("City name is required");
    if (cityName.length > 15) return setFormError("Max 15 characters allowed");
    if (!countryId) return setFormError("Select a country");

    setFormError("");

    const success = await createCity({
      name: cityName.trim(),
      country_id: countryId,
    });

    if (success) {
      toast.success("City added");
      setCityName("");
      setCountryId("");
      refetch();
    } else {
      toast.error("Failed to add city");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this city?")) return;

    const success = await deleteCity(id);
    success ? toast.success("City deleted") : toast.error("Delete failed");
    success && refetch();
  };

  // ================= LOADING / ERROR =================
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <section className="bg-white/70 dark:bg-slate-800 rounded lg:p-6 space-y-6">
        {/* ===== ADD CITY FORM ===== */}
        <form
          onSubmit={handleSubmit}
          className="bg-teal-800 p-4 rounded flex flex-col gap-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
            <input
              type="text"
              placeholder="City name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="px-3 py-2 rounded border border-gray-400
            focus:ring-2 focus:ring-green-400 outline-none bg-transparent text-white"
            />
            <select
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
              className="px-3 py-2 rounded bg-teal-700 border border-teal-600
            focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled={creating || !cityName || !countryId}
            className="bg-green-600 hover:bg-green-700 w-full md:w-1/4
            disabled:opacity-50 rounded text-white font-medium px-5 py-2"
          >
            {creating ? "Adding..." : "Add City"}
          </button>

          {formError && (
            <p className="md:col-span-3 text-sm text-red-300">{formError}</p>
          )}
        </form>

        {/* ===== CITY LIST ===== */}
        {!hasCity ? (
          <NotFoundData text="No cities found" />
        ) : (
          <ul className="grid gap-3">
            {cities.map((city, index) => (
              <li
                key={city.id}
                className="flex justify-between items-center
                bg-teal-700 p-4 rounded"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="w-8 h-8 flex items-center justify-center
                    rounded-full bg-green-400 text-sm font-semibold"
                  >
                    {index + 1}
                  </span>

                  <div>
                    <p className="font-medium">{city.name}</p>
                    <p className="text-xs text-gray-300">
                      {countryMap[city.country_id] || "Unknown"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCityEditId(city.id)}
                    className="px-3 py-1 rounded bg-sky-500 hover:bg-sky-600 text-black"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(city.id)}
                    disabled={deleting}
                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-600
                    disabled:opacity-50 text-black"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

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
