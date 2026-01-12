import { PopularHotelCard } from "../components/PopularHotelCard";
import { usePlaces } from "../hooks/usePlaces";
import { MdOutlineSearch } from "react-icons/md";
import { useCategories } from "../hooks/useCategories";

import Hotel1 from "../assets/Hotel1.jpg";
import Hotel2 from "../assets/Hotel2.jpg";
import Hotel3 from "../assets/Hotel3.jpg";
import Hotel4 from "../assets/Hotel4.jpg";
import HotelRoom1 from "../assets/HotelRoom1.jpg";
import HotelRoom2 from "../assets/HotelRoom2.jpg";
import restaurant1 from "../assets/restaurant1.jpg";
import restaurant2 from "../assets/restaurant2.jpg";
import restaurant3 from "../assets/restaurant3.jpg";
import restaurant4 from "../assets/restaurant4.jpg";
import hero from "../assets/hero.jpeg";
import jaghori1 from "../assets/jaghori1.jpg";
import jaghori2 from "../assets/jaghori2.jpg";

const placeImages = [
  Hotel1,
  Hotel2,
  Hotel3,
  Hotel4,
  HotelRoom2,
  HotelRoom1,
  restaurant1,
  restaurant2,
  restaurant3,
  restaurant4,
  hero,
  jaghori1,
  jaghori2,
];

export const PlacesInSite = () => {
  const { places = [], loading, error } = usePlaces();
  const { categories = [] } = useCategories();

  return (
    <section className="my-20 py-5 bg-gray-100 dark:bg-slate-900 text-black/80 dark:text-white/90">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        {/* Top Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10 py-2">
          {/* Categories */}
          <ul className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
            {categories.map((cate) => (
              <li
                key={cate.id}
                className="whitespace-nowrap cursor-pointer px-4 py-2 rounded bg-white dark:bg-slate-800 shadow-sm hover:bg-green-500 hover:text-white transition text-sm font-semibold"
              >
                {cate.name}
              </li>
            ))}
          </ul>

          {/* Search */}
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search places..."
              className="w-full py-3 pl-5 pr-12 dark:bg-slate-800 border-b-2 dark:border-white/10 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <MdOutlineSearch
              size={22}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* Content */}
        {loading && (
          <p className="text-center text-gray-500">Loading places...</p>
        )}

        {error && (
          <p className="text-center text-red-500">Failed to load places.</p>
        )}

        {!loading && places.length === 0 && (
          <p className="text-center text-gray-500">No places found.</p>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {places.map((place, index) => (
            <PopularHotelCard
              key={place.id}
              hotel={place}
              image={placeImages[index % placeImages.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
