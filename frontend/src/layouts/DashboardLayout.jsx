import { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";

// react icons
import { HiMiniHomeModern } from "react-icons/hi2";
import {
  FaClipboardList,
  FaUsers,
  FaCity,
  FaGlobe,
  FaCog,
  FaBars,
} from "react-icons/fa";
import {
  MdOutlineNotifications,
  MdOutlineKeyboardArrowRight,
  MdDashboard,
} from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";

// image
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [showLang, setShowLang] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItemsAdmin = [
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
    { name: "Bookings", to: "/dashboard/bookings", icon: <FaClipboardList /> },
    { name: "Settings", to: "/dashboard/settings", icon: <FaCog /> },
  ];
  const navItemsOwner = [
    {
      name: "Places",
      icon: <HiMiniHomeModern />,
      dropdown: [
        { name: "Add place", to: "/dashboard/places/add" },
        { name: "Places List", to: "/dashboard/places" },
      ],
    },
  ];
  const navItems = user?.role === "admin" ? navItemsAdmin : navItemsOwner;
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
                      `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors
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
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 bg-teal-700 text-white shadow-md">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={toggleSidebar}>
              <FaBars size={24} />
            </button>
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <h1 className="text-xl font-semibold hidden md:block">
              {currentTitle}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <MdOutlineNotifications
              size={24}
              className="cursor-pointer hover:text-green-500 transition"
            />
            <div className="relative">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-teal-600 transition"
              >
                <GrLanguage size={20} />
              </button>
              {showLang && (
                <ul className="absolute right-0 mt-2 w-20 bg-teal-800 text-white rounded shadow-lg">
                  <li className="px-4 py-2 hover:bg-teal-700 cursor-pointer">
                    EN
                  </li>
                  <li className="px-4 py-2 hover:bg-teal-700 cursor-pointer">
                    DE
                  </li>
                </ul>
              )}
            </div>
            <AiOutlineLogout
              size={24}
              className="cursor-pointer hover:text-red-500 transition"
              onClick={handleLogout}
            />
          </div>
        </header>

        {/* Page Title */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-emerald-400 py-4 px-6 font-semibold text-2xl text-white">
          {currentTitle}
        </div>

        {/* Page Content */}
        <main className="p-3 lg:px-6 lg:py-2 flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
