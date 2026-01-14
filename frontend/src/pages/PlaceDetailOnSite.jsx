import { useParams, Link } from "react-router-dom";
import {
  usePlaceById,
  usePlaceCategory,
  usePlaceCity,
  usePlaceOwner,
} from "../hooks/usePlaces";

import { FaMapMarkerAlt, FaTag, FaUser, FaStar } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import restaurant1 from "../assets/restaurant1.jpg";
import restaurant2 from "../assets/restaurant2.jpg";
import restaurant3 from "../assets/restaurant3.jpg";
import restaurant4 from "../assets/restaurant3.jpg";
import hotel1 from "../assets/Hotel1.jpg";
import hotel2 from "../assets/Hotel2.jpg";
import hotel3 from "../assets/Hotel3.jpg";
import hotel4 from "../assets/Hotel4.jpg";

import hospital1 from "../assets/hospital1.jpg";
import hospital2 from "../assets/hospital2.jpg";
import hospital3 from "../assets/hospital3.jpg";
import pharmacy1 from "../assets/pharmacy1.jpg";
import pharmacy2 from "../assets/pharmacy2.webp";
import supermarket1 from "../assets/supermarket1.jpg";
import supermarket2 from "../assets/supermarket2.jpg";
import supermarket3 from "../assets/supermarket3.jpg";
import jaghori1 from "../assets/jaghori1.jpg";
import avatorImage from "../assets/Hotel1.jpg";

const restaurantImage = [restaurant1, restaurant2, restaurant3, restaurant4];
const hotelImage = [hotel1, hotel2, hotel3, hotel4];
const supermarketImage = [supermarket1, supermarket2, supermarket3, jaghori1];
const hospitalImage = [hospital1, hospital2, hospital3, pharmacy2];
const pharmacyImage = [pharmacy1, pharmacy2, hospital3, hospital2];

const categoryImagesMap = {
  Hotel: hotelImage,
  Restaurant: restaurantImage,
  Hospital: hospitalImage,
  Supermarket: supermarketImage,
  Pharmacy: pharmacyImage,
};

export const PlaceDetailOnSite = () => {
  const { id } = useParams();
  const { data: place, loading, error } = usePlaceById(id);

  const { data: owner } = usePlaceOwner(place?.user_id);
  const { data: city } = usePlaceCity(place?.city_id);
  const { data: category } = usePlaceCategory(place?.category_id);

  const images = categoryImagesMap[category?.name] || [restaurant1, hospital1];

  // Default location: Jaghori, Afghanistan
  const defaultLat = 33.4579;
  const defaultLng = 68.6255;

  if (loading) {
    return <p className="text-center mt-20">Loading place details...</p>;
  }

  if (error || !place) {
    return <p className="text-center mt-20 text-red-500">Place not found.</p>;
  }

  return (
    <section className="bg-gray-100 dark:bg-slate-900 text-black/80 dark:text-white/90 py-5 md:py-10">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-5 mt-3">
            <h1 className="text-lg md:text-3xl font-bold">{place.name}</h1>
            <h1 className="text-sm md:text-lg flex text-orange-400">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <FaStar key={i} />
              ))}
            </h1>
          </div>
          <p className="flex items-center gap-2 text-sm mt-1 text-gray-600 dark:text-gray-400">
            <FaMapMarkerAlt className="text-orange-500" />
            {place.address}, {city?.name || "Jaghori"}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow rounded-xl px-6 py-4 text-center md:text-right">
          <p className="text-md font-bold text-green-500">${place.price}</p>
          <p className="text-sm text-gray-500">Per night for 2 Rooms</p>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <img
            src={
              category?.name === "Hotel"
                ? hotel2
                : category?.name === "Restaurant"
                ? restaurant2
                : category?.name === "Hospital"
                ? hospital1
                : category?.name === "Supermarket"
                ? supermarket1
                : category?.name === "Pharmacy"
                ? pharmacy1
                : supermarket2
            }
            alt={place.name}
            className="w-full h-[260px] md:h-[420px] object-cover rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className="w-full h-[125px] md:h-[200px] object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Badges */}
          <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow text-sm">
              <FaTag className="text-green-500" />
              {category?.name || "General"}
            </span>

            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow text-sm">
              <FaUser className="text-blue-500" />
              {owner?.firstname} {owner?.lastname}
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              About{" "}
              <span className="dark:text-green-500 text-blue-500">
                {place.name}
              </span>
            </h2>
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
                  title={service}
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
          {/* Owner Info */}
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

          {/* Address */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {place.address}
            </p>
          </div>

          {/* Back Button */}
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
