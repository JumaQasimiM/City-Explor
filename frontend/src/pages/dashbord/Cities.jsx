import { useState, useMemo } from "react";
import { useCities, useDeleteCity, useCreateCity } from "../../hooks/useCities";
import { useCountries } from "../../hooks/useCountry";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { NotFoundData } from "../../components/helper/NotFoundData";

import { toast } from "react-toastify";

export const Cities = () => {
  // stats
  const [cityName, setCityName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [showError, setShowError] = useState("");
  // use hooks to fetch data
  const { cities, loading, error, hasCity, refetch } = useCities();
  const { countries } = useCountries();
  // usecreateCity hook to create new city
  const { createCity, error: createError } = useCreateCity();

  // lookup map (best practice)
  const countryMap = useMemo(() => {
    return Object.fromEntries((countries || []).map((c) => [c.id, c.name]));
  }, [countries]);

  // ==================== post / save data ====================
  const handleCitySubmit = async (e) => {
    e.preventDefault();

    if (!cityName.trim()) {
      return setShowError("City name is required.");
    }
    if (cityName.length > 15) {
      return setShowError("Enter valid name (max.15char)");
    }

    if (!countryId) {
      return setShowError("please select a country");
    }

    // else
    setShowError("");

    // save to database/

    try {
      await createCity({ name: cityName, country_id: countryId });
      refetch(); // re-rendeer the componet / refetch data from api
      // show success
      toast.success("city added successfully");
      setCityName("");
      setCountryId("");
    } catch (error) {
      toast.error("Failed to create city");
    }
  };
  // ========================================================

  // ================= delete city ========================
  const {
    deleteCity,
    error: deleteError,
    loading: deleteLoading,
  } = useDeleteCity();

  const handleDelete = async (id) => {
    const success = await deleteCity(id);

    if (success) {
      toast.success("City removed successfully");
      refetch();
    } else {
      toast.error("Failed to delete city");
    }
  };

  // ===============================================================
  // show error and loading
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="">
      <div className="bg-gray-900 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">Cities</h1>

        {/* show error */}
        {showError ? <span className="text-red-600">{showError}</span> : ""}

        {/* Add city form */}
        <form
          onSubmit={handleCitySubmit}
          className="flex flex-col md:flex-row gap-3 mb-6"
        >
          <input
            className="flex-2 px-3 py-2 rounded border border-gray-600
                       focus:ring-2 focus:ring-green-500 outline-none"
            type="text"
            placeholder="City name (e.g. Jaghori)"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />

          <select
            className="flex-1 px-3 py-2 rounded border border-gray-600 bg-gray-700
                       focus:ring-2 focus:ring-green-500 outline-none"
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
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
            disabled={loading}
            className="px-4 py-2 bg-green-700 rounded disabled:opacity-50"
          >
            Add City
          </button>
        </form>

        {/* city list */}
        <h2 className="font-medium mb-3">City List</h2>

        {!hasCity ? (
          <NotFoundData text="No cities found" />
        ) : (
          <ul className="space-y-2">
            {cities.map((city, idx) => (
              <li
                key={city.id}
                className="flex justify-between items-center
                           bg-gray-800 px-4 py-2 rounded"
              >
                <div className="flex justify-between gap-3.5 md:gap-10">
                  <div>{idx + 1}</div>
                  <div>
                    <p className="font-medium">{city.name}</p>
                    <p className="text-sm text-gray-400">
                      {countryMap[city.country_id] || "Unknown"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 text-sm">
                  <button className="text-blue-400 hover:underline">
                    Edit
                  </button>
                  <button
                    disabled={deleteLoading}
                    onClick={() => handleDelete(city.id)}
                    className="text-red-500 hover:underline disabled:opacity-50"
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
