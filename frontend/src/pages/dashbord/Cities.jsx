import { useEffect, useState } from "react";

export const Cities = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cityName, setCityName] = useState("");

  // fetch cities
  useEffect(() => {
    fetch("http://localhost:3000/cities")
      .then((res) => res.json())
      .then(setCities)
      .catch(console.error);
  }, []);
  // fetch countries
  useEffect(() => {
    fetch("http://localhost:3000/countries")
      .then((res) => res.json())
      .then(setCountries)
      .catch(console.error);
  }, []);
  // create lookup map (best practice) xxxxx
  const countryMap = Object.fromEntries(countries.map((c) => [c.id, c.name]));

  //   handle city

  const handlCitySubmit = (e) => {
    e.preventDefault();
    useEffect(() => {
      fetch("http://localhost:3000/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: cityName,
      });
    }, []);
  };
  return (
    <section className="grid grid-cols-1 md:grid-cols-1 gap-6 p-6">
      {/* ================= city section ================= */}
      <div className="bg-gray-900 rounded-lg shadow p-5">
        <h1 className="text-xl font-semibold mb-3">City</h1>

        <form className="flex gap-3 mb-4" onSubmit={handlCitySubmit}>
          <input
            className="flex-1 px-3 py-2 border border-gray-600 rounded
                       focus:ring-1 focus:ring-green-500 outline-none"
            type="text"
            placeholder="City name (Jaghori)"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-700 rounded hover:bg-green-600"
          >
            Add
          </button>
        </form>
        {/* show city inlist  */}
        <h2 className="font-medium mb-2">City List</h2>
        <ul className="space-y-1">
          {cities.map((c) => (
            <li
              key={c.id}
              className="flex justify-between bg-gray-800 px-3 py-2 rounded"
            >
              <span>{c.name}</span>
              <span className="text-sm text-gray-400">
                {countryMap[c.country_id] || "Unknown"}
              </span>

              {/* country  */}
              <div className="flex gap-3">
                <span className="cursor-pointer">edit</span>
                <span className="text-red-700 cursor-pointer">delete</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
