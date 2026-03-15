import { NavLink } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import {
  FaHome,
  FaCalendarAlt,
  FaInfoCircle,
  FaQuestionCircle,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Smart Kharcha</h2>
          <FaTimes
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <nav className="flex flex-col p-4 space-y-3">

          <NavLink
            to="/dashboard"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/calendar"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <FaCalendarAlt />
            Expense Calendar
          </NavLink>

          <NavLink
            to="/scanner"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `p-3 rounded transition ${isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            <FaCamera className="inline mr-2" />
            Receipt Scanner
          </NavLink>

          <NavLink
            to="/how-to-use"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <FaQuestionCircle />
            How To Use
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <FaInfoCircle />
            About Us
          </NavLink>

        </nav>
      </div>
    </>
  );
};

export default Sidebar;