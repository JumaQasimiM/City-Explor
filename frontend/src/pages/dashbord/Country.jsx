import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCountries,
  useCreateCountry,
  useDeleteCountry,
} from "../../hooks/useCountry";
import { ErrorMessage } from "../../components/helper/Error";
import { Loader } from "../../components/helper/Loading";
import { NotFoundData } from "../../components/helper/NotFoundData";

export const Country = () => {
  const [countryName, setCountryName] = useState("");

  const { countries, error, loading, hasCountry, refetch } = useCountries();

  const { createCountry, loading: createLoading } = useCreateCountry();

  const { deleteCountry, loading: deleteLoading } = useDeleteCountry();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCountry({ name: countryName });
      setCountryName("");
      toast.success("Country created successfully");
      refetch();
    } catch {
      toast.error("Failed to create country");
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteCountry(id);
    if (success) {
      toast.success("Country deleted successfully");
      refetch();
    } else {
      toast.error("Failed to delete country");
    }
  };

  if (error) return <ErrorMessage />;
  if (loading) return <Loader />;

  return (
    <section>
      <h1>Country</h1>

      <div className="bg-gray-900 rounded-lg shadow p-5">
        <form className="flex gap-3 mb-4" onSubmit={handleSubmit}>
          <input
            className="flex-1 px-3 py-2 border border-gray-600 rounded"
            type="text"
            placeholder="Country name (Afghanistan)"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />

          <button
            type="submit"
            disabled={createLoading || !countryName.trim()}
            className="px-4 py-2 bg-green-700 rounded disabled:opacity-50"
          >
            {createLoading ? "Adding..." : "Add"}
          </button>
        </form>

        <h2 className="font-medium mb-2">Country List</h2>

        {!hasCountry ? (
          <NotFoundData text="No Countries found." />
        ) : (
          <ul className="space-y-1">
            {countries.map((c) => (
              <li
                key={c.id}
                className="bg-gray-800 px-3 py-2 rounded flex justify-between"
              >
                {c.name}
                <span
                  onClick={() => handleDelete(c.id)}
                  className="text-red-500 cursor-pointer"
                >
                  {deleteLoading ? "..." : "delete"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
