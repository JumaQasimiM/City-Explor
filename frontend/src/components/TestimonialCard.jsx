import { FaStar, FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export const TestimonialCard = ({ comment }) => {
  // not complate ---> future plan
  const name = comment.user?.name || "Anonymous";
  const role = comment.type === "blog" ? "Blog Reader" : "Place Visitor";
  const rating = comment.rating || 5;

  // get initials
  // const initials = name
  //   .split(" ")
  //   .map((n) => n[0])
  //   .slice(0, 2)
  //   .join("")
  //   .toUpperCase();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="
        relative rounded p-8
        bg-white/10 backdrop-blur-xl
        border border-white/15
        shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]
        text-white
        overflow-hidden
      "
    >
      {/* glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-300 rounded-full blur-3xl" />

      {/* quote icon */}
      <FaQuoteLeft className="absolute top-6 right-6 text-green-400/70 text-4xl" />

      {/* text */}
      <p className="relative text-white/90 text-base leading-relaxed mb-8">
        “{comment.body}”
      </p>

      {/* footer */}
      <div className="relative flex items-center gap-4">
        {/* avatar */}
        <div
          className="
          w-12 h-12 rounded-full
          bg-gradient-to-br from-indigo-500 to-emerald-500
          flex items-center justify-center
          font-bold text-white
        "
        >
          {<FaUserCircle size={24} />}
        </div>

        <div className="flex-1">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-xs text-white/60">{role}</p>

          {/* rating */}
          <div className="flex gap-1 mt-1 text-amber-400">
            {Array.from({ length: rating }).map((_, i) => (
              <FaStar key={i} size={13} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
