import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
} from "../../hooks/useCategories";
import { toast } from "react-toastify";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { NotFoundData } from "../../components/helper/NotFoundData";

export const Category = () => {
  const [categoryName, setCategoryName] = useState("");

  const { categories, error, loading, refetch } = useCategories();
  const { createCategory, loading: createLoading } = useCreateCategory();
  const { deleteCategory, loading: deleteLoading } = useDeleteCategory();

  // ================= ADD CATEGORY =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    const success = await createCategory({ name: categoryName.trim() });

    if (success) {
      toast.success("Category created successfully");
      setCategoryName("");
      refetch();
    } else {
      toast.error("Failed to create category");
    }
  };

  // ================= DELETE CATEGORY =================
  const handleDelete = async (id) => {
    const success = await deleteCategory(id);

    if (success) {
      toast.success("Category deleted successfully");
      refetch();
    } else {
      toast.error("Failed to delete category");
    }
  };

  // ================= LOADING / ERROR =================
  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <section className="p-3 md:p-6 bg-white/70 dark:bg-slate-800 rounded-lg">
      {/* ================= ADD FORM ================= */}
      <div className="mb-6 p-4 bg-teal-800 rounded-lg shadow-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3"
        >
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md
              border border-gray-400 text-gray-100
              focus:ring-2 focus:ring-green-400 outline-none"
          />

          <button
            type="submit"
            disabled={createLoading}
            className="flex items-center gap-2
              px-5 py-2 rounded-md
              bg-green-600 hover:bg-green-700
              text-white font-semibold
              transition disabled:opacity-50"
          >
            <IoMdAdd size={18} />
            {createLoading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>

      {/* ================= CATEGORY LIST ================= */}
      {!categories.length ? (
        <NotFoundData text="No category found" />
      ) : (
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li
              key={category.id}
              className="flex justify-between items-center
                px-4 py-3 rounded-lg bg-teal-700 dark:bg-slate-900
                hover:bg-teal-600 dark:hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-6">
                <span className="font-semibold text-white">{index + 1}</span>
                <p className="font-medium text-white">{category.name}</p>
              </div>

              <div className="flex gap-3">
                <button className="bg-sky-500 hover:bg-sky-600 text-white py-1 px-3 rounded-md transition">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(category.id)}
                  disabled={deleteLoading}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition disabled:opacity-50"
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
