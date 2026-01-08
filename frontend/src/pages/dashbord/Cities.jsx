import { useState } from "react";
import { useCities } from "../../hooks/useCities";
import { useCountries } from "../../hooks/useCountry";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { NotFoundData } from "../../components/helper/NotFoundData";

export const Cities = () => {
  // stats
  const [cityName, setCityName] = useState("");
  const [countryId, setCountryId] = useState("");

  // use hooks to fetch data
  const { cities, loading, error, hasCity } = useCities();
  const { countries } = useCountries();

  // lookup map (best practice)
  const countryMap = Object.fromEntries(countries.map((c) => [c.id, c.name]));

  // post / save data
  const handleCitySubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !countryId) return;

    await fetch("http://localhost:3000/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cityName,
        country_id: Number(countryId),
      }),
    });

    setCityName("");
    setCountryId("");
  };

  // show error and loading
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="p-4 md:p-6">
      <div className="bg-gray-900 rounded-lg shadow p-5">
        <h1 className="text-xl font-semibold mb-4">Cities</h1>

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
            className="px-4 py-2 bg-green-700 rounded hover:bg-green-600"
          >
            Add City
          </button>
        </form>

        {/* City list */}
        <h2 className="font-medium mb-3">City List</h2>

        {hasCity ? (
          <NotFoundData text="No cities found" />
        ) : (
          <ul className="space-y-2">
            {cities.map((city) => (
              <li
                key={city.id}
                className="flex justify-between items-center
                           bg-gray-800 px-4 py-2 rounded"
              >
                <div>
                  <p className="font-medium">{city.name}</p>
                  <p className="text-sm text-gray-400">
                    {countryMap[city.country_id] || "Unknown"}
                  </p>
                </div>

                <div className="flex gap-3 text-sm">
                  <button className="text-blue-400 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
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
