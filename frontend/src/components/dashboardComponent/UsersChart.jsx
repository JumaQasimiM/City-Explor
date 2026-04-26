import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { useUsers } from "../../hooks/useUsers";

const COLORS = [
  "#111827", // black (primary)
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // yellow
  "#ef4444", // red
];

export const UsersChart = () => {
  const { users = [] } = useUsers();

  /* ===== GROUP USERS BY ROLE ===== */
  const roleCount = users.reduce((acc, user) => {
    const role = user.role || "Unknown";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(roleCount).map((role) => ({
    name: role,
    value: roleCount[role],
  }));

  return (
    <section className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Users by Role
        </h2>
        <p className="text-sm text-gray-500">Distribution of user roles</p>
      </div>

      {/* ===== CHART ===== */}
      <div className="w-full h-[320px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70} // donut style
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            {/* TOOLTIP */}
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ===== LEGEND (CUSTOM) ===== */}
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-gray-700 dark:text-gray-300">
              {item.name}
            </span>
            <span className="ml-auto text-gray-500">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
