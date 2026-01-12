import { PopularRestaurantCard } from "./PopularRestaurantCard";

import { usePopularPlace } from "../hooks/usePlaces";

// images
import restaurant1 from "../assets/restaurant1.jpg";
import restaurant2 from "../assets/restaurant2.jpg";
import restaurant3 from "../assets/restaurant3.jpg";
import restaurant4 from "../assets/restaurant4.jpg";
const restaurantImages = [restaurant1, restaurant2, restaurant3, restaurant4];

export const PopularRestaurants = () => {
  const { popularPlace: restaurant, error } = usePopularPlace("ce5f");
  return (
    <section className="w-full dark:bg-slate-900 dark:text-white py-16">
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
          {restaurant.map((restaurant, index) => (
            <PopularRestaurantCard
              key={index}
              restaurant={restaurant}
              image={restaurantImages[index % restaurantImages.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
