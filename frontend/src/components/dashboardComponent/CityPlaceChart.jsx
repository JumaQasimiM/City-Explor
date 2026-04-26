import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useCities } from "../../hooks/useCities";
import { usePlaces } from "../../hooks/usePlaces";
import { useCategories } from "../../hooks/useCategories";

const COLORS = ["#14b8a6", "#0ea5e9", "#22c55e", "#06b6d4", "#3b82f6"];

export const CityCategoPlaceChart = () => {
  const { cities = [] } = useCities();
  const { places = [] } = usePlaces();
  const { categories = [] } = useCategories();

  /* ===== DATA ===== */
  const chartData = cities.map((city) => {
    const cityPlaces = places.filter((p) => p.city_id === city.id);

    const categoryCounts = {};

    categories.forEach((cat) => {
      categoryCounts[cat.name] = cityPlaces.filter(
        (p) => p.category_id === cat.id,
      ).length;
    });

    return {
      city: city.name,
      ...categoryCounts,
    };
  });

  return (
    <section
      className="
      bg-white dark:bg-slate-900
      border border-gray-200 dark:border-slate-800
      rounded-2xl shadow-sm p-6"
    >
      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          City Distribution Overview
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Places grouped by city and category (real-time analytics)
        </p>
      </div>

      {/* ===== CHART ===== */}
      <div className="w-full h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap="25%">
            {/* GRID */}
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

            {/* AXIS */}
            <XAxis dataKey="city" tick={{ fontSize: 12 }} stroke="#9ca3af" />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />

            {/* TOOLTIP (modern UI) */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "13px",
              }}
              labelStyle={{ color: "#38bdf8" }}
            />

            <Legend />

            {/* BARS */}
            {categories.map((cat, index) => (
              <Bar
                key={cat.id}
                dataKey={cat.name}
                fill={COLORS[index % COLORS.length]}
                radius={[6, 6, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
