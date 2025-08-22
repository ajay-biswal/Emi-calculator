import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="flex bg-nav text-nav p-4 items-center justify-between shadow-2xs">
      <h1 className="font-medium head-text text-2xl">Loan Calculator</h1>
      <div className="flex gap-x-4 font-medium">
        <NavLink to="/">HOME</NavLink>
        <Link to="exchange-rates">EXCHANGE RATES (LIVE)</Link>
        <Link to="about">ABOUT</Link>
        <Link to="error">ERROR</Link>
        <div className="flex items-center">
          <label className="relative inline-block w-[40px] h-[20px] ml-[10px]">
            {/* hide the checkbox but keep it interactive */}
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              className="peer hidden"
            />
            {/* slider (track) */}
            <span className="absolute inset-0 bg-gray-700 rounded-full transition peer-checked:bg-blue-700"></span>
            {/* knob (circle) */}
            <span className="absolute left-[1px] bottom-0 w-[20px] h-[20px] bg-white rounded-full transition-transform peer-checked:translate-x-[20px]"></span>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
