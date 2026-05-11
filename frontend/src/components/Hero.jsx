import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import heroImg from "../assets/qaliRaisJaghori.jpg";

import { useCities } from "../hooks/useCities";
import { useCategories } from "../hooks/useCategories";

export const Hero = () => {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  const { cities = [] } = useCities();
  const { categories = [] } = useCategories();

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (city) params.append("city", city);
    if (category) params.append("category", category);

    window.location.href = `/places?${params.toString()}`;
  };

  // animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      className="
        relative
        min-h-[80vh]
        md:min-h-screen
        flex items-center justify-center
        bg-cover bg-center
        overflow-hidden
        px-4 pt-5 md:pt-0
      "
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* animated background zoom */}
      <motion.div
        initial={{ scale: 1.4 }}
        animate={{ scale: 1 }}
        transition={{ duration: 9, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />

      {/* content */}
      <div className="relative z-10 w-full max-w-4xl text-center text-white">
        {/* title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-bold
            tracking-tight
            leading-tight
            font-quicksand
          "
        >
          Every City Has a Story.
          <span className="block text-emerald-400 mt-2">Find Yours.</span>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="
            mt-6
            text-base
            md:text-xl
            text-white/75
            max-w-2xl
            mx-auto
            leading-relaxed
          "
        >
          Discover hidden gems, authentic local experiences, and unforgettable
          places around Jaghori.
        </motion.p>

        {/* buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="
            mt-8
            hidden sm:flex
            justify-center
            gap-4
          "
        >
          <Link to="/places">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-7
                py-3
                rounded
                bg-emerald-500
                hover:bg-emerald-600
                transition
                font-medium
                shadow-lg shadow-emerald-500/20
              "
            >
              Start Exploring
            </motion.button>
          </Link>
        </motion.div>

        {/* search box */}
        <motion.form
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          onSubmit={handleSubmit}
          className="
            mt-10
            bg-white/10
            backdrop-blur-2xl
            border
            border-white/15
            rounded
            p-4
            flex flex-col
            md:flex-row
            gap-3
            shadow-2xl
          "
        >
          <motion.select
            whileFocus={{ scale: 1.01 }}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="
              w-full
              px-4
              py-3
              rounded
              bg-white
              text-black
              outline-none
            "
          >
            <option value="">Select City</option>

            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </motion.select>

          <motion.select
            whileFocus={{ scale: 1.01 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              w-full
              px-4
              py-3
              rounded
              bg-white
              text-black
              outline-none
            "
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </motion.select>

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              w-full
              md:w-auto
              px-8
              py-3
              rounded
              bg-emerald-500
              hover:bg-emerald-600
              transition
              font-medium
              whitespace-nowrap
            "
          >
            Search
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};
