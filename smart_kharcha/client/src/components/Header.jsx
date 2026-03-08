import { useState, useContext } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Header = ({ openSidebar, setIsLoggedIn }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex items-center justify-between transition-colors duration-300">

      {/* Left Hamburger */}
      <button
        onClick={openSidebar}
        className="text-2xl hover:scale-110 transition-transform duration-200"
      >
        <FaBars />
      </button>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl hover:rotate-180 transition-transform duration-300"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* 👤 Profile */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-2xl hover:scale-110 transition-transform duration-200"
          >
            <FaUserCircle />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-200">

              <button
                onClick={() => {
                  navigate("/profile");
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Header;