import { useState, useContext, useRef, useEffect } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ openSidebar, setIsLoggedIn }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [currentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  });

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate("/");
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-40 bg-white/70 dark:bg-brand-dark/70 backdrop-blur-md border-b border-gray-200 dark:border-white/10 px-6 py-4 flex items-center justify-between transition-colors duration-300">

      {/* Left Hamburger */}
      <button
        onClick={openSidebar}
        className="text-2xl text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-secondary hover:scale-110 transition-all duration-200"
      >
        <FaBars />
      </button>

      {/* Center Title */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-xl md:text-2xl font-display font-bold bg-gradient-to-r from-brand-primary to-purple-500 bg-clip-text text-transparent">
          Smart Kharcha
        </h1>
      </div>

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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex flex-col items-center justify-center text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-secondary hover:scale-105 transition-all duration-200"
          >
            <FaUserCircle className="text-2xl" />
            <span className="text-xs font-semibold mt-1">{currentUser?.username || "Profile"}</span>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-3 w-44 bg-white dark:bg-brand-dark shadow-xl rounded-xl overflow-hidden border border-gray-100 dark:border-white/10"
              >
                <button
                  onClick={() => {
                    navigate("/profile");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-5 py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-200"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-5 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-200"
                >
                  Logout
                </button>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Header;