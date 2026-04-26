import { useMemo, useRef, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import { usePlaces } from "../hooks/usePlaces";
import { useCategories } from "../hooks/useCategories";
import { PlaceCard } from "../components/PlaceCard";
import { NotFoundData } from "../components/helper/NotFoundData";
import { PopularBlogCard } from "../components/PopularBlogCard";
import { useBlogs } from "../hooks/useBlogs";

import placeholder from "../assets/jaghori1.jpg";
import { Loader } from "../components/helper/Loading";
import { ErrorMessage } from "../components/helper/Error";

export const PlacesInSite = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { places = [], loading, error } = usePlaces();
  const { categories = [] } = useCategories();
  const { blogs } = useBlogs();

  const filteredPlace = useMemo(() => {
    return places.filter((place) => {
      const categoryObj = categories.find((cate) => cate.id === place.category);
      const matchCategory =
        activeCategory === "All" || categoryObj?.name === activeCategory;
      const matchQuery =
        place.name?.toLowerCase().includes(query.toLowerCase()) ||
        place.category_detail?.name
          ?.toLowerCase()
          .includes(query.toLowerCase()) ||
        place.address?.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [places, categories, activeCategory, query]);

  const categoryRef = useRef(null);
  // show error and laoding
  if (loading)
    return (
      <div className="mt-17">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="mt-17 ">
        <ErrorMessage />
      </div>
    );

  return (
    <section className="mt-5 md:mt-12 py-5 bg-gray-100 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 md:pb-20">
        {/* ================= TOP CONTROLS ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12 pt-10">
          {/* ===== Categories ===== */}
          <div className="relative flex items-center lg:w-2/3">
            <ul
              ref={categoryRef}
              className="flex items-center gap-3
                overflow-x-auto whitespace-nowrap
                px-2 py-3 scrollbar-none scroll-smooth"
            >
              <CategoryItem
                active={activeCategory === "All"}
                onClick={() => setActiveCategory("All")}
                label="All"
              />

              {categories.map((cate) => (
                <CategoryItem
                  key={cate.id}
                  label={cate.name}
                  active={activeCategory === cate.name}
                  onClick={() => setActiveCategory(cate.name)}
                />
              ))}
            </ul>
          </div>

          {/* ===== Search ===== */}
          <div className="relative w-full max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search places..."
              className="w-full h-12 rounded
                bg-white dark:bg-slate-700 dark:text-white
                pl-5 pr-12 text-sm
                border border-gray-200 dark:border-slate-600
                focus:border-green-500 focus:ring-2 focus:ring-green-500/20
                outline-none"
            />
            <MdOutlineSearch
              size={22}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* search reault */}
          <div className="lg:col-span-3">
            {filteredPlace.length === 0 ? (
              <NotFoundData text="no place found" />
            ) : (
              <AnimatePresence>
                {/* place card */}
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6"
                >
                  {filteredPlace.map((place, index) => {
                    const imageUrl =
                      place.images?.length > 0
                        ? place.images[0].image
                        : placeholder;
                    const categoryName = categories.find(
                      (c) => c.id === place.category_id,
                    )?.name;

                    return (
                      <motion.div
                        key={place.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PlaceCard place={place} image={imageUrl} />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* بلاگ‌های محبوب */}
          <div className="px-4 py-2">
            <div className="text-left mb-8">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-300 mb-2 border-b-2 border-b-gray-300 pb-3">
                popular blogs
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
              {blogs.slice(0, 4).map((blog, index) => (
                <PopularBlogCard blog={blog} index={index} key={blog.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================= CATEGORY ITEM ================= */
const CategoryItem = ({ label, active, onClick }) => (
  <li
    onClick={onClick}
    className={`px-6 py-2.5 rounded cursor-pointer
      text-sm font-medium transition-all
      ${
        active
          ? "bg-green-600 text-white shadow shadow-green-500/30"
          : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-slate-600  hover:text-green-600"
      }`}
  >
    {label}
  </li>
);
