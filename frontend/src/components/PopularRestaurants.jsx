import { PopularRestaurantCard } from "./PopularRestaurantCard";

export const PopularRestaurants = () => {
  return (
    <section className="w-full dark:bg-slate-900 dark:text-white py-16">
      <div className="max-w-8xl px-5 mx-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b border-gray-500 dark:border-white/20 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Popular Hotels & Accommodations
            </h2>
            <h2>Cum doctus civibus efficiantur in imperdiet deterruisset.</h2>
          </div>
          <button className="text-sm text-green-400 hover:text-green-300 transition">
            View all →
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((card) => (
            <PopularRestaurantCard />
          ))}
        </div>
      </div>
    </section>
  );
};
