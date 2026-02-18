import restaurant1 from "../assets/restaurant1.jpg";
import { PopularPlacesSwiper } from "./PopularPlaceSwiper";

export const PopularPlaces = () => {
  return (
    <section className="w-full py-10 md:py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section title */}
        <h1 className="text-2xl md:text-4xl font-milonga mb-8 md:mb-14 text-slate-900 dark:text-white">
          Popular Places
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* FEATURED ARTICLE */}
          <div className="relative group lg:col-span-1">
            <div className="overflow-hidden">
              <img
                src={restaurant1}
                alt="Architecture Budapest"
                className="w-full h-[520px] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* Text overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
              <span className="text-xs tracking-widest uppercase text-green-400">
                Architecture
              </span>

              <h2 className="text-2xl font-semibold leading-snug">
                5 Stunning Buildings in the Center of Budapest
              </h2>

              <p className="text-sm text-white/80">
                July 01, 2024 · By Anna Windsor
              </p>
            </div>
          </div>

          {/* RIGHT ARTICLES */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-1 gap-10">
            <PopularPlacesSwiper />
          </div>
        </div>
      </div>
    </section>
  );
};
