import { useMemo, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import { usePlaces } from "../hooks/usePlaces";
import { useCategories } from "../hooks/useCategories";
import { PlaceCard } from "../components/PlaceCard";
import { NotFoundData } from "../components/helper/NotFoundData";

// images
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
  HotelRoom1,
  HotelRoom2,
  restaurant1,
  restaurant2,
  restaurant3,
  restaurant4,
  hero,
  jaghori1,
  jaghori2,
];

export const PlacesInSite = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { places = [], loading } = usePlaces();
  const { categories = [] } = useCategories();

  const filteredPlace = useMemo(() => {
    return places.filter((place) => {
      const category = categories.find((cate) => cate.id === place.category_id);

      const matchCategory =
        activeCategory === "All" || category?.name === activeCategory;

      const matchQuery = place.name
        ?.toLowerCase()
        .includes(query.toLowerCase());

      return matchCategory && matchQuery;
    });
  }, [places, categories, activeCategory, query]);

  return (
    <section className="my-20 py-5 bg-gray-100 dark:bg-slate-900">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6 mb-10">
          {/* Categories */}
          <ul className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
            <li
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded cursor-pointer font-semibold ${
                activeCategory === "All"
                  ? "bg-green-500 text-white"
                  : "bg-white dark:bg-slate-3 00 hover:bg-green-500 hover:text-white"
              }`}
            >
              All
            </li>

            {categories.map((cate) => (
              <li
                key={cate.id}
                onClick={() => setActiveCategory(cate.name)}
                className={`px-4 py-2 rounded cursor-pointer font-semibold ${
                  activeCategory === cate.name
                    ? "bg-green-500 text-white"
                    : "bg-white dark:bg-slate-300 hover:bg-green-500 hover:text-white"
                }`}
              >
                {cate.name}
              </li>
            ))}
          </ul>

          {/* Search */}
          <div className="relative w-full sm:max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search places..."
              className="w-full py-3 pl-5 pr-12 dark:bg-slate-600 dark:text-white/90 border-b"
            />
            <MdOutlineSearch
              size={30}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        {/* Results */}
        {filteredPlace.length === 0 ? (
          <NotFoundData text="No result found" />
        ) : (
          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredPlace.map((place, index) => (
                <motion.div
                  key={place.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PlaceCard
                    place={place}
                    image={placeImages[index % placeImages.length]}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
