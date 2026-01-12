import { useParams, Link } from "react-router-dom";
import {
  usePlaceById,
  usePlaceCategory,
  usePlaceCity,
  usePlaceOwner,
} from "../hooks/usePlaces";

import { FaMapMarkerAlt, FaTag, FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import restaurant1 from "../assets/restaurant1.jpg";
import restaurant2 from "../assets/restaurant2.jpg";
import restaurant3 from "../assets/restaurant3.jpg";
import hotel2 from "../assets/Hotel2.jpg";

import avatorImage from "../assets/Hotel1.jpg";

export const PlaceDetailOnSite = () => {
  const { id } = useParams();
  const { data: place, loading, error } = usePlaceById(id);

  const { data: owner } = usePlaceOwner(place?.user_id);
  const { data: city } = usePlaceCity(place?.city_id);
  const { data: category } = usePlaceCategory(place?.category_id);

  if (loading) {
    return <p className="text-center mt-20">Loading place details...</p>;
  }

  if (error || !place) {
    return <p className="text-center mt-20 text-red-500">Place not found.</p>;
  }

  return (
    <section className="bg-gray-100 dark:bg-slate-900 text-black/80 dark:text-white/90">
      {/* Hero */}
      <div className="relative h-[260px] sm:h-[360px] md:h-[440px]">
        <img
          src={restaurant1}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {place.name}
          </h1>
          <p className="flex items-center gap-2 mt-2 text-sm opacity-90">
            <FaMapMarkerAlt className="text-orange-500" />
            {city?.name}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Badges */}
          <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow text-sm">
              <FaTag className="text-green-500" />
              {category?.name}
            </span>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow text-sm">
              <FaUser className="text-blue-500" />
              {owner?.firstname} {owner?.lastname}
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About {place.name}</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              {place.description || "No description provided."}
            </p>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Services</h2>
            <div className="flex flex-wrap gap-3">
              {place.services?.map((service, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6 h-fit space-y-6">
          {/* Owner */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Owner Information</h3>

            <div className="flex items-center gap-4">
              <img
                src={avatorImage}
                alt={owner?.firstname}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold">
                  {owner?.firstname} {owner?.lastname}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MdOutlineEmail />
                  {owner?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {place.address}
            </p>
          </div>

          <Link
            to="/places"
            className="block text-center bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition font-semibold"
          >
            Back to places
          </Link>
        </aside>
      </div>
    </section>
  );
};
