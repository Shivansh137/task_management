import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/30 backdrop-blur-md shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaTasks className="text-indigo-600 text-2xl" />
          <span className="text-xl mx-2 text-gray-900">TaskManager</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link key={"tasks"} to={'/'} className="text-gray-700 hover:text-indigo-500 transition"> Tasks </Link>
          <Link key={"profile"} to={"/profile"} className="text-gray-700 hover:text-indigo-500 transition"> Profile </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-3 bg-white shadow-md">
          <Link key={"tasks"} to={'/'} className="text-gray-700 hover:text-indigo-500 transition"> Tasks </Link>
          <Link key={"profile"} to={"/profile"} className="text-gray-700 hover:text-indigo-500 transition"> Profile </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
