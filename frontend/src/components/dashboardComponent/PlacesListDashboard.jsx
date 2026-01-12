import {
  usePlaceCategory,
  usePlaceCity,
  usePlaceOwner,
  usePlaces,
} from "../../hooks/usePlaces";
import { Link } from "react-router-dom";

export const PlacesListDashboard = () => {
  const { places } = usePlaces();

  const PlaceRow = ({ place, index }) => {
    const { data: owner } = usePlaceOwner(place.user_id);
    const { data: city } = usePlaceCity(place.city_id);
    const { data: category } = usePlaceCategory(place.category_id);

    return (
      <tr className="dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 transition">
        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
          {index + 1}
        </td>

        <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
          {place.name}
        </td>

        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
          {owner?.firstname || "—"}
        </td>

        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
          {city?.name || "—"}
        </td>

        <td className="px-6 py-4">
          <span
            className={`${
              category?.name === "Hospital"
                ? "bg-red-100 text-black dark:bg-red-900 dark:text-blue-200"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
            } inline-flex items-center px-3 py-1 rounded text-xs 
          font-semibold `}
          >
            {category?.name}
          </span>
        </td>

        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
          {place.address}
        </td>

        <td className="px-6 py-4 text-center">
          <Link
            to={`/dashboard/places/${place.id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 transition"
          >
            View
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <section className="bg-white dark:bg-slate-800 rounded shadow-md w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Places
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage all registered places
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[480px]">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-sky-800 dark:text-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">
                Address
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-200 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {places.map((place, index) => (
              <PlaceRow key={place.id} place={place} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
