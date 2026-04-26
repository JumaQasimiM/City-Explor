import { useMemo } from "react";
import { usePlaces } from "../../hooks/usePlaces";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export const PlacesChart = () => {
  const { places = [] } = usePlaces();

  /* ===== COUNT PLACES PER CATEGORY ===== */
  const chartData = useMemo(() => {
    const grouped = {};

    places.forEach((place) => {
      const category = place.category_detail?.name || "Unknown";

      grouped[category] = (grouped[category] || 0) + 1;
    });

    return Object.keys(grouped).map((cat) => ({
      name: cat,
      value: grouped[cat],
    }));
  }, [places]);

  /* ===== COLORS ===== */
  const COLORS = [
    "#14b8a6", // teal
    "#0ea5e9", // sky blue
    "#22c55e", // green
    "#06b6d4", // cyan
    "#3b82f6", // blue
  ];

  return (
    <section className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Places by Category
        </h2>
        <p className="text-sm text-gray-500">
          Distribution of places (Hospital, Restaurant, etc.)
        </p>
      </div>

      {/* CHART */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={55}
              paddingAngle={3}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
