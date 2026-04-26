import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlaceById } from "../hooks/usePlaces";

import { Loader } from "../components/helper/Loading";
import { ErrorMessage } from "../components/helper/Error";

import { FaMapMarkerAlt, FaPhoneAlt, FaGlobe } from "react-icons/fa";
import { MdOutlineEmail, MdCategory } from "react-icons/md";
import { FiArrowLeft, FiClock } from "react-icons/fi";

import { PlaceComments } from "../components/PlaceComment";

export const PlaceDetailOnSite = () => {
  const { id } = useParams();
  const { data: place, loading, error } = usePlaceById(id);

  const [activeImage, setActiveImage] = useState(null);
  const images = place?.images || [];

  useEffect(() => {
    if (images.length > 0) setActiveImage(images[0].image);
  }, [place]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;
  if (!place) return null;

  return (
    <section className="bg-gray-50 dark:bg-[#0f172a] min-h-screen py-16 mt-15">
      <div className="max-w-7xl mx-auto px-5">
        {/* ===== HEADER ===== */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-700 dark:text-white/80">
            {place.name}
          </h1>

          <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
            <FaMapMarkerAlt className="opacity-70" />
            <span>{place.city_detail?.name}</span>
            <span className="opacity-40">•</span>
            <span>{place.address}</span>
          </div>
        </div>

        {/* ===== GALLERY ===== */}
        {images.length > 0 && (
          <div className="grid md:grid-cols-4 gap-4 mb-14">
            <div className="md:col-span-3">
              <img
                src={activeImage}
                className="w-full h-[420px] object-cover rounded border border-gray-200 dark:border-slate-700"
              />
            </div>

            <div className="flex md:flex-col gap-3 overflow-auto">
              {images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  onClick={() => setActiveImage(img.image)}
                  className={`cursor-pointer rounded object-cover h-24 md:h-[95px]
                  border transition-all duration-200
                  ${
                    activeImage === img.image
                      ? "border-black dark:border-white"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ===== GRID ===== */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* ===== LEFT ===== */}
          <div className="lg:col-span-2 space-y-8">
            <div className="-mt-10">
              <Card title="About">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {place.description || "No description available."}
                </p>
              </Card>
            </div>

            {place.services_detail?.length > 0 && (
              <Card title="Services">
                <div className="flex flex-wrap gap-2">
                  {place.services_detail.map((s) => (
                    <span
                      key={s.id}
                      className="px-3 py-1 text-xs rounded-full 
                      bg-gray-100 dark:bg-slate-800 dark:text-gray-300 font-semibold
                      border border-gray-200 dark:border-slate-700"
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            <Card title="Reviews">
              <PlaceComments place_id={place.id} />
            </Card>
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside className="sticky top-24 h-fit">
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded p-6 space-y-6 shadow-sm">
              {/* CATEGORY */}
              <InfoBlock
                icon={<MdCategory />}
                label="Information"
                value={place.name}
              />

              {/* OWNER */}
              <div className="border-t border-gray-200 dark:border-slate-700 pt-5">
                <p className="text-xs uppercase text-gray-400 mb-3 tracking-wide">
                  Owner Information
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={place.owner_detail?.avatar || "/default-avatar.png"}
                    className="w-11 h-11 rounded-full object-cover border border-gray-300 dark:border-slate-600"
                  />

                  <div className="">
                    <p className="text-sm font-medium text-gray-900 dark:text-white uppercase py-1">
                      {place.owner_detail?.first_name || "Unknown"}{" "}
                      {place.owner_detail?.last_name}
                    </p>

                    <p className="text-xs text-gray-500 flex items-center gap-1 dark:text-gray-300">
                      <MdOutlineEmail className="" />
                      {place.owner_detail?.email || "No email"}
                    </p>
                  </div>
                </div>
              </div>

              {/* DETAILS */}
              <div className="border-t border-gray-200 dark:border-slate-700 pt-5 space-y-3 text-sm">
                <InfoRow icon={<FaMapMarkerAlt />} text={place.address} />
                <InfoRow
                  icon={<FaPhoneAlt />}
                  text={place.contact_number || "No phone"}
                />
                <InfoRow
                  icon={<FiClock />}
                  text={place.opening_hours || "Not specified"}
                />

                {place.website && (
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <FaGlobe />
                    Visit Website
                  </a>
                )}
              </div>

              {/* BUTTON */}
              <Link
                to="/places"
                className="flex items-center justify-center gap-2
                bg-gray-900 hover:bg-black
                dark:bg-white dark:text-black
                text-white py-3 rounded
                text-sm font-medium transition"
              >
                <FiArrowLeft />
                Back to places
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

/* ===== COMPONENTS ===== */

const Card = ({ title, children }) => (
  <div className="p-5">
    <h2 className="text-xl font-semibold md:font-bold mb-2 text-gray-700 dark:text-white">
      {title}
    </h2>
    {children}
  </div>
);

const InfoBlock = ({ icon, label, value }) => (
  <div>
    <p className="text-xs uppercase text-gray-400 tracking-wide mb-1 flex items-center gap-1">
      {icon} {label}
    </p>
    <p className="text-sm font-medium text-gray-900 dark:text-white">
      {value || "—"}
    </p>
  </div>
);

const InfoRow = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
    <span className="opacity-70">{icon}</span>
    <span>{text}</span>
  </div>
);
