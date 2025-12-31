// src/components/Header.jsx
import { FaBarsStaggered } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { FaRegUser, FaHeart } from "react-icons/fa";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navItem = ["Home", "About", "Contact"];
  return (
    <header className="w-full bg-gray-200 fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-5 flex justify-between items-center gap-10 relative">
        {/* Logo */}
        <h1 className="font-extrabold text-2xl md:text-3xl font-caveat text-green-400">
          City Explor
        </h1>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex">
          <ul className="flex justify-between items-center gap-10">
            {navItem.map((item) => (
              <div key={item} className="relative group">
                <li className="cursor-pointer font-semibold">{item}</li>
                <span className="absolute w-0 left-1/2 -translate-x-1/2 -bottom-1 bg-green-500 h-[2px] group-hover:w-full transition-all duration-300 ease-out"></span>
              </div>
            ))}
          </ul>
        </nav>

        {/* Icons and Mobile Toggle */}
        <div className="flex justify-between items-center gap-5">
          <FaRegUser
            size={23}
            className="cursor-pointer hover:text-green-700 transition-all duration-75"
          />
          <FaHeart
            size={23}
            className="cursor-pointer hover:text-green-700 transition-all duration-75"
          />

          {/* Mobile toggle */}
          <FaBarsStaggered
            size={23}
            className={`md:hidden ${
              isOpen
                ? "hidden transition duration-200"
                : "flex transition duration-200"
            }`}
            onClick={toggleNavbar}
          />
          <FiX
            size={23}
            className={`md:hidden ${
              isOpen
                ? "flex transition duration-200"
                : "hidden transition duration-200"
            }`}
            onClick={toggleNavbar}
          />
        </div>
      </div>

      {/* Mobile Navbar */}
      <nav
        className={`absolute w-full text-center md:hidden bg-gray-200 border-t-2 border-t-white/60 overflow-hidden transition-all duration-500 ${
          isOpen
            ? "max-h-96 opacity-100 pointer-events-auto shadow-lg"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-5 py-5">
          {navItem.map((item) => (
            <li
              key={item}
              className="cursor-pointer font-semibold hover:text-green-500 transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
