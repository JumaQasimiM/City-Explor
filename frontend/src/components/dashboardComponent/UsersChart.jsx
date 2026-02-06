import {
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { useUsers } from "../../hooks/useUsers";

export const UsersChart = () => {
  const { users } = useUsers();

  // group users by role
  const roleCount = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  // convert to chart data
  const data = Object.keys(roleCount).map((role) => ({
    role,
    count: roleCount[role],
  }));

  return (
    <section className="bg-gradient-to-r from-sky-700 to-sky-500 rounded-xl p-4">
      <h1 className="text-xl font-semibold text-white mb-4">Users by Role</h1>

      <div className="w-full h-[300px] bg-white rounded-lg p-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="role" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#0284c7"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
