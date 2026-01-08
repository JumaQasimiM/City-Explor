import { useState } from "react";

// hooks
import { useCountries } from "../../hooks/useCountry";
// helper components
import { ErrorMessage } from "../../components/helper/Error";
import { Loader } from "../../components/helper/Loading";
import { NotFoundData } from "../../components/helper/NotFoundData";

export const Country = () => {
  const [countryName, setCountryName] = useState("");

  // custom hook
  const { countries, error, loading, hasCountry } = useCountries();

  // add new country
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // show errror and laoding (helper)
  if (error) return <ErrorMessage />;
  if (loading) return <Loader />;

  return (
    <section>
      <h1>Country </h1>
      <div className="bg-gray-900 rounded-lg shadow p-5">
        {/* add new country */}

        <h1 className="text-xl font-semibold mb-3">Country</h1>

        <form className="flex gap-3 mb-4" onSubmit={handleSubmit}>
          <input
            className="flex-1 px-3 py-2 border border-gray-600 rounded
                       focus:ring-1 focus:ring-green-500 outline-none"
            type="text"
            placeholder="Country name (Afghanistan)"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-700 rounded hover:bg-green-600"
          >
            Add
          </button>
        </form>

        {/* show in list */}
        <h2 className="font-medium mb-2">Country List</h2>
        <ul className="space-y-1">
          {hasCountry ? (
            // show not found data
            <NotFoundData text="No Countries found. " />
          ) : (
            countries.map((c) => (
              <div>
                <li
                  key={c.id}
                  className="bg-gray-800 px-3 py-2 rounded flex justify-between"
                >
                  {c.name}
                  <span className="text-red-500 cursor-pointer">delete</span>
                </li>
              </div>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};
