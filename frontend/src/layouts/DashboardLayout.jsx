import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { HiMiniHomeModern } from "react-icons/hi2";
import {
  FaClipboardList,
  FaUsers,
  FaCity,
  FaGlobe,
  FaCog,
  FaUser,
} from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { MdDashboard } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";

// image
import avator from "../assets/hero.jpg";

export const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(null);

  // Sidebar items
  const navItems = [
    { name: "Dashboard", to: "/dashboard", icon: <MdDashboard /> },
    {
      name: "Places",
      icon: <HiMiniHomeModern />,
      dropdown: [
        { name: "Add place", to: "/dashboard/places/add" },
        { name: "places List", to: "/dashboard/places" },
      ],
    },
    { name: "Bookings", to: "/dashboard/bookings", icon: <FaClipboardList /> },
    {
      name: "Users",
      icon: <FaUsers />,
      dropdown: [
        { name: "Add User", to: "/dashboard/users/add" },
        { name: "User list", to: "/dashboard/users" },
      ],
    },
    {
      name: "Cities",
      icon: <FaCity />,
      to: "/dashboard/cities",
    },
    {
      name: "Countries",
      icon: <FaGlobe />,
      to: "/dashboard/countries",
    },
    {
      name: "Categories",
      icon: <FaGlobe />,
      to: "/dashboard/categories",
    },
    { name: "Settings", to: "/dashboard/settings", icon: <FaCog /> },
  ];

  return (
    <section className="min-h-screen flex dark:bg-slate-900 dark:text-white/80">
      {/* ================= SIDEBAR ================= */}
      <div>
        {/* Avatar section */}
        <div className="hidden md:flex bg-slate-700 flex items-center gap-4 py-4 px-3 border-b-2 border-b-gray-600">
          <img
            src={avator}
            alt="Admin Avatar"
            className="w-16 h-16 rounded-full border-2 border-gray-200"
          />
          <div className="flex flex-col">
            <h2 className="text-white text-lg font-semibold">Qasimi</h2>
            <div className="flex items-center gap-2 text-green-500">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm">online</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden md:flex w-60 bg-slate-800 min-h-screen p-4 flex flex-col">
          <ul className="flex-1 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => (
              <li key={index}>
                {/* ===== NORMAL LINK ===== */}
                {!item.dropdown && (
                  <NavLink
                    to={item.to}
                    end={item.to === "/dashboard"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-md
                       text-white/80 hover:bg-slate-700 transition-colors
                       ${isActive ? "bg-green-500 text-white" : ""}`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                )}

                {/* ===== DROPDOWN MENU ===== */}
                {item.dropdown && (
                  <>
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === index ? null : index)
                      }
                      className="w-full flex items-center gap-3 px-4 py-2 rounded-md
                                 text-white/80 hover:bg-slate-700 transition"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="flex-1 text-left font-medium">
                        {item.name}
                      </span>
                      <span
                        className={`transition-transform ${
                          openMenu === index ? "rotate-90" : ""
                        }`}
                      >
                        <MdOutlineKeyboardArrowRight />
                      </span>
                    </button>

                    {openMenu === index && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.dropdown.map((sub) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded text-sm
                               hover:bg-slate-700
                               ${
                                 isActive
                                   ? "bg-green-600 text-white"
                                   : "text-white/70"
                               }`
                            }
                          >
                            {sub.name}
                          </NavLink>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col bg-gray-100 dark:bg-slate-900">
        {/* Header */}
        <header
          className="flex justify-between items-center bg-white dark:bg-slate-900
                           dark:text-white/80 px-6 py-4 border-b border-white/10"
        >
          <Link to="/dashboard">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </Link>

          <div className="flex items-center gap-5 text-lg">
            <FaUser
              size={23}
              className="cursor-pointer hover:text-green-500 transition"
            />
            <Link to="/">
              <AiOutlineLogout
                size={23}
                className="cursor-pointer hover:text-red-500 transition"
              />
            </Link>
            <GrLanguage
              size={23}
              className="cursor-pointer hover:text-green-500 transition"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </section>
  );
};
