import { useState, useMemo } from "react";
import { useCities, useDeleteCity, useCreateCity } from "../../hooks/useCities";
import { useCountries } from "../../hooks/useCountry";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { NotFoundData } from "../../components/helper/NotFoundData";
import { toast } from "react-toastify";

export const Cities = () => {
  // ================= STATE =================
  const [cityName, setCityName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [formError, setFormError] = useState("");

  // ================= DATA =================
  const { cities, loading, error, hasCity, refetch } = useCities();
  const { countries } = useCountries();
  const { createCity, loading: createLoading } = useCreateCity();
  const { deleteCity, loading: deleteLoading } = useDeleteCity();

  // ================= COUNTRY LOOKUP MAP =================
  const countryMap = useMemo(() => {
    return Object.fromEntries(
      (countries || []).map((country) => [country.id, country.name])
    );
  }, [countries]);

  // ================= ADD CITY =================
  const handleCitySubmit = async (e) => {
    e.preventDefault();

    if (!cityName.trim()) {
      return setFormError("City name is required");
    }

    if (cityName.length > 15) {
      return setFormError("City name must be max 15 characters");
    }

    if (!countryId) {
      return setFormError("Please select a country");
    }

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
      toast.error("Failed to create city");
    }
  };

  // ================= DELETE CITY =================
  const handleDelete = async (id) => {
    const success = await deleteCity(id);

    if (success) {
      toast.success("City deleted successfully");
      refetch();
    } else {
      toast.error("Failed to delete city");
    }
  };

  // ================= LOADING / ERROR =================
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="p-3 md:p-6 bg-white/70 dark:bg-slate-800 rounded">
      {/* ================= ADD CITY FORM ================= */}
      <div className="mb-6 p-4 bg-teal-800 rounded">
        <form
          onSubmit={handleCitySubmit}
          className="flex flex-col md:flex-row gap-3"
        >
          <input
            type="text"
            placeholder="City name (e.g. Jaghori)"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="flex-1 px-3 py-2 rounded border border-gray-400
            focus:ring-2 focus:ring-green-300 outline-none text-gray-200"
          />

          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="flex-1 px-3 py-2 rounded border border-teal-600 bg-teal-700
            focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={createLoading}
            className="px-4 py-2 bg-green-700 rounded text-white
            disabled:opacity-50"
          >
            {createLoading ? "Adding..." : "Add City"}
          </button>
        </form>

        {formError && (
          <p className="mt-2 text-sm text-red-700 font-medium">{formError}</p>
        )}
      </div>

      {/* ================= CITY LIST ================= */}
      {!hasCity ? (
        <NotFoundData text="No cities found" />
      ) : (
        <ul className="space-y-2">
          {cities.map((city, index) => (
            <li
              key={city.id}
              className="flex justify-between items-center
              px-4 py-2 rounded bg-teal-700 dark:bg-slate-900"
            >
              <div className="flex gap-6">
                <span className="font-semibold">{index + 1}</span>

                <div>
                  <p className="font-medium">{city.name}</p>
                  <p className="text-sm dark:text-gray-500 text-gray-200">
                    {countryMap[city.country_id] || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                <button className=" bg-sky-500 hover:bg-sky-600 text-black py-1 px-2 rounded cursor-pointer">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(city.id)}
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
