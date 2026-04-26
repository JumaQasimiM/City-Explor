import { PopularRestaurantCard } from "./PopularRestaurantCard";

import { usePopularPlace } from "../hooks/usePlaces";

// images
import restaurant1 from "../assets/restaurant1.jpg";
import { BASE_URL } from "../api/ApiUrl";

import { Loader } from "./helper/Loading";
import { ErrorMessage } from "./helper/Error";
import { useCategories } from "../hooks/useCategories";

export const PopularRestaurants = () => {
  // usePopularPlace take a category id as argument
  const { categories = [] } = useCategories();
  const restaurantCategory = categories.find((c) =>
    c.name.toLowerCase().includes("restaurant"),
  );

  const {
    popularPlace: restaurant,
    error,
    loading,
  } = usePopularPlace(restaurantCategory?.id);

  /* ================= LOADING / ERROR ================= */
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="w-full dark:bg-slate-900 dark:text-white py-5 md:py-13">
      <div className="max-w-8xl px-5 md:mx-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b border-gray-500 dark:border-white/20 pb-4">
          <div>
            <h2 className="text-md md:text-3xl font-semibold">
              Popular Restaurants
            </h2>
            <h2 className="text-sm md:text-lg">
              Cum doctus civibus efficiantur in imperdiet deterruisset.
            </h2>
          </div>
          <button className="text-sm text-green-400 hover:text-green-300 transition">
            View all →
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurant.map((restaurant) => {
            const imageUrl = restaurant.images?.[0]?.image
              ? `${restaurant.images[0].image}`
              : "";
            return (
              <PopularRestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                image={imageUrl}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
