import {
  usePlaceCategory,
  usePlaceCity,
  usePlaceOwner,
  usePlaces,
} from "../../hooks/usePlaces";
import { Link } from "react-router-dom";

import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { FaMapMarkerAlt, FaUser, FaTag } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
export const PlacesListDashboard = () => {
  // fitler place owner base
  const [basePlace, setBasePlaces] = useState([]);
  const [filterOwnerBasePlace, setFilterOwnerBasePlace] = useState([]);

  // get all places from api
  const { places = [], loading, error } = usePlaces();
  const { user } = useAuth();
  useEffect(() => {
    if (!places || !user) return;
    const data =
      user?.user?.role === "admin"
        ? places
        : places.filter((place) => place.owner == user?.user?.id);
    setBasePlaces(data);
    setFilterOwnerBasePlace(data);
  }, [places, user]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const PlaceRow = ({ place, index }) => {
    return (
      <tr
        className="
        hover:bg-gray-50 dark:hover:bg-slate-800
        transition border-b border-gray-100 dark:border-slate-700"
      >
        {/* INDEX */}
        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
          {index + 1}
        </td>

        {/* NAME */}
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {place.name}
        </td>

        {/* OWNER */}
        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            {/* <FaUser className="text-gray-400" /> */}
            {place.owner_detail?.first_name} {place.owner_detail?.last_name}
          </div>
        </td>

        {/* CITY */}
        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            {/* <FaMapMarkerAlt className="text-gray-400" /> */}
            {place.city_detail?.name || "—"}
          </div>
        </td>

        {/* CATEGORY BADGE */}
        <td className="px-6 py-4">
          <span
            className={`
              inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
              ${
                place?.category_detail?.name === "Hospital"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                  : category?.name === "Restaurant"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                    : "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
              }
            `}
          >
            <FaTag className="text-xs" />
            {place.category_detail?.name || "—"}
          </span>
        </td>

        {/* ADDRESS */}
        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-[220px] truncate">
          {place.address}
        </td>

        {/* ACTION */}
        <td className="px-6 py-4 text-center">
          <Link
            to={`/dashboard/places/${place.id}`}
            className="
              inline-flex items-center px-4 py-2 text-sm font-medium
              bg-slate-900 text-white dark:bg-white dark:text-slate-900
              rounded-lg hover:opacity-90 transition"
          >
            View
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <section
      className="
      bg-white dark:bg-slate-900
      border border-gray-200 dark:border-slate-800
      rounded shadow-sm"
    >
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Places Management
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage all registered places in one place
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-900 text-white dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Owner</th>
              <th className="px-6 py-3 text-left">City</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filterOwnerBasePlace.map((place, index) => (
              <PlaceRow key={place.id} place={place} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
