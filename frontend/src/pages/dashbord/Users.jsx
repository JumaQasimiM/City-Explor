import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useActiveUser, useDeleteUser, useUsers } from "../../hooks/useUsers";

import { NotFoundData } from "../../components/helper/NotFoundData";
import { ErrorMessage } from "../../components/helper/Error";
import { Loader } from "../../components/helper/Loading";

export const Users = () => {
  const [searchUser, setSearchUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { users, error, loading, refetch } = useUsers();
  const {
    deleteUser,
    error: deleteError,
    loading: deleteLoading,
  } = useDeleteUser();
  const { activeUser } = useActiveUser();

  // ================= ACTIVATE USER =================
  const handleActivate = async (id) => {
    const result = await activeUser(id);
    if (result) {
      toast.success("User activated successfully");
      refetch();
    } else {
      toast.error("Failed to activate user");
    }
  };

  // ================= DELETE USER =================
  const handleDelete = async (id) => {
    const result = await deleteUser(id);
    if (result) {
      toast.success("User deleted successfully");
      refetch();
    } else {
      toast.error(deleteError || "Failed to delete user");
    }
  };

  // ================= LOAD USERS =================
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // ================= SEARCH USERS =================
  useEffect(() => {
    const query = searchUser.toLowerCase();

    const result = users.filter(
      (user) =>
        user.firstname?.toLowerCase().includes(query) ||
        user.lastname?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.role?.toLowerCase().includes(query) ||
        user.created_at?.toLowerCase().includes(query)
    );

    setFilteredUsers(result);
  }, [users, searchUser]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <section className="p-3 md:p-6 bg-white/70 dark:bg-slate-800 rounded">
      {/* ================= TOP BAR ================= */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <Link
          to="/register"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 font-semibold text-center rounded"
        >
          Add user
        </Link>

        <input
          type="text"
          placeholder="Search by name, email, role or date"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 border rounded
          focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* ================= TABLE ================= */}
      {filteredUsers.length === 0 ? (
        <NotFoundData text="No users found" />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left uppercase">#</th>
                <th className="px-6 py-3 text-left uppercase">First Name</th>
                <th className="px-6 py-3 text-left uppercase">Last Name</th>
                <th className="px-6 py-3 text-left uppercase">Email</th>
                <th className="px-6 py-3 text-left uppercase">Role</th>
                <th className="px-6 py-3 text-left uppercase">Reg Date</th>
                <th className="px-6 py-3 text-left uppercase">SQA1</th>
                <th className="px-6 py-3 text-left uppercase">SQA2</th>
                <th className="px-6 py-3 text-center uppercase">Actions</th>
                <th className="px-6 py-3 text-center uppercase">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y dark:divide-slate-700">
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.firstname}</td>
                  <td className="px-4 py-3">{user.lastname}</td>
                  <td className="px-4 py-3">{user.email}</td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded text-sm font-semibold bg-teal-600 text-white">
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
                      onClick={() => handleDelete(user.id)}
                      disabled={deleteLoading}
                      className="px-3 py-1 rounded text-sm font-semibold bg-red-600 hover:bg-red-500 text-white disabled:opacity-50"
                    >
                      {deleteLoading ? "Loading..." : "Delete"}
                    </button>
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => handleActivate(user.id)}
                      disabled={user.status === "active"}
                      className={`px-3 py-1 rounded text-sm font-semibold transition ${
                        user.status === "active"
                          ? "bg-gray-500 cursor-not-allowed text-green-200"
                          : "bg-orange-500 hover:bg-orange-600 text-gray-900"
                      }`}
                    >
                      {user.status === "active" ? "Active" : "Pending"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
