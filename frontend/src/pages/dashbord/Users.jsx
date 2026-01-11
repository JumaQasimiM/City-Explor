import { useState } from "react";
import { useActiveUser, useDeleteUser, useUsers } from "../../hooks/useUsers";
import { NotFoundData } from "../../components/helper/NotFoundData";
import { ErrorMessage } from "../../components/helper/Error";
import { Loader } from "../../components/helper/Loading";
import { toast } from "react-toastify";

export const Users = () => {
  const { users, error, loading, refetch } = useUsers();
  const { deleteUser, error: deleteError } = useDeleteUser();
  const { activeUser } = useActiveUser();

  const [userLoading, setUserLoading] = useState({});

  const handleActivate = async (id) => {
    setUserLoading((prev) => ({ ...prev, [id]: true }));
    const result = await activeUser(id);
    setUserLoading((prev) => ({ ...prev, [id]: false }));

    if (result) {
      toast.success("User activated successfully");
      refetch();
    } else {
      toast.error("Failed to activate user");
    }
  };

  const handleDelete = async (id) => {
    setUserLoading((prev) => ({ ...prev, [id]: true }));
    const result = await deleteUser(id);
    setUserLoading((prev) => ({ ...prev, [id]: false }));

    if (result) {
      toast.success("User deleted successfully");
      refetch();
    } else {
      toast.error(deleteError || "Failed to delete user");
    }
  };

  if (error) return <ErrorMessage />;
  if (loading) return <Loader />;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Users
      </h1>

      {/* Table container with horizontal scroll */}
      <div className="overflow-x-auto w-full rounded-lg shadow">
        <table className="min-w-[800px] bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">First Name</th>
              <th className="px-4 py-3 text-left">Last Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-left">Security Q1</th>
              <th className="px-4 py-3 text-left">Security Q2</th>
              <th className="px-4 py-3 text-center">Actions</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  <NotFoundData text="No users found" />
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.firstname}</td>
                  <td className="px-4 py-3">{user.lastname}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-sm font-semibold ${
                        user.role === "admin"
                          ? "bg-green-500 text-black/80"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {user.role || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{user.created_at || "-"}</td>
                  <td className="px-4 py-3">
                    {user.securityQuestions?.[0]?.answer || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {user.securityQuestions?.[1]?.answer || "-"}
                  </td>

                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleActivate(user.id)}
                      disabled={
                        user.status === "active" || userLoading[user.id]
                      }
                      className={`px-3 py-1 rounded text-sm font-semibold transition ${
                        user.status === "active"
                          ? "bg-gray-500 cursor-not-allowed text-green-200"
                          : "bg-green-600 hover:bg-green-500 text-white"
                      }`}
                    >
                      {userLoading[user.id]
                        ? "Loading..."
                        : user.status === "active"
                        ? "Active"
                        : "Activate"}
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={userLoading[user.id]}
                      className="px-3 py-1 rounded text-sm font-semibold bg-red-600 hover:bg-red-500 text-white transition"
                    >
                      {userLoading[user.id] ? "Loading..." : "Delete"}
                    </button>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        user.status === "active"
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {user.status}
                    </span>
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
