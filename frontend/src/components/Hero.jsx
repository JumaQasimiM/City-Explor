import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdTravelExplore } from "react-icons/md";

import heroImg from "../assets/hero.jpeg";

// hooks
import { useCities } from "../hooks/useCities";
import { useCategories } from "../hooks/useCategories";

// components
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
  jaghori1,
  jaghori2,
];

export const Hero = () => {
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [distance, setDistance] = useState();
  const [activeSearchdiv, setActiveSearchdiv] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { cities } = useCities();
  const { categories } = useCategories();

  // 🔍 Search submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ prevent empty search
    if (!city && !category) {
      setActiveSearchdiv(false);
      setSearchedPlaces([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:3000/places?city_id=${city}&category_id=${category}&distance_lte=${distance}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch places");
      }

      const data = await res.json();
      setSearchedPlaces(data);
      setActiveSearchdiv(true);
    } catch (err) {
      setError(err.message);
      setSearchedPlaces([]);
      setActiveSearchdiv(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "flex-1 p-3 rounded-md border border-gray-700 bg-slate-800 text-orange-400 focus:border-gray-500";

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section
        className="w-full h-[90vh] flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-3xl text-center px-5 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            <span className="font-milonga">Welcome to </span>
            <span className="text-green-400 font-caveat">City Explor</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-xl">
            Discover the best places in the city with curated guides and tips.
          </p>

          <Link to="/places">
            <button className="mt-6 bg-green-500 text-white px-8 py-3 rounded font-semibold hover:bg-green-600 transition">
              Get Started
            </button>
          </Link>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="relative z-10 w-full max-w-6xl mt-10 px-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 bg-slate-900 p-5 rounded-lg shadow-lg"
          >
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClass}
            >
              <option value="">Select city</option>
              {cities?.map((c) => (
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
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className={inputClass}
              placeholder="distance... 2Km"
            />

            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ================= RESULTS ================= */}
      {activeSearchdiv && (
        <section className="bg-gray-200 dark:bg-slate-800 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <MdTravelExplore size={28} />
                </div>
              </div>

              <h2 className="text-2xl md:text-4xl font-caveat font-bold">
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
                {searchedPlaces.map((place, index) => (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <PlaceCard
                      place={place}
                      image={placeImages[index % placeImages.length]}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}
    </>
  );
};
