import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import projectImage from '../assets/gear.svg'

const Navbar = () => {

  const { user, token, logout } = useAuth();

  return (
    <>
      <nav className="bg-white shadow-sm px-4 py-3 rounded-md sticky top-0 left-0 z-50">
        <div className="flex justify-between">
          {/* Web Name */}
          <div className="flex gap-1 items-center">
            <img src={projectImage} width={20} alt="" />
            <span className="text-gray-600 font-semibold">ClutchTask</span>
          </div>
          
          {/* login button */}
          <div>
            {user && token ? (
              <div className="flex gap-5">
                <Link
                  to="/dashboard"
                  className="bg-blue-600 text-white px-4 py-1 cursor-pointer rounded-md">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-blue-600 text-white px-4 py-1 cursor-pointer rounded-md">
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-md">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
