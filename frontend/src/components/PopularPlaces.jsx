import { usePopularPlace } from "../hooks/usePlaces";
import { PopularPlaceCard } from "./PopularPlaceCard";
import advertisment_popPlace from "../assets/advertisment-popPlace.png";
import place_cover from "../assets/restaurant-kabul.jpg";

import { Loader } from "./helper/Loading";
import { ErrorMessage } from "./helper/Error";

export const PopularPlaces = () => {
  const { popularPlace = [], error, loading } = usePopularPlace();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="w-full py-3 md:py-12  bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-xs uppercase tracking-widest text-emerald-500">
            Places & Blog
          </span>

          <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-quicksand">
            Popular <span className="text-emerald-500">Places</span>
          </h1>

          <div className="mt-3 w-20 h-1 bg-emerald-500 mx-auto rounded-full" />

          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Discover amazing destinations and trending places across cities.
          </p>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ===== PLACES GRID ===== */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
            {popularPlace.map((place) => {
              const imageUrl = place.images?.[0]?.image || place_cover;

              return (
                <PopularPlaceCard
                  key={place.id}
                  place={place}
                  image={imageUrl}
                />
              );
            })}
          </div>
          {/* ===== FEATURED ===== */}
          <div className="relative group lg:col-span-1 h-[280px] sm:h-[350px] md:h-[500px] lg:h-full overflow-hidden">
            <img
              src={advertisment_popPlace}
              alt="Featured place"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition duration-700"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* text */}
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
              <span className="text-xs uppercase tracking-widest text-green-400">
                Jaghori - Qala-i-Raiss
              </span>

              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug">
                Football festival in Jaghori - 2026
              </h2>

              <p className="text-xs sm:text-sm text-white/80">
                Apr 10, 2026 · By Mohammad Qasimi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
