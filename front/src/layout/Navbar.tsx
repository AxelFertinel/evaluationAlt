import { Link, useLocation } from "react-router-dom";
import { Bell, Moon, Search, Settings, UserRoundPen, Zap } from "lucide-react";
const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6 border-b-1">
      <div className="flex items-center flex-shrink-0  mr-6">
        <Zap />
        <span className="font-semibold text-xl tracking-tight">TechCorp</span>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm mt-1 lg:flex-grow flex gap-3 ">
          <Link
            to="/"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/")
                ? "bg-secondary hover:text-gray-600"
                : "hover:text-gray-600 hover:bg-secondary"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/tools"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/tools")
                ? "bg-secondary hover:text-gray-600"
                : "hover:text-gray-600 hover:bg-secondary"
            }`}
          >
            Tools
          </Link>
          <Link
            to="/analytics"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/analytics")
                ? "bg-secondary hover:text-gray-600"
                : "hover:text-gray-600 hover:bg-secondary"
            }`}
          >
            Analytics
          </Link>
          <Link
            to="/settings"
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/settings")
                ? "bg-secondary hover:text-gray-600"
                : "hover:text-gray-600 hover:bg-secondary"
            }`}
          >
            Settings
          </Link>
        </div>
        <div className="flex mt-1 gap-4">
          <div className="border rounded-lg p-1 flex">
            <div className="inline-flex items-center justify-center">
              <Search size={18} color="gray" />
            </div>
            <input className="" placeholder="Search tools..." />
          </div>
          <Moon size={25} />
          <Bell size={25} />
          <Settings size={25} />
          <UserRoundPen size={25} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
