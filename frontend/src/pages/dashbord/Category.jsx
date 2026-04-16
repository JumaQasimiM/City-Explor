import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
} from "../../hooks/useCategories";
import { toast } from "react-toastify";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { NotFoundData } from "../../components/helper/NotFoundData";
import { EditCategory } from "./EditModals/EditCategory";

export const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);

  const { categories, error, loading, refetch } = useCategories();
  const { createCategory, loading: createLoading } = useCreateCategory();
  const { deleteCategory, loading: deleteLoading } = useDeleteCategory();

  /* ================= ADD ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    const success = await createCategory({ title: categoryName.trim() });

    if (success) {
      toast.success("Category created successfully");
      setCategoryName("");
      refetch();
    } else {
      toast.error("Failed to create category");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const success = await deleteCategory(id);

    if (success) {
      toast.success("Category deleted");
      refetch();
    } else {
      toast.error("Failed to delete category");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (id) => setEditCategoryId(id);

  const closeEditModal = () => {
    setEditCategoryId(null);
    refetch();
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <>
      <section className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            Category Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create, edit, and manage place categories
          </p>
        </div>

        {/* ================= ADD CATEGORY ================= */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 mb-8 bg-slate-100 dark:bg-slate-700/40 p-4 rounded-lg"
        >
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category name"
            className="flex-1 px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            disabled={createLoading || !categoryName.trim()}
            className="px-6 py-2 rounded-md bg-teal-600 text-white font-medium hover:bg-teal-700 transition disabled:opacity-50"
          >
            {createLoading ? "Adding..." : "Add Category"}
          </button>
        </form>

        {/* ================= LIST ================= */}
        {!categories.length ? (
          <NotFoundData text="No categories found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm text-slate-500 dark:text-slate-400 border-b border-slate-400 dark:border-slate-700">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Category Name</th>
                  <th className="py-3 px-2">total Place</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category, index) => (
                  <tr
                    key={category.id}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
                  >
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-300">
                      {index + 1}
                    </td>

                    <td className="py-3 px-2 font-medium text-slate-800 dark:text-white">
                      {category.title}
                    </td>
                    <td className="py-3 px-2 font-medium text-slate-800 dark:text-white">
                      {category.totle_place_per_category}
                    </td>

                    <td className="py-3 px-2">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleEdit(category.id)}
                          className="p-2 rounded-md text-blue-500 hover:bg-blue-500/10 transition"
                        >
                          <FaEdit size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(category.id)}
                          disabled={deleteLoading}
                          className="p-2 rounded-md text-red-500 hover:bg-red-500/10 transition disabled:opacity-50"
                        >
                          {deleteLoading ? (
                            "..."
                          ) : (
                            <MdDeleteForever size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ================= EDIT MODAL ================= */}
      {editCategoryId && (
        <EditCategory id={editCategoryId} onClose={closeEditModal} />
      )}
    </>
  );
};
