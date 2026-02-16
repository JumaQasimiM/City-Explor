import { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";

// react icons
import { HiMiniHomeModern } from "react-icons/hi2";
import { FaUsers, FaCity, FaGlobe, FaCog, FaBars } from "react-icons/fa";
import {
  MdOutlineNotifications,
  MdOutlineKeyboardArrowRight,
  MdDashboard,
} from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";

// images
import logo from "../assets/logo.png";

import { useAuth } from "../context/AuthContext";

export const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [showLang, setShowLang] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const adminItems = [
    { name: "Dashboard", to: "/dashboard", icon: <MdDashboard /> },
    {
      name: "Places",
      icon: <HiMiniHomeModern />,
      dropdown: [
        { name: "Add place", to: "/dashboard/places/add" },
        { name: "Places List", to: "/dashboard/places" },
      ],
    },
    {
      name: "Users",
      icon: <FaUsers />,
      dropdown: [
        { name: "Add User", to: "/register" },
        { name: "User List", to: "/dashboard/users" },
      ],
    },
    { name: "Cities", icon: <FaCity />, to: "/dashboard/cities" },
    { name: "Countries", icon: <FaGlobe />, to: "/dashboard/countries" },
    { name: "Categories", icon: <FaGlobe />, to: "/dashboard/categories" },
    // { name: "Bookings", to: "", icon: <FaClipboardList /> },
  ];
  const commonItems = [
    {
      name: "Settings",
      to: "/dashboard/settings",
      icon: <FaCog />,
    },
  ];
  const ownerItems = [
    {
      name: "Places",
      icon: <HiMiniHomeModern />,
      dropdown: [
        { name: "Add place", to: "/dashboard/places/add" },
        { name: "Places List", to: "/dashboard/places" },
      ],
    },
  ];

  const navItems =
    user?.role === "admin"
      ? [...adminItems, ...commonItems]
      : [...ownerItems, ...commonItems];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleLanguage = () => setShowLang(!showLang);

  const currentTitle =
    navItems.find((item) => item.to === location.pathname)?.name ||
    navItems
      .flatMap((i) => i.dropdown || [])
      .find((sub) => sub.to === location.pathname)?.name ||
    "Dashboard";

  return (
    <div className="flex min-h-screen bg-gray-200 dark:bg-slate-900 dark:text-white/80">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-teal-900 text-gray-200 transform
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 shadow-lg flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-600">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 rounded-full border-2 border-cyan-600"
          />
          <div>
            <h2 className="text-lg font-semibold">{user.lastname}</h2>
            <div className="flex items-center gap-2 text-green-500">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm">online</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                {!item.dropdown && (
                  <NavLink
                    to={item.to}
                    end={item.to === "/dashboard"}
                    onClick={() => setShowSidebar(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded hover:bg-teal-700 transition-colors
                        ${
                          isActive
                            ? "bg-teal-700 font-semibold"
                            : "text-gray-200"
                        }`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                )}
                {item.dropdown && (
                  <>
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === index ? null : index)
                      }
                      className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-teal-700 transition-colors text-gray-200"
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
                      <ul className="ml-6 mt-1 space-y-1">
                        {item.dropdown.map((sub) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setShowSidebar(false)}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded hover:bg-teal-700 transition-colors
                                ${
                                  isActive
                                    ? "bg-teal-700 font-semibold"
                                    : "text-gray-200"
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
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-60 overflow-hidden bg-gray-200  dark:text-gray-200 dark:bg-gray-800">
        <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 shadow-lg">
          <div className="h-full max-w-full px-5 flex items-center justify-between text-white">
            {/* ================= LEFT ================= */}
            <div className="flex items-center gap-4 md:ml-57">
              {/* Mobile Sidebar Toggle */}
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded hover:bg-white/10 transition"
              >
                <FaBars size={22} />
              </button>

              {/* Logo */}
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="City Explor"
                  className="w-10 h-10 rounded bg-white/10 p-1"
                />
                <h1 className="hidden md:block text-lg font-semibold tracking-wide">
                  City Explor
                  <span className="block text-xs text-white/60">
                    Admin Dashboard
                  </span>
                </h1>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded hover:bg-white/10 transition">
                <MdOutlineNotifications size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Language */}
              <div className="relative">
                <button
                  onClick={toggleLanguage}
                  className="p-2 rounded hover:bg-white/10 transition"
                >
                  <GrLanguage size={18} />
                </button>

                {showLang && (
                  <ul className="absolute right-0 mt-2 w-24 bg-slate-800 border border-white/10 rounded-lg shadow-xl overflow-hidden">
                    <li className="px-4 py-2 hover:bg-teal-700 cursor-pointer text-sm">
                      EN
                    </li>
                    <li className="px-4 py-2 hover:bg-teal-700 cursor-pointer text-sm">
                      DE
                    </li>
                  </ul>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 rounded hover:bg-red-500/20 text-red-300 hover:text-red-400 transition"
              >
                <AiOutlineLogout size={22} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Title */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-emerald-400 py-4 px-6 font-semibold text-2xl text-white">
          {currentTitle === "Dashboard" ? (
            <span className="block text-xs text-white/60">Admin Dashboard</span>
          ) : (
            <span className="block text-xs text-white/60">{currentTitle}</span>
          )}
        </div>
        {/* Page Content */}
        <main className="p-3 lg:px-6 lg:py-2 flex-1 overflow-hidden">
          <Outlet />
        </main>
        {/* footer */}
        <footer className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            {/* Left */}
            <p className="opacity-80">
              © {new Date().getFullYear()} City Explor. All rights reserved.
            </p>

            {/* Center */}
            <p className="font-medium tracking-wide">Dashboard Panel</p>

            {/* Right */}
            <p className="opacity-80">
              Created by{" "}
              <span className="font-semibold">Mohammad Juma Qasimi</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
