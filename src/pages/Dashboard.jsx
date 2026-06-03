import { Link } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import AuthLayout from "../layouts/AuthLayout";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { LuCalendarDays } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import dayjs from "dayjs";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { MdOutlinePendingActions } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { SiVirustotal } from "react-icons/si";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const { tasks, getAllTasks, allTasks, truncateString, loading } = useTask();

  const { user, token } = useAuth();

  const total = allTasks?.length;
  const pending = allTasks.filter((task) => task?.status === "to-do").length;
  const working = allTasks.filter(
    (task) => task?.status === "in-progress",
  ).length;
  const completed = allTasks.filter((task) => task?.status === "done").length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  const deleteTask = async (taskId) => {
    try {
      if (!confirm("Are you sure")) return false;
      if (token && user?.role === "admin") {
        const response = await api.delete(`/admin/task/delete/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.data?.status === true) {
          await getAllTasks();
        } else {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <AuthLayout>
        <div className="relative px-3">
          <h1 className="text-xl text-gray-600 mt-2 mb-4 mx-6">Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
            <div className="bg-white shadow-md rounded-md p-5 flex items-center flex-col border border-gray-200 hover:scale-105 transition-all duration-300">
              <span className="flex gap-2 items-center bg-gray-100 text-gray-800 text-md px-4 py-1 rounded-full">
                <SiVirustotal /> Total
              </span>
              <span className="block py-4 text-2xl">{total}</span>
              <span className="block text-gray-600">Tasks</span>
            </div>

            <div className="bg-white shadow-md rounded-md p-5 flex items-center flex-col border border-gray-200 hover:scale-105 transition-all duration-300">
              <span className="flex gap-2 items-center bg-yellow-100 text-yellow-800 text-md px-4 py-1 rounded-full">
                <MdOutlinePendingActions /> To-Do
              </span>
              <span className="block py-4 text-2xl text-yellow-600">
                {pending}
              </span>
              <span className="block text-gray-600">Pending</span>
            </div>

            <div className="bg-white shadow-md rounded-md p-5 flex items-center flex-col border border-gray-200 hover:scale-105 transition-all duration-300">
              <span className="flex gap-2 items-center bg-blue-100 text-blue-800 text-md px-4 py-1 rounded-full">
                <GiProgression /> In-Progress
              </span>
              <span className="block py-4 text-2xl text-blue-600">
                {working}
              </span>
              <span className="block text-gray-600">Working</span>
            </div>

            <div className="bg-white shadow-md rounded-md p-5 flex items-center flex-col border border-gray-200 hover:scale-105 transition-all duration-300">
              <span className="flex gap-2 items-center bg-green-100 text-green-800 text-md px-4 py-1 rounded-full">
                <IoCheckmarkDoneCircle /> Done
              </span>
              <span className="block py-4 text-2xl text-green-600">
                {completed}
              </span>
              <span className="block text-gray-600">Complete</span>
            </div>
          </div>

          <div>
            <h1 className="text-xl text-gray-600 my-4 mx-6">Progress</h1>
            <div className="bg-white rounded-full shadow-md">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-md text-center text-white"
                style={{ width: `${percentage}%` }}>
                {Math.round(percentage)}%
              </div>
            </div>
            <span className="block text-gray-600 mt-4 text-center">
              {completed} of {total} completed Tasks
            </span>
          </div>

          <h1 className="text-xl text-gray-600 my-4 mx-6">Recent Tasks</h1>
          {loading ? (
            <span className="flex justify-center items-center h-[30vh]">
              <ClipLoader />
            </span>
          ) : tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-1 md:w-full">
              {tasks.slice(0, 3).map((task) => (
                <Link
                  to={`/task/details/${task?._id}`}
                  key={task?._id}
                  className="bg-white shadow-md rounded-md p-5 flex flex-col border border-gray-200 hover:scale-105 transition-all duration-300 mt-3 cursor-pointer">
                  <span className="flex items-center gap-3 mb-3">
                    <FaTasks className="text-gray-600 text-md" />
                    <span className="text-gray-600 text-md font-semibold">
                      {truncateString(task?.title, 35)}
                    </span>
                  </span>
                  <span className="flex justify-between">
                    <span
                      className={` ${task?.status === "to-do" ? "bg-yellow-100 text-yellow-900 rounded-full px-3 py-1" : task?.status === "in-progress" ? "bg-blue-100 text-blue-900 rounded-full px-3 py-1" : "bg-green-100 text-green-900 rounded-full px-3 py-1"}`}>
                      {task?.status === "to-do" ? (
                        <span className="flex gap-2 items-center">
                          <MdOutlinePendingActions /> to-do
                        </span>
                      ) : task?.status === "in-progress" ? (
                        <span className="flex gap-2 items-center">
                          <GiProgression /> in-progress
                        </span>
                      ) : (
                        <span className="flex gap-2 items-center">
                          <IoCheckmarkDoneCircle /> done
                        </span>
                      )}
                    </span>
                    <span
                      className={` ${task?.priority === "low" ? "bg-green-100 text-green-900 rounded-full px-3 py-1" : task?.priority === "medium" ? "bg-orange-100 text-orange-900 rounded-full px-3 py-1" : "bg-red-100 text-red-900 rounded-full px-3 py-1"}`}>
                      {task?.priority === "low" ? (
                        <span className="flex gap-2 items-center">
                          <FcLowPriority /> low
                        </span>
                      ) : task?.priority === "medium" ? (
                        <span className="flex gap-2 items-center">
                          <FcMediumPriority /> medium
                        </span>
                      ) : (
                        <span className="flex gap-2 items-center">
                          <FcHighPriority /> high
                        </span>
                      )}
                    </span>
                  </span>

                  <div className="w-full h-0.5 bg-gray-200 my-2"></div>

                  <span className="flex items-center gap-3 mb-2">
                    <FiUser className="text-gray-600 text-md" />
                    <span className="text-gray-600 text-md">
                      Created: {task?.createdBy?.name}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 mb-1">
                    <LuUsers className="text-gray-600 text-md" />
                    <span className="text-gray-600 text-md">
                      Assigned:{" "}
                      {task?.assignedTo ? task?.assignedTo?.name : "unassigned"}
                    </span>
                  </span>
                  <span className="flex justify-between gap-3 items-center">
                    <span className="flex text-gray-600 text-md items-center gap-3">
                      <LuCalendarDays className="text-gray-600 text-md" />
                      {dayjs(task?.dueDate).format("MM/D/YYYY") <
                        dayjs().format("MM/D/YYYY") &&
                      task?.status !== "done" ? (
                        <span className="border border-red-300 p-1 rounded-md">
                          OverDue: {dayjs(task?.dueDate).format("MM/D/YYYY")}
                        </span>
                      ) : (
                        <span>
                          Due: {dayjs(task?.dueDate).format("MM/D/YYYY")}
                        </span>
                      )}
                    </span>

                    <span className="flex gap-10">
                      <Link
                        to={`/edit-task/${task._id}`}
                        className="text-green-600 text-xl">
                        <CiEdit />
                      </Link>
                      <Link
                        onClick={() => deleteTask(task._id)}
                        className="text-red-600 text-xl">
                        <MdOutlineDeleteOutline />
                      </Link>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[30vh] text-lg">
              No recent tasks found
            </div>
          )}
        </div>
      </AuthLayout>
    </>
  );
};

export default Dashboard;
