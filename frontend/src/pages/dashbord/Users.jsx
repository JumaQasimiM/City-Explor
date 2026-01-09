import { useEffect, useState } from "react";
import { useActiveUser, useUsers } from "../../hooks/useUsers";
import { NotFoundData } from "../../components/helper/NotFoundData";
import { ErrorMessage } from "../../components/helper/Error";
import { Loader } from "../../components/helper/Loading";
import { toast } from "react-toastify";
export const Users = () => {
  const { users, error, loading, hasUsers, refetch } = useUsers();
  const { activeUser } = useActiveUser();
  // handleUserStatus
  const handleActivate = async (id) => {
    const resualt = await activeUser(id);
    if (resualt) {
      toast.success("User activated successfully");
      refetch();
    } else {
      toast.error(error.message || "Failed to acitve user");
    }
  };

  // show errror and laoding (helper)
  if (error) return <ErrorMessage />;
  if (loading) return <Loader />;

  return (
    <section className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="overflow-x-auto dark:bg-slate-900 bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
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
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {!hasUsers ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  <NotFoundData text="No users found" />
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-700">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.firstname}</td>
                  <td className="px-4 py-3">{user.lastname}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`py-1 px-2 rounded ${
                        user.role === "admin"
                          ? "bg-green-500 text-black/70 font-semibold"
                          : ""
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

                  <td className="px-4 py-3 cursor-pointer">
                    <button
                      onClick={() => handleActivate(user.id)}
                      disabled={user.status === "active" || loading}
                      className={`px-3 py-1 rounded text-sm
                                ${
                                  user.status === "active"
                                    ? "bg-gray-600 cursor-not-allowed text-green-200"
                                    : "bg-green-600 hover:bg-green-500 cursor-pointer"
                                }
                              `}
                    >
                      {user.status === "active" ? "Active" : "Activate"}
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
