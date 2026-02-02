import {
  FaGlobeAmericas,
  FaMapMarkedAlt,
  FaHeart,
  FaRocket,
  FaCity,
  FaUsers,
  FaStar,
} from "react-icons/fa";

import { useCities } from "../hooks/useCities";
import { usePlaces } from "../hooks/usePlaces";
import { useUsers } from "../hooks/useUsers";

export const About = () => {
  const { cities = [] } = useCities();
  const { places = [] } = usePlaces();
  const { users = [] } = useUsers();

  return (
    <section className="relative w-full min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white pb-10 pt-28">
      <div className="max-w-7xl mx-auto px-5">
        {/* ---------------- Hero ---------------- */}
        <div className="text-center mb-20">
          <h1 className="font-caveat text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Explore Cities <span className="text-green-500">Smarter</span>
          </h1>

          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Discover new places, explore cities, and create unforgettable
            experiences with <strong>City Explor</strong>.
          </p>
        </div>

        {/* ---------------- Main Content ---------------- */}
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Explore Cities Like Never Before
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              City Explor helps you find the best destinations, hidden gems, and
              must-visit places in cities around the world.
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Whether you are traveling for fun, adventure, or inspiration, we
              make exploring cities easy, exciting, and memorable.
            </p>

            <div className="flex gap-4 flex-wrap">
              <span className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-green-500 text-white">
                <FaGlobeAmericas />
                Travel
              </span>
              <span className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-indigo-500 text-white">
                <FaMapMarkedAlt />
                Discover
              </span>
              <span className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-pink-500 text-white">
                <FaHeart />
                Save
              </span>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>

            <h3 className="text-xl font-semibold mb-6 text-green-500">
              Why Choose City Explor?
            </h3>

            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-3">
                <FaCity className="text-green-500" />
                Curated city guides
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkedAlt className="text-indigo-500" />
                Hidden local spots
              </li>
              <li className="flex items-center gap-3">
                <FaHeart className="text-pink-500" />
                Save your favorite places
              </li>
              <li className="flex items-center gap-3">
                <FaRocket className="text-purple-500" />
                Simple & fast experience
              </li>
            </ul>
          </div>
        </div>

        {/* ---------------- Stats ---------------- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          {[
            {
              value: `${places.length}+`,
              label: "Places",
              icon: FaMapMarkedAlt,
            },
            {
              value: `${cities.length}+`,
              label: "Cities",
              icon: FaCity,
            },
            {
              value: `${users.length}k+`,
              label: "Users",
              icon: FaUsers,
            },
            {
              value: "4.9",
              label: "Rating",
              icon: FaStar,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 text-center
                         hover:scale-105 transition-transform duration-300"
            >
              <item.icon className="mx-auto text-2xl text-green-500 mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {item.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
