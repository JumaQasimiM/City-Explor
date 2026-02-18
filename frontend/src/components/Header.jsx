import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBarsStaggered, FaMoon, FaHeart, FaRegUser } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Places", url: "/places" },
    { id: 3, name: "Blog", url: "/blogs" },
    { id: 4, name: "About", url: "/about" },
    { id: 5, name: "Contact", url: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold font-caveat text-emerald-500"
        >
          City Explor
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.id} className="relative group">
                <Link
                  to={item.url}
                  className="font-medium text-gray-800 dark:text-white/80 hover:text-emerald-500 transition"
                >
                  {item.name}
                </Link>
                <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-emerald-500 group-hover:w-full -translate-x-1/2 transition-all duration-300" />
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <Link to="/login">
            <FaRegUser className="icon" size={20} />
          </Link>

          <FaHeart size={20} className="icon" />

          {/* Theme Toggle */}
          {theme === "light" ? (
            <FaMoon size={20} className="icon" onClick={toggleTheme} />
          ) : (
            <MdOutlineWbSunny
              size={20}
              className="icon"
              onClick={toggleTheme}
            />
          )}

          {/* Mobile Toggle */}
          {!isOpen ? (
            <FaBarsStaggered
              size={20}
              className="icon md:hidden"
              onClick={() => setIsOpen(true)}
            />
          ) : (
            <FiX
              size={20}
              className="icon md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white dark:bg-slate-900 dark:text-white`}
      >
        <ul className="flex flex-col items-center gap-6 py-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.url}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-emerald-500 transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
