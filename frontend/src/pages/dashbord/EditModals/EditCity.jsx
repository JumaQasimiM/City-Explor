import { FaXmark } from "react-icons/fa6";
import { useCountries } from "../../../hooks/useCountry";
import { useCityById, useEditCity } from "../../../hooks/useCities";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../../../components/helper/Loading";
import { ErrorMessage } from "../../../components/helper/Error";

export const EditCity = ({ id, onClose }) => {
  const { data: city, loading, error } = useCityById(id);
  const { countries } = useCountries();
  const {
    updateCity,
    error: updateError,
    loading: updateLoading,
  } = useEditCity();

  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");

  // preload values
  useEffect(() => {
    if (city) {
      setName(city.name);
      setCountryId(city.country_id);
    }
  }, [city]);

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateCity(city.id, {
      name: name,
      country_id: countryId,
    });
    if (success) {
      toast.success("City updated successfully");
      onClose();
    } else {
      toast.error(error);
    }
  };

  // =========== error and laoding
  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;
  // update error and losing
  if (updateLoading) return <Loader />;
  if (updateError) return <ErrorMessage />;

  return (
    <section className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-teal-800 rounded p-6 space-y-4
        animate-fadeIn"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-white
          hover:bg-red-600 bg-red-700 rounded-full p-1"
        >
          <FaXmark size={18} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-white text-center">
          Edit City
        </h2>

        {/* City name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-200">City name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 rounded bg-transparent border border-gray-300
            focus:ring-2 focus:ring-green-400 outline-none text-white"
          />
        </div>

        {/* Country */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-200">Country</label>
          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="px-4 py-2 rounded bg-teal-700 border border-teal-600
            focus:ring-2 focus:ring-green-400 outline-none"
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded border border-gray-300
            text-gray-200 hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 py-2 rounded bg-sky-600
            hover:bg-sky-500 text-white font-medium"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
};
