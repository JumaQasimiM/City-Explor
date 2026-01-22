import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useCountryById, useEditCountry } from "../../../hooks/useCountry";
import { toast } from "react-toastify";
export const EditCountry = ({ id, onClose }) => {
  const [newCountry, setNewCountry] = useState("");
  const { data: country } = useCountryById(id);
  const { updateCountry, error, loading } = useEditCountry();
  useEffect(() => {
    if (country) {
      setNewCountry(country.name);
    }
  }, [country]);
  //   handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateCountry(id, { name: newCountry });
    if (success) {
      toast.success("Country updated successfully");
    } else {
      toast.error("Failed to update");
    }
    onClose();
  };
  if (!country) return null;
  return (
    <section className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative bg-teal-800 p-8 w-full max-w-md rounded"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl p-1 bg-red-700 rounded-full cursor-pointer"
        >
          <FaXmark />
        </button>
        <h1 className="text-white text-xl mb-4">Edit Country</h1>
        <input
          type="text"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
          className="w-full px-4 py-2 rounded outline-none border "
        />
        {error && <p className="text-red-400 mt-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-sky-600 hover:bg-sky-500 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </section>
  );
};
