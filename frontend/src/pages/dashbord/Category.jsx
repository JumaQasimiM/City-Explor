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

export const Category = () => {
  const [categoryName, setCategoryName] = useState("");

  const { categories, error, loading, refetch } = useCategories();
  const { createCategory, loading: createLoading } = useCreateCategory();
  const { deleteCategory } = useDeleteCategory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return toast.error("Category is required");

    try {
      await createCategory({ name: categoryName });
      toast.success("Category created successfully");
      setCategoryName("");
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };
  //   delete
  const handleDelete = async (cate_id) => {
    try {
      await deleteCategory(cate_id);
      refetch();
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <section className=" bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-4">Categories</h1>

      {/* Form to add category */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row md:items-center gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Enter Category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="flex-1 py-2 px-3 rounded border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex gap-2 items-center text-center bg-sky-700 py-2 px-4 rounded hover:bg-sky-600 disabled:opacity-50"
        >
          <IoMdAdd size={20} /> Add
        </button>
      </form>

      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 table-auto">
          <thead className="bg-gray-800 text-white/70 ">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Places</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-gray-800 divide-y divide-gray-700 text-white/80">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cate, idx) => (
                <tr key={cate.id} className="hover:bg-gray-700">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{cate.name}</td>
                  <td className="px-4 py-2">5</td>
                  <td className="px-4 py-2 flex gap-3 text-sm">
                    <button className="text-blue-400 hover:underline cursor-pointer">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cate.id)}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
