import { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCity,
  FaGlobe,
  FaCog,
  FaClipboardList,
} from "react-icons/fa";
import { HiMiniHomeModern } from "react-icons/hi2";
import { MdDashboard, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";

import avatar from "../assets/hero.jpeg";
import { useAuth } from "../context/AuthContext";

export const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 🔐 Role-based sidebar items
  const navItems = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <MdDashboard />,
      roles: ["admin"],
    },
    {
      name: "Places",
      icon: <HiMiniHomeModern />,
      roles: ["admin", "business"],
      dropdown: [
        { name: "Add place", to: "/dashboard/places/add" },
        { name: "Places list", to: "/dashboard/places" },
      ],
    },
    {
      name: "Users",
      icon: <FaUsers />,
      roles: ["admin"],
      dropdown: [
        { name: "Add User", to: "/register" },
        { name: "User list", to: "/dashboard/users" },
      ],
    },
    {
      name: "Cities",
      icon: <FaCity />,
      to: "/dashboard/cities",
      roles: ["admin"],
    },
    {
      name: "Countries",
      icon: <FaGlobe />,
      to: "/dashboard/countries",
      roles: ["admin"],
    },
    {
      name: "Categories",
      icon: <FaGlobe />,
      to: "/dashboard/categories",
      roles: ["admin"],
    },
    {
      name: "Blogs",
      icon: <FaClipboardList />,
      to: "/writer/blogs",
      roles: ["writer"],
    },
    {
      name: "Settings",
      icon: <FaCog />,
      to: "/dashboard/settings",
      roles: ["admin", "business", "writer"],
    },
  ];

  return (
    <section className="min-h-screen flex dark:bg-slate-900 dark:text-white/80">
      {/* ============ SIDEBAR ============ */}
      <aside className="hidden md:flex w-64 bg-slate-800 m-3 rounded p-4 flex-col">
        {/* Avatar */}
        <div className="flex items-center gap-4 pb-4 mb-4 border-b border-white/10">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-14 h-14 rounded-full border-2 border-gray-200"
          />
          <div>
            <h2 className="text-white font-semibold">
              {user?.firstname || "User"}
            </h2>
            <p className="text-sm text-green-400 capitalize">{role}</p>
          </div>
        </div>

        {/* Menu */}
        <ul className="space-y-2 overflow-y-auto flex-1">
          {navItems
            .filter((item) => item.roles.includes(role))
            .map((item, index) => (
              <li key={index}>
                {/* Simple Link */}
                {!item.dropdown && (
                  <NavLink
                    to={item.to}
                    end={item.to === "/dashboard"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-md transition
                      ${
                        isActive
                          ? "bg-green-600 text-white"
                          : "text-white/80 hover:bg-slate-700"
                      }`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                )}

                {/* Dropdown */}
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
                      <span className="flex-1 text-left">{item.name}</span>
                      <MdOutlineKeyboardArrowRight
                        className={`transition-transform ${
                          openMenu === index ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {openMenu === index && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.dropdown.map((sub) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded text-sm transition
                              ${
                                isActive
                                  ? "bg-green-600 text-white"
                                  : "text-white/70 hover:bg-slate-700"
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

      {/* ============ MAIN CONTENT ============ */}
      <main className="flex-1 flex flex-col bg-gray-100 dark:bg-slate-900">
        {/* Header */}
        <header
          className="flex justify-between items-center bg-white dark:bg-slate-800
          px-6 py-4 border-b border-white/10 m-3 rounded"
        >
          <Link to="/">
            <h1 className="text-lg font-bold">Dashboard</h1>
          </Link>

          <div className="flex items-center gap-5">
            <AiOutlineLogout
              size={22}
              onClick={handleLogout}
              className="cursor-pointer hover:text-red-500 transition"
            />
            <GrLanguage
              size={22}
              className="cursor-pointer hover:text-green-500 transition"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </main>
    </section>
  );
};
