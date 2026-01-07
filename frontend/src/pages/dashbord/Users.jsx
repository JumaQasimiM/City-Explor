import { useEffect, useState } from "react";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        setUsers(data || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  // handleUserStatus
  const handleUserStatus = () => {
    // not completet
    users.status = "acrive";
    alert("active");
  };
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
            {users.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No users found
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

                  <td
                    className="px-4 py-3 cursor-pointer"
                    onClick={handleUserStatus}
                  >
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium
                        ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : user.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
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
