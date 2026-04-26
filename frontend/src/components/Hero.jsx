import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdTravelExplore } from "react-icons/md";

import heroImg from "../assets/hero.jpeg";

// api url
import { ApiUrl } from "../api/ApiUrl";
import { BASE_URL } from "../api/ApiUrl";
// hooks
import { useCities } from "../hooks/useCities";
import { useCategories } from "../hooks/useCategories";

// components
import { PlaceCard } from "../components/PlaceCard";
import { NotFoundData } from "../components/helper/NotFoundData";

export const Hero = () => {
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { cities = [] } = useCities();
  const { categories = [] } = useCategories();

  /* ================= SEARCH ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city && !category) {
      setShowResults(false);
      return;
    }

    setLoading(true);
    setError(null);
    setShowResults(true);

    try {
      const params = new URLSearchParams();
      if (city) params.append("city", city);
      if (category) params.append("category", category);

      const res = await fetch(`${ApiUrl}/places?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch places");

      const data = await res.json();
      setSearchedPlaces(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSearchedPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "flex-1 px-4 py-3 rounded-md border border-gray-700 bg-slate-800 text-orange-400 focus:border-green-500 outline-none";

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="w-full h-[90vh] flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-3xl text-center px-5">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            <span className="font-milonga">Welcome to </span>
            <span className="text-green-400 font-caveat">City Explor</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90">
            Discover the best places in the city with curated guides and tips.
          </p>

          <Link to="/places">
            <button className="mt-8 bg-green-500 text-white px-10 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              Get Started
            </button>
          </Link>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="relative z-10 w-full max-w-6xl mt-14 px-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 bg-slate-900 p-5 rounded-xl shadow-xl"
          >
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClass}
            >
              <option value="">Select city</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              className={inputClass}
              placeholder="Distance (km)"
            />

            <button
              type="submit"
              className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ================= RESULTS ================= */}
      {showResults && (
        <section className="bg-gray-200 dark:bg-slate-800 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <MdTravelExplore size={28} />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-caveat font-bold dark:text-white">
                Explore Your Search Results
              </h2>
            </div>

            {loading && (
              <p className="text-center text-lg">Loading places...</p>
            )}

            {error && <NotFoundData text={error} />}

            {!loading && !error && searchedPlaces.length === 0 && (
              <NotFoundData text="No places found for your search" />
            )}

            <AnimatePresence>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {searchedPlaces.map((place, index) => {
                  const imageUrl = place.images?.[0]?.image
                    ? `${place.images[0].image}`
                    : "/placeholder.jpg";

                  return (
                    <motion.div
                      key={place.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <PlaceCard place={place} image={imageUrl} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}
    </>
  );
};
