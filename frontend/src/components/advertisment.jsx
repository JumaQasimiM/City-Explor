import { motion } from "framer-motion";
import advertisment from "../assets/advertisment1.png";

export const Advertisment = ({ day = 2 }) => {
  return (
    <section className="w-full py-10 px-0">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded overflow-hidden  flex items-center min-h-[290px] md:min-h-[420px]"
      >
        {/* bg image*/}
        <div
          className="absolute inset-0 bg-no-repeat bg-right bg-contain md:bg-cover"
          style={{
            backgroundImage: `url(${advertisment})`,
          }}
        />

        {/* dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 p-6 sm:p-10 max-w-lg text-white md:ml-20">
          {/* label */}
          <span className="text-xs uppercase tracking-widest text-emerald-400">
            Limited Offer
          </span>

          {/* headline */}
          <h1 className="mt-3 text-lg sm:text-2xl md:text-4xl font-extrabold font-inter leading-tight">
            Get <span className="text-emerald-400">60% OFF</span>
            <br />
            Your Next Shop
          </h1>

          {/* sub text */}
          <p className="mt-3 text-sm sm:text-base text-white/80 hidden sm:block">
            shop in {day} comeing day{" "}
            <span className="text-emerald-400">100$</span> or more and enjoy
            exclusive discounts on your next shop across top destinations.
          </p>

          {/* CTA */}
          <div className="mt-6 flex gap-3">
            <button className="bg-emerald-400 px-4 py-2 text-sm font-semibold cursor-pointer transition">
              Shop Now
            </button>
          </div>
        </div>

        {/* OPTIONAL BADGE */}
        <div className="absolute top-5 right-5 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
          Hot Deal
        </div>
      </motion.div>
    </section>
  );
};
