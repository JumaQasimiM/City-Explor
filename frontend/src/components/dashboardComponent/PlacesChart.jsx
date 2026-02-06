import { usePlaces } from "../../hooks/usePlaces";
import { useCategories } from "../../hooks/useCategories";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const PlacesChart = () => {
  const { places } = usePlaces();
  const { categories } = useCategories();
  // آماده‌سازی دیتا برای چارت
  const chartData = places.map((place) => ({
    name: place.name,
    price: place.price,
  }));

  return (
    <section className="bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-xl p-4">
      <h1 className="text-xl font-semibold text-white mb-4">
        Places Price Chart
      </h1>

      <div className="w-full h-[350px] bg-white rounded-lg p-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Area
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              fill="#a7f3d0"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
