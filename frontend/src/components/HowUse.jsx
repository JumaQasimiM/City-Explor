import { FaCompass, FaUpload, FaUsers, FaUserPlus } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { motion } from "framer-motion";

export const HowUse = () => {
  const whyItems = [
    {
      icon: <FaCompass />,
      title: "Discover Places",
      desc: "Explore hidden gems and popular destinations shared by travelers.",
    },
    {
      icon: <FaUpload />,
      title: "Upload Places",
      desc: "Share your favorite spots with photos and details.",
    },
    {
      icon: <FaUsers />,
      title: "Join Community",
      desc: "Connect with explorers and discover new experiences.",
    },
  ];

  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create Account",
      desc: "Sign up and join the community.",
    },
    {
      icon: <FaUpload />,
      title: "Add Places",
      desc: "Upload places with images and details.",
    },
    {
      icon: <MdExplore />,
      title: "Explore & Enjoy",
      desc: "Discover and enjoy new destinations.",
    },
  ];

  /* ===== ANIMATION CONFIG ===== */
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-16 md:py-14 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 space-y-20">
        {/* ===== WHY SECTION ===== */}
        <div>
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            {/* small label */}

            {/* main title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-quicksand font-bold text-slate-900 dark:text-white leading-tight">
              Why <span className="text-emerald-500"> BeyondJA?</span>
            </h1>

            {/* underline */}
            <div className="mt-4 w-25 h-1 bg-emerald-500 mx-auto rounded-full"></div>

            {/* description */}
            <p className="max-w-2xl mx-auto mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Discover, share, and connect with amazing places around you.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {whyItems.map((itemData, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -6 }}
                className=" dark:bg-slate-800 p-6 rounded border-gray-100 dark:border-slate-700 text-center transition"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xl mb-4">
                  {itemData.icon}
                </div>

                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                  {itemData.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {itemData.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ===== HOW IT WORKS ===== */}
        <div>
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            {/* small label */}

            {/* main title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-quicksand font-bold text-slate-900 dark:text-white leading-tight">
              How <span className="text-emerald-500">It Works?</span>
            </h1>

            {/* underline */}
            <div className="mt-4 w-25 h-1 bg-emerald-500 mx-auto rounded-full"></div>

            {/* description */}
            <p className="max-w-2xl mx-auto mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Start exploring in just a few simple steps.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={item}
                // whileHover={{ scale: 1.04 }}
                className="relative  dark:bg-slate-800 p-6 dark:border-slate-700 text-center"
              >
                {/* step number */}
                <div className="absolute -top-3 left-1/4 text-emerald-500 text-5xl font-extrabold">
                  {i + 1}
                </div>

                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xl mb-4 mt-3">
                  {step.icon}
                </div>

                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
