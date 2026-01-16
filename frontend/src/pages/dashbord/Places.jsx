import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
import { useAuth } from "../../context/AuthContext";

export const Places = () => {
  const [basePlaces, setBasePlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchPlace, setSearchPlace] = useState("");

  const { places, error, loading, refetch } = usePlaces();
  const { deletePlace, loading: deleteLoading } = useDeletePlace();
  const { user } = useAuth();

  // ================= LOAD PLACES (ROLE BASED) =================
  useEffect(() => {
    if (!places || !user) return;

    let data = [];

    if (user.role === "admin") {
      data = places;
    } else if (user.role === "owner") {
      data = places.filter((place) => place.user_id === user.id);
    }

    setBasePlaces(data);
    setFilteredPlaces(data);
  }, [places, user]);

  // ================= LIVE SEARCH =================
  useEffect(() => {
    const query = searchPlace.toLowerCase();

    const result = basePlaces.filter(
      (place) =>
        place.name?.toLowerCase().includes(query) ||
        place.address?.toLowerCase().includes(query)
    );

    setFilteredPlaces(result);
  }, [searchPlace, basePlaces]);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const ok = await deletePlace(id);

    if (ok) {
      toast.success("Place deleted successfully");
      refetch();
    } else {
      toast.error("Failed to delete place");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  // ================= ROW =================
  const PlaceRow = ({ place, index }) => {
    const { data: category } = usePlaceCategory(place.category_id);
    const { data: owner } = usePlaceOwner(place.user_id);
    const { data: city } = usePlaceCity(place.city_id);

    return (
      <tr className="hover:bg-indigo-50 dark:hover:bg-slate-900 transition">
        <td className="px-6 py-4">{index + 1}</td>

        <td className="px-6 py-4">
          <Link
            to={`/dashboard/places/${place.id}`}
            className="font-semibold text-indigo-600 hover:underline"
          >
            {place.name}
          </Link>
        </td>

        <td className="px-6 py-4 text-slate-500">
          {owner ? `${owner.firstname} ${owner.lastname}` : "Loading..."}
        </td>

        <td className="px-6 py-4 text-slate-500">
          {city?.name || "Loading..."}
        </td>

        <td className="px-6 py-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded text-xs font-semibold
              ${
                category?.name === "Hospital"
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
              }`}
          >
            {category?.name || "Loading..."}
          </span>
        </td>

        <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
          {place.address}
        </td>

        <td className="px-6 py-4 font-semibold text-emerald-600">
          ${place.price}
        </td>

        <td className="px-6 py-4 flex gap-3 justify-center">
          {(user.role === "admin" || place.user_id === user.id) && (
            <Link
              to={`edit/${place.id}`}
              className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded text-xs font-semibold"
            >
              Edit
            </Link>
          )}

          {user.role === "admin" && (
            <button
              onClick={() => handleDelete(place.id)}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold disabled:opacity-50"
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </button>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="p-3 md:p-6 bg-white/70 dark:bg-slate-800 rounded">
      {/* ================= TOP BAR ================= */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <Link
          to="add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 font-semibold rounded"
        >
          Add Place
        </Link>

        <input
          type="text"
          placeholder="Search by name or address..."
          value={searchPlace}
          onChange={(e) => setSearchPlace(e.target.value)}
          className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 border rounded
          focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* ================= TABLE ================= */}
      {filteredPlaces.length === 0 ? (
        <NotFoundData text="No places found" />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left uppercase">#</th>
                <th className="px-6 py-3 text-left uppercase">Name</th>
                <th className="px-6 py-3 text-left uppercase">Owner</th>
                <th className="px-6 py-3 text-left uppercase">City</th>
                <th className="px-6 py-3 text-left uppercase">Category</th>
                <th className="px-6 py-3 text-left uppercase">Address</th>
                <th className="px-6 py-3 text-left uppercase">Price</th>
                <th className="px-6 py-3 text-center uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y dark:divide-slate-700">
              {filteredPlaces.map((place, index) => (
                <PlaceRow key={place.id} place={place} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
