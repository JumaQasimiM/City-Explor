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

  // ADD CATEGORY
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

  // DELETE CATEGORY
  const handleDelete = async (id) => {
    const success = await deleteCategory(id);

    if (success) {
      toast.success("Category deleted successfully");
      refetch();
    } else {
      toast.error("Failed to delete category");
    }
  };

  // EDIT CATEGORY
  const handleEdit = (id) => {
    setEditCategoryId(id);
  };

  const closeEditModal = () => {
    setEditCategoryId(null);
    refetch();
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <>
      <section className="md:p-6 bg-white/70 dark:bg-slate-800 rounded-lg">
        {/* ADD CATEGORY */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mb-6 bg-teal-800 p-4 rounded"
        >
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 px-4 py-2 rounded outline-none border border-gray-400"
          />

          <button
            type="submit"
            disabled={createLoading || !categoryName.trim()}
            className="bg-green-600 px-5 py-2 rounded text-white disabled:opacity-50 w-full md:w-1/4"
          >
            {createLoading ? "Adding..." : "Add"}
          </button>
        </form>

        {/* CATEGORY LIST */}
        {!categories.length ? (
          <NotFoundData text="No category found" />
        ) : (
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={category.id}
                className="flex justify-between items-center bg-teal-700 px-2 md:px-4 py-3 rounded"
              >
                <div className="flex gap-4 text-white">
                  <span>{index + 1}</span>
                  <span>{category.name}</span>
                </div>

                <div className="flex md:gap-2">
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="px-3 py-1 rounded text-black cursor-pointer hover:scale-109 hover:text-blue-200"
                  >
                    <FaEdit size={23} />
                  </button>

                  <button
                    onClick={() => handleDelete(category.id)}
                    disabled={deleteLoading}
                    className="px-3 py-1 rounded text-red-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-109 hover:text-red-900"
                  >
                    {deleteLoading ? (
                      "Deleting..."
                    ) : (
                      <MdDeleteForever size={23} className="" />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* EDIT MODAL */}
      {editCategoryId && (
        <EditCategory id={editCategoryId} onClose={closeEditModal} />
      )}
    </>
  );
};
