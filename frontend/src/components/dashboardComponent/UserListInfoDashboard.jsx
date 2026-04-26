import { useUsers } from "../../hooks/useUsers";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { FaUser } from "react-icons/fa";
import { BASE_URL } from "../../api/ApiUrl";

export const UserListInfoDashboard = () => {
  const { users = [], error, loading } = useUsers();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section
      className="
      bg-white dark:bg-slate-800
      border border-gray-200 dark:border-slate-700
      rounded shadow-sm w-full overflow-hidden"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Users List
          </h2>
          <p className="text-sm text-gray-500">Manage all registered users</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto max-h-[500px]">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-300">
            <tr className="text-left border-b border-gray-200 dark:border-slate-700">
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3 text-center">Status</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {users.map((user, idx) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-700/40 transition"
              >
                {/* INDEX */}
                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {idx + 1}
                </td>

                {/* USER */}
                <td className="px-5 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center text-xs font-bold text-gray-700 dark:text-white">
                    {user.avatar ? (
                      <img
                        src={`${BASE_URL}${user.avatar}`}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-gray-500 dark:text-gray-300 text-sm" />
                    )}
                  </div>

                  <span className="text-gray-800 dark:text-white font-medium">
                    {user.first_name} {user.last_name}
                  </span>
                </td>

                {/* EMAIL */}
                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {user.email}
                </td>

                {/* ROLE */}
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        user.role === "admin"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                          : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                      }`}
                  >
                    {user.role}
                  </span>
                </td>

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

                {/* ACTION */}
                <td className="px-5 py-4 text-center">
                  <button
                    className="
                    px-3 py-1.5 rounded-lg
                    bg-blue-600 hover:bg-blue-700
                    text-white text-xs font-medium
                    transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
