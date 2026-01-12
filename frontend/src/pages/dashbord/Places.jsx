import { Link } from "react-router-dom";
import {
  useDeletePlace,
  usePlaceCategory,
  usePlaceCity,
  usePlaceOwner,
  usePlaces,
} from "../../hooks/usePlaces";

import { NotFoundData } from "../../components/helper/NotFoundData";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { toast } from "react-toastify";

export const Places = () => {
  const { places, error, loading, refetch, hasPlace } = usePlaces();
  const { deletePlace, loading: deleteLoading } = useDeletePlace();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    toast.info("Search coming soon 🚧");
  };

  const handleDelete = async (id) => {
    const ok = await deletePlace(id);
    if (ok) {
      toast.success("Place deleted");
      refetch();
    } else {
      toast.error("Failed to delete place");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  const PlaceRow = ({ place, index }) => {
    const { data: category } = usePlaceCategory(place.category_id);
    const { data: owner } = usePlaceOwner(place.user_id);
    const { data: city } = usePlaceCity(place.city_id);

    return (
      <tr className="hover:bg-indigo-50 dark:hover:bg-slate-900 dark:text-white transition">
        <td className="px-6 py-4 text-slate-200">{index + 1}</td>

        <td
          className="px-6 py-2 hover:underline disabled:opacity-50bg-red-100 text-black dark:bg-green-900 dark:text-blue-200 inline-flex items-center px-3 py-1 rounded text-xs 
          font-semibold"
        >
          <Link to={`/dashboard/places/${place.id}`}>{place.name}</Link>
        </td>
        <td className="px-6 py-4 text-slate-400">
          {owner ? `${owner.firstname} ${owner.lastname}` : "Loading..."}
        </td>
        <td className="px-6 py-4 text-slate-400">
          {city?.name || "Loading..."}
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

        <td className="px-6 py-4 text-slate-400 max-w-xs truncate">
          {place.address}
        </td>
        <td className="px-6 py-4 font-medium text-emerald-600">
          ${place.price}
        </td>

        <td className="px-6 py-4 flex gap-3">
          <Link
            to={`edit/${place.id}`}
            className="hover:underline disabled:opacity-50bg-red-100 text-black dark:bg-sky-700 dark:text-blue-200 inline-flex items-center px-3 py-1 rounded text-xs 
          font-semibold"
          >
            Edit
          </Link>

          <button
            onClick={() => handleDelete(place.id)}
            disabled={deleteLoading}
            className="hover:underline disabled:opacity-50bg-red-100 text-black dark:bg-red-900 dark:text-blue-200 inline-flex items-center px-3 py-1 rounded text-xs 
          font-semibold"
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
        Places Dashboard
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4 p-5 border-b dark:border-slate-700">
          <Link
            to="add"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold"
          >
            + Add Place
          </Link>

          <form
            onSubmit={handleSearchSubmit}
            className="flex gap-2 w-full md:w-1/3"
          >
            <input
              placeholder="Search places..."
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button className="px-4 rounded-lg bg-emerald-600 text-white">
              Search
            </button>
          </form>
        </div>

        {!hasPlace ? (
          <NotFoundData text="No places available" />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead className="bg-indigo-600 text-white">
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
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-200 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y dark:divide-slate-700">
                {places.map((place, index) => (
                  <PlaceRow key={place.id} place={place} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
