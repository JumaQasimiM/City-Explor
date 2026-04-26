import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash, FaUserCheck } from "react-icons/fa";

import { BASE_URL } from "../../api/ApiUrl";

import { useActiveUser, useDeleteUser, useUsers } from "../../hooks/useUsers";
import { NotFoundData } from "../../components/helper/NotFoundData";
import { ErrorMessage } from "../../components/helper/Error";
import { Loader } from "../../components/helper/Loading";

// chart component
import { UsersChart } from "../../components/dashboardComponent/UsersChart";
export const Users = () => {
  /* ================= STATE ================= */
  const [searchUser, setSearchUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  /* ================= DATA ================= */
  const { users, error, loading, refetch } = useUsers();
  const { deleteUser, loading: deleting } = useDeleteUser();
  const { activeUser } = useActiveUser();

  /* ================= ACTIVATE ================= */
  const handleActivate = async (id) => {
    const success = await activeUser(id);
    success
      ? toast.success("User activated successfully")
      : toast.error("Activation failed");
    success && refetch();
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const success = await deleteUser(id);
    success ? toast.success("User deleted") : toast.error("Delete failed");
    success && refetch();
  };

  /* ================= FILTER ================= */
  useEffect(() => {
    const query = searchUser.toLowerCase();

    setFilteredUsers(
      users.filter(
        (u) =>
          u.first_name?.toLowerCase().includes(query) ||
          u.last_name?.toLowerCase().includes(query) ||
          u.email?.toLowerCase().includes(query) ||
          u.role?.toLowerCase().includes(query) ||
          u.created_at?.toLowerCase().includes(query),
      ),
    );
  }, [users, searchUser]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            User Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage registered users and account status
          </p>
        </div>

        <Link
          to="/register"
          className="bg-indigo-600 hover:bg-indigo-700 text-white
          px-6 py-2 rounded-md font-medium text-center transition"
        >
          + Add User
        </Link>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        type="text"
        placeholder="Search by name, email, role or date"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 rounded-md border
        dark:border-slate-600 bg-white dark:bg-slate-700
        focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      {/* ================= TABLE ================= */}
      {filteredUsers.length === 0 ? (
        <NotFoundData text="No users found" />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">First Name</th>
                <th className="px-4 py-3 text-left">Last Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">BIO</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y dark:divide-slate-700">
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-100 dark:hover:bg-slate-700/40 transition"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.first_name}</td>
                  <td className="px-4 py-3">{user.last_name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <img
                      src={`${BASE_URL}${user.avatar}`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold text-white
                      ${
                        user.role === "admin" ? "bg-teal-600" : "bg-purple-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3">{user.bio}</td>

                  {/* STATUS */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleActivate(user.id)}
                      disabled={user.status === "active"}
                      className={`px-3 py-1 rounded-md text-xs font-semibold
                      ${
                        user.status === "active"
                          ? "bg-gray-400 text-green-900 cursor-not-allowed"
                          : "bg-orange-500 hover:bg-orange-600 text-black"
                      }`}
                    >
                      {user.status === "active" ? "Active" : "Pending"}
                    </button>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={deleting}
                        className="p-2 rounded-md text-red-500
                        hover:bg-red-500/10 transition disabled:opacity-50"
                      >
                        <FaTrash size={16} />
                      </button>

                      {user.status !== "active" && (
                        <button
                          onClick={() => handleActivate(user.id)}
                          className="p-2 rounded-md text-green-600
                          hover:bg-green-600/10 transition"
                        >
                          <FaUserCheck size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <UsersChart />
    </section>
  );
};
