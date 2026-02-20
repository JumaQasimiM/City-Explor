import { useEffect, useState } from "react";
import { useCategoryById, useEditCategory } from "../../../hooks/useCategories";
import { FaXmark } from "react-icons/fa6";
import { Loader } from "../../../components/helper/Loading";
import { ErrorMessage } from "../../../components/helper/Error";
export const EditCategory = ({ id, onClose }) => {
  const { data: category } = useCategoryById(id);
  const { updateCategory, loading, error } = useEditCategory();

  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await updateCategory(id, { name });
    if (success) {
      onClose();
    }
  };

  if (!category) return null;
  // =========== error and laoding
  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <section className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative bg-teal-800 p-8 rounded-lg w-full max-w-md"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl cursor-pointer bg-red-500 rounded-full p-1"
        >
          <FaXmark />
        </button>

        <h2 className="text-white text-xl mb-4">Edit Category</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded outline-none border"
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
