import { usePopularPlace } from "../hooks/usePlaces";
import { PopularHotelCard } from "./PopularHotelCard";
import Hotel1 from "../assets/Hotel1.jpg";

// helper components
import { Loader } from "./helper/Loading";
import { ErrorMessage } from "./helper/Error";
import { useCategories } from "../hooks/useCategories";

export const PopularHotels = () => {
  // hard code for Hotel id
  const { categories = [] } = useCategories();
  const hotelCategory = categories.find((c) => c.name === "Hotel");

  const { popularPlace, error, loading } = usePopularPlace(hotelCategory?.id);
  /* ================= LOADING / ERROR ================= */
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="w-full dark:bg-slate-900 dark:text-white py-8 md:py-16">
      <div className="max-w-8xl px-5 md:mx-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b border-gray-500 dark:border-white/20 pb-4">
          <div>
            <h2 className="text-md md:text-3xl font-semibold">
              Popular Hotels
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
          {popularPlace.map((hotel) => {
            const imageUrl = hotel.images?.[0]?.image
              ? `${hotel.images[0].image}`
              : hotel; // fallback

            return (
              <PopularHotelCard key={hotel.id} hotel={hotel} image={imageUrl} />
            );
          })}
        </div>
      </div>
    </section>
  );
};
