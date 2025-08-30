import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Menu, X } from "lucide-react"; // icons

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-nav text-nav shadow-md">
      <div className="flex items-center justify-between p-4">
        {/* Brand */}
        <h1 className="font-medium head-text text-2xl">Loan Calculator</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-x-6 font-medium items-center">
          <NavLink to="/">HOME</NavLink>
          <Link to="exchange-rates">EXCHANGE RATES (LIVE)</Link>
          <Link to="about">ABOUT</Link>
          <Link to="error">ERROR</Link>

          {/* Theme toggle */}
          <label className="relative inline-block w-[40px] h-[20px] ml-[10px]">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              className="peer hidden"
            />
            <span className="absolute inset-0 bg-gray-700 rounded-full transition peer-checked:bg-blue-700"></span>
            <span className="absolute left-[1px] bottom-0 w-[20px] h-[20px] bg-white rounded-full transition-transform peer-checked:translate-x-[20px]"></span>
          </label>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="flex flex-col md:hidden bg-nav text-nav px-4 pb-4 gap-3 font-medium">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            HOME
          </NavLink>
          <Link to="exchange-rates" onClick={() => setIsOpen(false)}>
            EXCHANGE RATES (LIVE)
          </Link>
          <Link to="about" onClick={() => setIsOpen(false)}>
            ABOUT
          </Link>
          <Link to="error" onClick={() => setIsOpen(false)}>
            ERROR
          </Link>

          {/* Theme toggle for mobile */}
          <label className="relative inline-block w-[40px] h-[20px] mt-2">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              className="peer hidden"
            />
            <span className="absolute inset-0 bg-gray-700 rounded-full transition peer-checked:bg-blue-700"></span>
            <span className="absolute left-[1px] bottom-0 w-[20px] h-[20px] bg-white rounded-full transition-transform peer-checked:translate-x-[20px]"></span>
          </label>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
