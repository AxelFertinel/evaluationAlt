import { Link, useLocation } from "react-router-dom";
import { Bell, Moon, Search, Settings, User, Zap, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b">
      <div className="flex items-center justify-between p-6 ">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 mr-6">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white mr-2">
            <Zap size={20} />
          </div>
          <span className="font-semibold text-xl tracking-tight">TechCorp</span>
          {/* Desktop Menu */}
          <div className="hidden lg:flex ml-2  gap-3">
            <Link
              to="/"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/tools"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/tools")
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Tools
            </Link>
            <Link
              to="/analytics"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/analytics")
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Analytics
            </Link>
            <Link
              to="/settings"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/settings")
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Settings
            </Link>
          </div>
        </div>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="border rounded-lg p-2 flex items-center">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              className="outline-none text-sm"
              placeholder="Search tools..."
            />
          </div>

          <Moon size={22} />

          <Bell size={22} />

          <Settings size={22} />

          <User size={22} />
        </div>

        {/* Burger Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="px-6 py-4 space-y-2">
            {/* Search Mobile */}
            <div className="border rounded-lg p-2 flex items-center mb-4">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                className="outline-none text-sm w-full"
                placeholder="Search tools..."
              />
            </div>

            {/* Navigation Links */}
            <Link
              to="/"
              onClick={closeMenu}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/") ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/tools"
              onClick={closeMenu}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/tools") ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              Tools
            </Link>
            <Link
              to="/analytics"
              onClick={closeMenu}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/analytics") ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              Analytics
            </Link>
            <Link
              to="/settings"
              onClick={closeMenu}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/settings") ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              Settings
            </Link>

            {/* Mobile Icons */}
            <div className="flex gap-4 pt-4 border-t mt-4">
              <Moon size={22} />

              <Bell size={22} />

              <Settings size={22} />

              <User size={22} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
