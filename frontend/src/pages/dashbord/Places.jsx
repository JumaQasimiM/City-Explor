import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

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
import { EditPlace } from "../dashbord/EditModals/EditPlace";

export const Places = () => {
  /* ================= STATE ================= */
  const [basePlaces, setBasePlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchPlace, setSearchPlace] = useState("");
  const [placeEditId, setPlaceEditId] = useState(null);

  /* ================= DATA ================= */
  const { places, error, loading, refetch } = usePlaces();
  const { deletePlace, loading: deleting } = useDeletePlace();
  const { user } = useAuth();

  /* ================= ROLE FILTER ================= */
  useEffect(() => {
    if (!places || !user) return;

    const data =
      user?.user?.role === "admin"
        ? places
        : places.filter((p) => p.owner === user?.user?.id);

    setBasePlaces(data);
    setFilteredPlaces(data);
  }, [places, user]);

  /* ================= SEARCH ================= */
  useEffect(() => {
    const query = searchPlace.toLowerCase();
    setFilteredPlaces(
      basePlaces.filter(
        (p) =>
          p.name?.toLowerCase().includes(query) ||
          p.address?.toLowerCase().includes(query),
      ),
    );
  }, [searchPlace, basePlaces]);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Delete this place?")) return;

    const success = await deletePlace(id);
    success ? toast.success("Place deleted") : toast.error("Delete failed");
    success && refetch();
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  /* ================= ROW ================= */
  const PlaceRow = ({ place, index }) => {
    const canManage =
      user?.user?.role === "admin" || place.owner === user?.user?.id;

    return (
      <tr className="hover:bg-slate-100 dark:hover:bg-slate-700/40 transition">
        <td className="px-4 py-3">{index + 1}</td>

        <td className="px-4 py-3">
          <Link
            to={`/dashboard/places/${place.id}/`}
            className="font-semibold text-indigo-600 hover:underline"
          >
            {place.name}
          </Link>
        </td>

        <td className="px-4 py-3 text-slate-500">
          {`${place.owner_detail.first_name} ${place.owner_detail.last_name}`}
        </td>

        <td className="px-4 py-3">{place.city_detail?.name}</td>

        <td className="px-4 py-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              place.category_detail?.name === "Hospital"
                ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
            }`}
          >
            {place.category_detail?.name || "Loading..."}
          </span>
        </td>

        <td className="px-4 py-3 max-w-xs truncate text-slate-500">
          {place.address}
        </td>

        <td className="px-4 py-3 font-semibold text-emerald-600">
          ${place.contact_number}
        </td>

        <td className="px-4 py-3">
          {canManage && (
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setPlaceEditId(place.id)}
                className="p-2 rounded-md text-sky-600 hover:bg-sky-600/10 transition"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(place.id)}
                disabled={deleting}
                className="p-2 rounded-md text-red-600 hover:bg-red-600/10 transition
                disabled:opacity-50"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <>
      <section className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
              Places Management
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage all registered places
            </p>
          </div>

          <Link
            to="add"
            className="bg-indigo-600 hover:bg-indigo-700 text-white
            px-6 py-2 rounded-md font-medium transition"
          >
            + Add Place
          </Link>
        </div>

        {/* ================= SEARCH ================= */}
        <input
          type="text"
          placeholder="Search by name or address..."
          value={searchPlace}
          onChange={(e) => setSearchPlace(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-md border
          dark:border-slate-600 bg-white dark:bg-slate-700
          focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        {/* ================= TABLE ================= */}
        {filteredPlaces.length === 0 ? (
          <NotFoundData text="No places found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Owner</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-center">Actions</th>
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
      </section>

      {/* ================= EDIT MODAL ================= */}
      {placeEditId && (
        <EditPlace
          id={placeEditId}
          onClose={() => {
            setPlaceEditId(null);
            refetch();
          }}
        />
      )}
    </>
  );
};
