import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBarsStaggered, FaMoon, FaHeart, FaRegUser } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// logo
import logo from "../assets/logo.png";
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Places", url: "/places" },
    { id: 3, name: "Blog", url: "/blogs" },
    { id: 4, name: "About", url: "/about" },
    { id: 5, name: "Contact", url: "/contact" },
  ];

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const locaiton = useLocation();
  const currentPath = locaiton.pathname;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 text-xl transition-all duration-300 bg-slate-200 dark:bg-slate-700 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="">
            <img
              src={logo}
              alt="City Explor"
              title="Go to Home"
              className="h-20 w-40"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <li key={item.id} className="relative group">
                    <Link
                      to={item.url}
                      className={`font-medium transition 
                        
                        ${
                          isActive
                            ? "text-emerald-500"
                            : " dark:text-white/80 hover:text-emerald-500"
                        }`}
                    >
                      {item.name}
                    </Link>

                    <span
                      className={`absolute left-1/2 -bottom-1 h-[2px] bg-emerald-500 transition-all duration-300 -translate-x-1/2 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link to="/login">
              <FaRegUser
                className="cursor-pointer dark:text-gray-300"
                size={25}
              />
            </Link>

            {/* <FaHeart size={20} className="cursor-pointer" /> */}

            {/* Theme */}
            {theme === "light" ? (
              <FaMoon
                size={25}
                className="cursor-pointer dark:text-gray-300"
                onClick={toggleTheme}
              />
            ) : (
              <MdOutlineWbSunny
                size={25}
                className="cursor-pointer dark:text-gray-300"
                onClick={toggleTheme}
              />
            )}

            {/* Mobile Toggle */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <FiX size={22} />
              ) : (
                <FaBarsStaggered
                  className="cursor-pointer dark:text-gray-300"
                  size={22}
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-[65%] sm:w-[60%] h-full bg-gray-200 dark:bg-slate-900 z-50 shadow-lg"
            >
              <div className="flex flex-col items-center justify-center h-full gap-8">
                <img
                  src={logo}
                  alt="City Explor"
                  title="Go to Home"
                  className="h-30 w-50"
                />
                {navItems.map((item) => {
                  const isActive = location.pathname === item.url;

                  return (
                    <Link
                      key={item.id}
                      to={item.url}
                      onClick={() => setIsOpen(false)}
                      className={`text-md font-medium ${
                        isActive
                          ? "text-emerald-500"
                          : "text-gray-700 dark:text-white hover:text-emerald-500"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
