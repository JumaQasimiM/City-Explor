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
import { MdDashboard } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";

// warning: not complete have to create authContext then
export const DashboardLayout = () => {
  // sidebar items
  const navItems = [
    { name: "Dashboard", to: "/dashboard", icon: <MdDashboard /> },
    { name: "Places", to: "/dashboard/places", icon: <HiMiniHomeModern /> },
    { name: "Bookings", to: "/dashboard/bookings", icon: <FaClipboardList /> },
    { name: "Users", to: "/dashboard/users", icon: <FaUsers /> },
    { name: "Cities", to: "/dashboard/cities", icon: <FaCity /> },
    { name: "Country", to: "/dashboard/country", icon: <FaGlobe /> },
    { name: "Settings", to: "/dashboard/settings", icon: <FaCog /> },
  ];

  return (
    <section className="min-h-screen flex flex-col dark:bg-slate-900 dark:text-white/80">
      {/* header */}
      <header className="flex justify-between items-center py-4 px-6 border-b border-white/10">
        <Link to="/dashboard">
          {" "}
          <h1 className="text-lg font-bold">Dashboard</h1>
        </Link>
        {/* icons */}
        {/* not complete */}
        <div className="flex gap-5 mx-6 text-lg">
          <FaUser size={23} />
          <AiOutlineLogout size={23} className="hidden" />
          <GrLanguage size={23} />
        </div>
      </header>

      {/* main Layout */}
      <div className="flex flex-1">
        {/* sidebar */}
        <aside className="w-[220px] bg-slate-800 min-h-full">
          <ul className="mt-10 space-y-2 px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard"} // only main dashboard uses "end"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                    isActive
                      ? "bg-green-500 text-white"
                      : "text-white/80 hover:bg-slate-700"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </ul>
        </aside>

        {/* main contexnt */}
        <main className="flex-1 p-6 bg-gray-100 dark:bg-slate-900">
          <Outlet />
        </main>
      </div>
    </section>
  );
};
