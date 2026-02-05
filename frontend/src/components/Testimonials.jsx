import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

import { useComments } from "../hooks/useComments";
import { TestimonialCard } from "./TestimonialCard";

export const TestimonialsSlider = () => {
  const { placecomments = [], blogscomments = [] } = useComments();
  const testimonials = [...placecomments, ...blogscomments].slice(0, 10);

  const [index, setIndex] = useState(0);

  // auto slide
  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section className="relative py-13 md:py-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[140px]" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 border border-white/20">
              <FaQuoteLeft className="text-green-400 text-2xl" />
            </div>
          </div>

          <h2 className="md:text-3xl font-bold text-white font-caveat">
            Loved by Explorers Worldwide
          </h2>

          <p className="text-white/60 mt-4 max-w-xl mx-auto text-lg">
            Real stories from people discovering cities, places, and inspiration
            through City Explor
          </p>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.96 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full"
            >
              <TestimonialCard comment={testimonials[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= DOTS ================= */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-10 bg-teal-400 shadow-[0_0_20px_rgba(99,102,241,0.7)]"
                  : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
