import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlaceById } from "../hooks/usePlaces";

import { Loader } from "../components/helper/Loading";
import { ErrorMessage } from "../components/helper/Error";

import { FaMapMarkerAlt, FaPhoneAlt, FaGlobe } from "react-icons/fa";
import { MdOutlineEmail, MdCategory } from "react-icons/md";
import { FiArrowLeft, FiClock } from "react-icons/fi";

import { PlaceComments } from "../components/PlaceComment";
import { Map } from "../components/Map";

// image
import place_cover from "../assets/place_cover.png";
export const PlaceDetailOnSite = () => {
  const { id } = useParams();
  const { data: place, loading, error } = usePlaceById(id);

  const [activeImage, setActiveImage] = useState(null);
  const images = place?.images || [];

  useEffect(() => {
    if (images.length > 0) setActiveImage(images[0].image);
  }, [place]);

  if (loading)
    return (
      <div className="mt-17">
        <Loader text={"loading place"} />
      </div>
    );
  if (error)
    return (
      <div className="mt-17 ">
        <ErrorMessage />
      </div>
    );

  if (!place) return null;
  // gallray

  const galleryImages =
    images.length > 0
      ? images
      : Array.from({ length: 4 }, (_, index) => ({
          id: index,
          image: place_cover,
        }));
  return (
    <section className="bg-zinc-50 dark:bg-[#0b0f19] min-h-screen py-20 mt-5 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* ===== header ===== */}
        <div className="mb-14">
          <h1 className="text-3xl md:text-5xl font-semibold font-quicksand tracking-tight text-zinc-900 dark:text-white">
            {place.name}
          </h1>

          <div className="flex items-center gap-2 mt-3 text-sm text-zinc-500">
            <FaMapMarkerAlt />
            <span>{place.city_detail?.name}</span>
            <span className="opacity-40">•</span>
            <span>{place.address}</span>
          </div>
        </div>
        {/* ===== gallary ===== */}
        {/* {images.length > 0  && (  */}{" "}
        {/* image when use Cloud for save the images */}
        {images && (
          <div className="grid md:grid-cols-4 gap-4 mb-6 md:mb-14">
            <div className="md:col-span-3">
              <img
                src={activeImage || place_cover}
                onError={(e) => (e.target.src = place_cover)}
                className="w-full h-[420px] object-cover rounded border border-zinc-200 dark:border-zinc-800"
              />
            </div>

            <div className="flex md:flex-col gap-3 overflow-auto">
              {galleryImages.map((img) => (
                <img
                  key={img.id}
                  src={img.image || place_cover}
                  onClick={() => setActiveImage(img.image)}
                  onError={(e) => (e.target.src = place_cover)}
                  className={`cursor-pointer rounded object-cover h-25 md:h-[95px]
                  border transition
                  ${
                    activeImage === img.image
                      ? "border-black dark:border-white"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        {/* ===== GRID ===== */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* ===== LEFT ===== */}
          <div className="lg:col-span-2 space-y-5 text-justify">
            <Card title="About">
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {place.description || "No description available."}
              </p>
            </Card>

            {place.services_detail?.length > 0 && (
              <Card title="Services">
                <div className="flex flex-wrap gap-2">
                  {place.services_detail.map((s) => (
                    <span
                      key={s.id}
                      className="px-3 py-1 text-xs rounded-full 
                      bg-zinc-100 dark:bg-slate-800 dark:text-white/60
                      border border-zinc-200 dark:border-zinc-700"
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* MAP */}
            {(place.latitude || place.longitude) && (
              <Card title="Location">
                {/* location */}
                <div className="flex items-center gap-2 my-3 text-sm text-zinc-500">
                  <FaMapMarkerAlt />
                  <span>{place.city_detail?.name}</span>
                  <span className="opacity-40">•</span>
                  <span>{place.address}</span>
                </div>
                <Map lat={place.latitude} lng={place.longitude} />
              </Card>
            )}

            <Card title="Reviews">
              <PlaceComments place_id={place.id} />
            </Card>
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-6">
              <InfoBlock
                icon={<MdCategory />}
                label="Category"
                value={place.category_detail?.name}
              />

              {/* OWNER */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
                <p className="text-xs uppercase text-zinc-400 mb-3 tracking-wide">
                  Owner
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={place.owner_detail?.avatar || place_cover}
                    onError={(e) => (e.target.src = place_cover)}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {place.owner_detail?.first_name}{" "}
                      {place.owner_detail?.last_name}
                    </p>

                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                      <MdOutlineEmail />
                      {place.owner_detail?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* DETAILS */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5 space-y-3 text-sm">
                <InfoRow icon={<FaMapMarkerAlt />} text={place.address} />
                {place.contact_number && (
                  <InfoRow icon={<FaPhoneAlt />} text={place.contact_number} />
                )}

                <InfoRow icon={<FiClock />} text={place.opening_hours} />

                {place.website && (
                  <a
                    href={place.website}
                    target="_blank"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <FaGlobe />
                    Website
                  </a>
                )}
              </div>

              {/* BUTTON */}
              <Link
                to="/places"
                className="flex items-center justify-center gap-2
                bg-zinc-900 dark:bg-slate-700 hover:bg-black
                text-white py-3 rounded-lg
                text-sm font-medium transition"
              >
                <FiArrowLeft />
                Back
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
  <div className="p-1 md:p-4">
    <h2 className="text-xl font-semibold md:font-bold font-quicksand mb-2 text-gray-700 dark:text-white">
      {title}
    </h2>
    {children}
  </div>
);

const InfoBlock = ({ icon, label, value }) => (
  <div>
    <p className="text-xs uppercase text-gray-400 tracking-wide mb-1 flex items-center gap-1 font-quicksand">
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
