import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export const PopularHotelCard = ({ hotel, image }) => {
  return (
    <article className="relative w-full h-[200px] overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <Link to={`/hotels/${hotel.id}`}>
        <img
          src={image}
          alt={hotel.name}
          className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
        />
      </Link>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Rating badge */}
      <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded-md shadow">
        4.7
      </div>

      {/* Content */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        {/* Stars */}
        <div className="flex items-center gap-1 text-amber-400 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} size={14} />
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-tight">{hotel.name}</h3>

        {/* Address */}
        <p className="text-sm text-white/80 truncate">{hotel.address}</p>
      </div>
    </article>
  );
};
