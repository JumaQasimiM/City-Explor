import { FaBarsStaggered } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { FaRegUser, FaHeart } from "react-icons/fa";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  //   handle toggle to show navbar in mobile
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full">
      {/* desktop */}
      <div className="max-w-7xl mx-auto px-5 py-5 bg-amber-400 flex justify-between items-center gap-10 relative">
        {/* logo */}
        <h1 className="font-extrabold font-roboto">City Explor</h1>

        {/* desktop navbar */}
        <nav className="hidden md:flex">
          <ul className="flex justify-between items-center gap-10">
            <div className="relative group">
              <li className="cursor-pointer font-semibold ">Home</li>
              <span className="absolute w-0 left-1/2 -translate-x-1/2  -bottom-1   bg-green-500 h-[2px] group-hover:w-full transition-all duration-150"></span>
            </div>
            <div className="relative group">
              <li className="cursor-pointer font-semibold ">About</li>
              <span className="absolute w-0 left-1/2 -translate-x-1/2  -bottom-1   bg-green-500 h-[2px] group-hover:w-full transition-all duration-150"></span>
            </div>
            <div className="relative group">
              <li className="cursor-pointer font-semibold ">Contact</li>
              <span className="absolute w-0 left-1/2 -translate-x-1/2  -bottom-1   bg-green-500 h-[2px] group-hover:w-full transition-all duration-150"></span>
            </div>
          </ul>
        </nav>

        {/* icons */}
        <div className="flex justify-between items-center gap-5">
          <FaRegUser
            size={23}
            className="cursor-pointer hover:text-white/90 transition-all duration-75"
          />
          <FaHeart
            size={23}
            className="cursor-pointer hover:text-white/90 transition-all duration-75"
          />
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

      {/* mobile navbar with smooth slide */}
      <nav
        className={`absolute w-full text-center md:hidden bg-amber-400 border-t-2 border-t-white/60 overflow-hidden transition-all duration-750
          ${
            isOpen
              ? "max-h-96 opacity-100 pointer-events-auto"
              : "max-h-0 opacity-0 pointer-events-none"
          }
        `}
      >
        <ul className="flex flex-col gap-5 my-5">
          <li className="cursor-pointer font-semibold">Home</li>
          <li className="cursor-pointer font-semibold">About</li>
          <li className="cursor-pointer font-semibold">Contact</li>
        </ul>
      </nav>
    </header>
  );
};
