import { Link, useLocation } from "react-router-dom";
import { Zap } from "lucide-react";
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
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded  hover:text-black hover:border-black">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow flex gap-3 ">
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
        <div>
          <p>Profil</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
