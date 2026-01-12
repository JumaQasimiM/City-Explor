import { usePopularPlace } from "../hooks/usePlaces";
import { PopularHotelCard } from "./PopularHotelCard";
import Hotel1 from "../assets/Hotel1.jpg";
import Hotel2 from "../assets/Hotel2.jpg";
import Hotel3 from "../assets/Hotel3.jpg";
import Hotel4 from "../assets/Hotel4.jpg";
const hotelImages = [Hotel1, Hotel2, Hotel3, Hotel4];

export const PopularHotels = () => {
  // hard code for Hotel id
  const { popularPlace, error } = usePopularPlace("1");
  return (
    <section className="w-full dark:bg-slate-900 dark:text-white py-16">
      <div className="max-w-8xl px-5 mx-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b border-gray-500 dark:border-white/20 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Popular Restaurants
            </h2>
            <h2>Cum doctus civibus efficiantur in imperdiet deterruisset.</h2>
          </div>
          <button className="text-sm text-green-400 hover:text-green-300 transition">
            View all →
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularPlace.map((hotel, index) => (
            <PopularHotelCard
              key={hotel.id}
              hotel={hotel}
              image={hotelImages[index % hotelImages.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
