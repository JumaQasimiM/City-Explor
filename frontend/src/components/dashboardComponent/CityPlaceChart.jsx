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

const COLORS = [
  "#6366F1",
  "#22C55E",
  "#EF4444",
  "#F59E0B",
  "#0EA5E9",
  "#A855F7",
];

export const CityCategoPlaceChart = () => {
  const { cities = [] } = useCities();
  const { places = [] } = usePlaces();
  const { categories = [] } = useCategories();

  const chartData = cities.map((city) => {
    const cityPlaces = places.filter((place) => place.city_id === city.id);

    const categoryCounts = {};

    categories.forEach((cat) => {
      categoryCounts[cat.name] = cityPlaces.filter(
        (place) => place.category_id === cat.id,
      ).length;
    });

    return {
      city: city.name,
      ...categoryCounts,
    };
  });

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-indigo-400 rounded p-4">
      <h2 className="text font-semibold text-gray-300 mb-4">
        Places by City & Category
      </h2>

      <div className="w-full h-[350px] bg-white rounded p-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />

            {categories.map((cat, index) => (
              <Bar
                key={cat.id}
                dataKey={cat.name}
                fill={COLORS[index % COLORS.length]}
                // radius={[6, 6, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
