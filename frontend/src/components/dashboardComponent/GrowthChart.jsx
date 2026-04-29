import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useState } from "react";
import { usePlaceGrowth } from "../../hooks/usePlaceGrowth";

export const GrowthChart = () => {
  const [period, setPeriod] = useState("day");
  const { data, loading } = usePlaceGrowth(period);

  if (loading) return <p>Loading...</p>;

  //  format date
  const formatDate = (date) => {
    const d = new Date(date);

    if (period === "day") {
      return d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
    }

    if (period === "week") {
      return `W${Math.ceil(d.getDate() / 7)}`;
    }

    return d.toLocaleDateString("en-US", { month: "short" });
  };

  const formatted = data.map((item) => ({
    date: formatDate(item.date),
    count: item.count,
  }));

  if (!formatted.length) return <p>No data</p>;

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
      {/* 🔘 SWITCH */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-slate-700 dark:text-white">
          Growth Places
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setPeriod("day")}
            className="text-teal-500 font-semibold hover:cursor-pointer"
          >
            Day
          </button>
          <button
            onClick={() => setPeriod("week")}
            className="text-orange-500 font-semibold hover:cursor-pointer"
          >
            Week
          </button>
          <button
            onClick={() => setPeriod("month")}
            className="text-blue-600 font-semibold hover:cursor-pointer"
          >
            Month
          </button>
        </div>
      </div>

      {/* 📊 CHART */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
