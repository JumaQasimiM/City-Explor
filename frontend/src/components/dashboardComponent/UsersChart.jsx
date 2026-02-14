import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
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
    <section className="bg-gradient-to-r from-sky-700 to-sky-500 rounded p-4">
      <h1 className="text-md font-semibold mb-4 text-gray-300">
        Users by Role
      </h1>

      <div className="w-full h-[300px] bg-white rounded p-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="role" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#0284c7"
              strokeWidth={3}
              fill="#0284e1"
              activeDot={{ r: 7 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
