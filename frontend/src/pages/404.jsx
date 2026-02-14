import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const NotFoundPage = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white px-6">
      {/* gradient background  */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-600/60 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sky-600/30 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-10 sm:p-14 max-w-2xl w-full text-center"
      >
        <h1 className="text-7xl sm:text-8xl font-extrabold bg-gradient-to-r from-sky-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-6 text-2xl sm:text-3xl font-semibold">
          {" "}
          Oops! Page Not Found
        </h2>

        <p className="mt-4 text-gray-400 text-sm sm:text-base">
          The page you are trying to access does not exist or has been moved.
          Let’s guide you back home.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r 
                       from-sky-500 to-teal-600 
                       hover:scale-105 transition-transform 
                       shadow-lg"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl border border-white/20 
                       hover:bg-white/10 transition"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </section>
  );
};
