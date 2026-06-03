import { FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTask } from "../context/TaskContext";

const DNavbar = () => {
  const { user, logout } = useAuth()
  const {toggle} = useTask()

  return (
    <>
      <div className="relative">
        <div>
          <Link to="/dashboard" className="font-semibold text-white fixed top-3 left-5 transition duration-300" onClick={toggle}>
            ClutchTask
          </Link>
        </div>

        <div className="flex flex-col fixed top-40 left-5 gap-3">
          <NavLink
          onClick={toggle}
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "bg-white flex items-center gap-2 px-2 py-1 rounded-md"
                : "text-white flex items-center gap-2"
            }>
            <MdDashboard /> Dashboard
          </NavLink>
          <NavLink
          onClick={toggle}
            to="/task-list"
            className={({ isActive }) =>
              isActive
                ? "bg-white flex items-center gap-2 px-2 py-1 rounded-md"
                : "text-white flex items-center gap-2"
            }>
            <FaTasks />
            Tasks
          </NavLink>
          <NavLink
          onClick={toggle}
            to="/create-task"
            className={({ isActive }) =>
              isActive
                ? "bg-white flex items-center gap-2 px-2 py-1 rounded-md"
                : "text-white flex items-center gap-2"
            }>
            <IoIosCreate /> Create
          </NavLink>
        </div>

        <div className="flex flex-col text-white fixed bottom-5 left-5 gap-2">
          <span className="text-white flex items-center gap-2">
            <FaRegUserCircle />
            {user?.name}
          </span>
          <button
            onClick={logout}
            className="text-white flex items-center gap-2 cursor-pointer">
            <LuLogOut /> Logout
          </button>
        </div>

      </div>
    </>
  );
};

export default DNavbar;
