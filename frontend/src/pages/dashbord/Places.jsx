import { Link } from "react-router-dom";
import {
  useDeletePlace,
  usePlaceCity,
  usePlaceOwner,
  usePlaces,
} from "../../hooks/usePlaces";

// helper components
import { NotFoundData } from "../../components/helper/NotFoundData";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";
import { toast } from "react-toastify";

export const Places = () => {
  // hooks
  const { places, error, loading, refetch, hasPlace } = usePlaces();
  const {
    deletePlace,
    error: deleteError,
    loading: deleteLoading,
  } = useDeletePlace();

  // search placeholder
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    toast.info("Search not implemented yet");
  };

  // delete place
  const handleDelete = async (place_id) => {
    const result = await deletePlace(place_id);
    if (result) {
      refetch();
      toast.success("Place deleted successfully");
    } else {
      toast.error(deleteError || "Something went wrong");
    }
  };

  // loading & error UI
  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  // single row component
  const PlaceRow = ({ place }) => {
    const { data: owner } = usePlaceOwner(place.user_id);
    const { data: city } = usePlaceCity(place.city_id);

    return (
      <tr className="hover:bg-gray-50 dark:hover:bg-slate-600">
        <td className="px-6 py-4 whitespace-nowrap">{place.id}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <Link
            to={`/dashboard/places/${place.id}`}
            className="bg-sky-700 py-1 px-2 rounded text-white text-sm"
          >
            {place.name}
          </Link>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{place.address}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {owner ? `${owner.firstname} ${owner.lastname}` : "Loading..."}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {city?.name || "Loading..."}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">${place.price}</td>

        <td className="px-6 py-4 whitespace-nowrap flex gap-2">
          <button className="text-sky-600">Edit</button>
          <button
            disabled={deleteLoading}
            onClick={() => handleDelete(place.id)}
            className="text-red-600"
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className=" dark:bg-slate-900 dark:text-white/80 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Places Dashboard</h1>

      <div className="bg-white dark:bg-slate-700 shadow-md rounded-lg">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:justify-between items-center p-4 gap-3">
          <Link
            to="add"
            className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800"
          >
            + Add New Place
          </Link>

          <form
            onSubmit={handleSearchSubmit}
            className="flex gap-2 w-full md:w-1/3"
          >
            <input
              type="text"
              placeholder="Search place..."
              className="w-full px-4 py-2 rounded border focus:outline-none"
            />
            <button className="px-4 bg-green-700 text-white rounded">
              Search
            </button>
          </form>
        </div>

        {/* Table */}
        {!hasPlace ? (
          <NotFoundData text="No places found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1000px] divide-y divide-gray-200">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-6 py-3 whitespace-nowrap">#</th>
                  <th className="px-6 py-3 whitespace-nowrap">Name</th>
                  <th className="px-6 py-3 whitespace-nowrap">Address</th>
                  <th className="px-6 py-3 whitespace-nowrap">Owner</th>
                  <th className="px-6 py-3 whitespace-nowrap">City</th>
                  <th className="px-6 py-3 whitespace-nowrap">Price</th>
                  <th className="px-6 py-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {places.map((place) => (
                  <PlaceRow key={place.id} place={place} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
