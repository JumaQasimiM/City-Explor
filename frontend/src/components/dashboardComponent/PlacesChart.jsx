import { usePlaceCategory, usePlaces } from "../../hooks/usePlaces";

export const PlacesChart = () => {
  const { places } = usePlaces();
  const { data: categories } = usePlaceCategory();
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-emerald-400 rounded">
      <h1 className="text-xl font-semibold py-1 px-2">places chart</h1>
      <div className="p-4"></div>
    </section>
  );
};
