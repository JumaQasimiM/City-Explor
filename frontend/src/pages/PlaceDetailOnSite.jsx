import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlaceById } from "../hooks/usePlaces";

import { Loader } from "../components/helper/Loading";
import { ErrorMessage } from "../components/helper/Error";

import { FaMapMarkerAlt, FaTag, FaUser, FaStar } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";

import { PlaceComments } from "../components/PlaceComment";

export const PlaceDetailOnSite = () => {
  const { id } = useParams();
  const { data: place, loading, error } = usePlaceById(id);

  const [activeImage, setActiveImage] = useState(null);

  const images = place?.images?.slice(0, 5) || [];

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0].image);
    }
  }, [place]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;
  if (!place) return null;

  return (
    <section className="bg-gray-50 dark:bg-[#0f172a] min-h-screen py-12 mt-14">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* ===== HEADER ===== */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {place.name}
            </h1>

            <p className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
              <FaMapMarkerAlt className="opacity-70" />
              {place.address}, {place.city_detail?.name}
            </p>

            {/* Rating */}
            <div className="flex gap-1 mt-3 text-yellow-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>

          {/* Price Card */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-6 py-5 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Estimated price
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              ${place.price || "--"}
            </p>
          </div>
        </div>

        {/* ===== IMAGE GALLERY ===== */}
        {images.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            {/* MAIN IMAGE */}
            <div className="md:col-span-2">
              <img
                src={activeImage}
                alt=""
                className="w-full h-[320px] md:h-[440px] object-cover rounded-2xl shadow-sm"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="grid grid-cols-2 gap-3">
              {images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  onClick={() => setActiveImage(img.image)}
                  className={`cursor-pointer h-[140px] object-cover rounded-xl border transition
                  hover:opacity-80 hover:scale-[1.02]
                  ${
                    activeImage === img.image
                      ? "border-black dark:border-white"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* TAGS */}
            <div className="flex flex-wrap gap-3">
              <Tag icon={<FaTag />} text={place.category_detail?.name} />
              <Tag
                icon={<FaUser />}
                text={`${place.owner_detail?.first_name} ${place.owner_detail?.last_name}`}
              />
            </div>

            {/* DESCRIPTION */}
            <Card title="Description">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
                {place.description || "No description available."}
              </p>
            </Card>

            {/* SERVICES */}
            {place.services_detail?.length > 0 && (
              <Card title="Services">
                <div className="flex flex-wrap gap-2">
                  {place.services_detail.map((s) => (
                    <span
                      key={s.id}
                      className="px-3 py-1.5 rounded-full text-sm
                      bg-gray-100 dark:bg-slate-700
                      text-gray-700 dark:text-gray-200"
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm space-y-6">
            {/* OWNER */}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                Owner
              </h3>

              <div className="flex items-center gap-4">
                <img
                  src={place.owner_detail?.avatar}
                  className="w-14 h-14 rounded-full object-cover border"
                />

                <div>
                  <p className="font-medium">
                    {place.owner_detail?.first_name}{" "}
                    {place.owner_detail?.last_name}
                  </p>

                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MdOutlineEmail />
                    {place.owner_detail?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* INFO */}
            <div className="border-t pt-4 space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-300">
                📍 {place.address}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                🏙 {place.city_detail?.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                📞 {place.contact_number || "N/A"}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                ⏰ {place.opening_hours || "Not specified"}
              </p>
            </div>

            {/* BACK BUTTON */}
            <Link
              to="/places"
              className="flex items-center justify-center gap-2
              bg-gray-900 hover:bg-black dark:bg-white dark:text-black
              text-white py-3 rounded-xl transition font-medium"
            >
              <FiArrowLeft />
              Back to Places
            </Link>
          </aside>
        </div>

        {/* COMMENTS */}
        <div className="border-t pt-8">
          <PlaceComments place_id={place.id} />
        </div>
      </div>
    </section>
  );
};

/* ===== COMPONENTS ===== */

const Card = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
    <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
      {title}
    </h2>
    {children}
  </div>
);

const Tag = ({ icon, text }) => (
  <span
    className="flex items-center gap-2 px-3 py-1.5 rounded-full
    bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700
    text-sm text-gray-700 dark:text-gray-200 shadow-sm"
  >
    {icon}
    {text}
  </span>
);
