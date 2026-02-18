import { useUsers } from "../../hooks/useUsers";

import avatorImage from "../../assets/hero.jpeg";

import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
export const UserListInfoDashboard = () => {
  const { users, error, loading, hasUsers, refetch } = useUsers();

  /* ================= LOADING / ERROR ================= */
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="bg-white dark:bg-slate-800 rounded shadow-lg w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Users List
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Manage all registered users
        </span>
      </div>

      {/* Scrollable Table Container */}
      <div className="overflow-x-auto overflow-y-auto max-h-[450px] w-full">
        <table className="min-w-[900px] w-full border-collapse divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-900 text-gray-100 dark:bg-sky-900 dark:text-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-medium uppercase tracking-wider">
                #
              </th>
              <th className="px-5 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-5 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Role
              </th>
              <th className="px-5 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-5 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Image
              </th>
              <th className="px-5 py-3 text-center text-sm font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-center text-sm font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-50 dark:bg-slate-900 divide-y divide-gray-300 dark:divide-gray-700">
            {users.map((user, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                  {idx + 1}
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                  {user.firstname} {user.lastname}
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`${
                      user.role === "admin"
                        ? "bg-green-100 text-sky-500 dark:bg-green-900 dark:text-white"
                        : "bg-purple-100 text-sky-500 dark:bg-purple-800 dark:text-white"
                    } px-3 py-2 rounded text-xs font-semibold
                   `}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                  {user.dateOfBirth}
                </td>
                <td className="px-5 py-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-700 mx-auto object-contain">
                    <img src={avatorImage} alt="" />
                  </div>
                </td>
                <td className="px-5 py-3 text-center">
                  <span className="px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-center space-x-2">
                  <button className="px-2 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition">
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
