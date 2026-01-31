import { FaStar } from "react-icons/fa";

export const TestimonialCard = ({ comment }) => {
  return (
    <div
      className="
        max-w-3xl mx-auto
        rounded-2xl p-8
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-xl
        text-center
      "
    >
      {/* text */}
      <p className="text-white/80 text-base md:text-lg leading-relaxed">
        “{comment.body}”
      </p>

      {/* footer */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <h4 className="text-white font-semibold">
          {comment.user?.name || "Anonymous"}
        </h4>

        <p className="text-xs text-white/50 uppercase tracking-wide">
          {comment.type === "blog" ? "Blog Reader" : "Place Visitor"}
        </p>

        {comment.rating && (
          <div className="flex gap-1 text-amber-400 mt-1">
            {Array.from({ length: comment.rating }).map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
