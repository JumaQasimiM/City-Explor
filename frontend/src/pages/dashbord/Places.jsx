import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Places = () => {
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/places"); // json-server full db
        const data = await res.json();

        setPlaces(data);
        setCities(data.cities || []);
        setCategories(data.categories || []);
        setUsers(data.users || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Helpers
  const getCityName = (id) => cities.find((c) => c.id === id)?.name || "-";

  const getCategoryName = (id) =>
    categories.find((c) => c.id === id)?.name || "-";

  const getUserName = (id) => {
    const user = users.find((u) => u.id === id);
    return user ? `${user.firstname} ${user.lastname}` : "-";
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert("Search not completed");
  };

  return (
    <div className="p-6 dark:bg-slate-900 dark:text-white/80 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Places Dashboard</h1>

      <div className="bg-white dark:bg-slate-700 shadow-md rounded-lg overflow-x-auto">
        {/* Top bar */}
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
              className="w-full px-4 py-2 rounded border focus:outline-none"
              type="text"
              placeholder="Search place..."
            />
            <button className="px-4 bg-green-700 text-white rounded">
              Search
            </button>
          </form>
        </div>

        {/* Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Owner</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Services</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {places.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No places found
                </td>
              </tr>
            ) : (
              places.map((place) => (
                <tr
                  key={place.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-600"
                >
                  <td className="px-6 py-4">{place.id}</td>
                  <td className="px-6 py-4 font-medium">{place.name}</td>
                  <td className="px-6 py-4">
                    {place.description?.slice(0, 35)}...
                  </td>
                  <td className="px-6 py-4">{place.address}</td>
                  <td className="px-6 py-4">
                    {getCategoryName(place.category_id)}
                  </td>
                  <td className="px-6 py-4">{getUserName(place.user_id)}</td>
                  <td className="px-6 py-4">${place.price}</td>
                  <td className="px-6 py-4">{place.srevices?.join(", ")}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
