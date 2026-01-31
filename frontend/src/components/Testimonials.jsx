import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

// custom hook
import { useComments } from "../hooks/useComments";
import { TestimonialCard } from "./TestimonialCard";

export const TestimonialsSlider = () => {
  const { placecomments = [], blogscomments = [] } = useComments();
  const testimonials = [...placecomments, ...blogscomments].slice(0, 4);

  const [index, setIndex] = useState(0);

  // auto slide
  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
              <FaQuoteLeft className="text-indigo-400 text-xl" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Our Community Says
          </h2>
          <p className="text-white/60 mt-3 max-w-xl mx-auto">
            Honest feedback from people who explored places and read our blogs
          </p>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            animate={{ x: `-${index * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {testimonials.map((comment, i) => (
              <div key={comment.id || i} className="min-w-full px-2 sm:px-6">
                <TestimonialCard comment={comment} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ================= DOTS ================= */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === index
                  ? "bg-indigo-400 scale-125"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
