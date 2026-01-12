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
import hotel2 from "../assets/Hotel2.jpg";

import avatorImage from "../assets/Hotel1.jpg";

// Fix leaflet marker icon issue
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export const PlaceDetailOnSite = () => {
  const { id } = useParams();
  const { data: place, loading, error } = usePlaceById(id);

  const { data: owner } = usePlaceOwner(place?.user_id);
  const { data: city } = usePlaceCity(place?.city_id);
  const { data: category } = usePlaceCategory(place?.category_id);

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
            src={restaurant1}
            alt={place.name}
            className="w-full h-[260px] md:h-[420px] object-cover rounded-2xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[restaurant2, restaurant3, restaurant4, hotel2].map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className="w-full h-[125px] md:h-[200px] object-cover rounded-xl"
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
      {/* Map */}
      <div className="mt-10">
        <MapContainer
          center={[place.lat || defaultLat, place.lng || defaultLng]}
          zoom={15}
          scrollWheelZoom={false}
          className="w-full h-[300px] md:h-[400px] rounded-xl"
        >
          {/* Satellite tiles using ESRI */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and others"
          />
          <Marker position={[place.lat || defaultLat, place.lng || defaultLng]}>
            <Popup>{place.name}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};
