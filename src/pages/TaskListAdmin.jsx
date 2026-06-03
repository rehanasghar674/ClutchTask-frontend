import { Link } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import AuthLayout from "../layouts/AuthLayout";
import { CiEdit } from "react-icons/ci";
import {
  MdOutlineDeleteOutline,
  MdOutlinePendingActions,
} from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { LuUsers } from "react-icons/lu";
import { GiProgression } from "react-icons/gi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import dayjs from "dayjs";
import { FiUser } from "react-icons/fi";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { ClipLoader } from "react-spinners";

const TaskListAdmin = () => {
  const {
    form,
    tasks,
    getAllTasks,
    totalPages,
    setPage,
    page,
    truncateString,
    loading,
    resetFilters
  } = useTask();

  const { register, handleSubmit } = form;
  const { user, token } = useAuth();

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <AuthLayout>
        <div className="px-3">
          <div className="bg-white shadow-md rounded-md w-full md:py-0 px-5 md:px-4 lg:px-3 py-1 mt-5 md:my-4 sticky top-0 left-0 z-50">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between flex-col md:flex-row md:items-center py-3 md:py-0 lg:px-3 2xl:gap-5">
                <div>
                  <input
                    type="search"
                    className="w-full md:w-[330px] xl:w-[340px] outline-0 rounded-md px-2 py-1 bg-gray-100"
                    placeholder="search here"
                    {...register("search")}
                  />
                </div>

                <div className="flex gap-3 justify-center flex-col md:flex-row mt-5 md:mb-5">
                  <div>
                    <select
                      {...register("status")}
                      className={`w-full md:w-[110px] p-1 outline-0 bg-gray-100 rounded-md px-2 py-3}`}>
                      <option value="">All</option>
                      <option value="to-do">Pending</option>
                      <option value="in-progress">Working</option>
                      <option value="done">Completed</option>
                    </select>
                  </div>

                  <div>
                    <select
                      {...register("sortBy")}
                      className={`w-full md:w-[110px] p-1 outline-0 bg-gray-100 rounded-md px-2 py-2}`}>
                      <option value="">sort by</option>
                      <option value="createdAt">created At</option>
                    </select>
                  </div>

                  <div>
                    <select
                      {...register("sortOrder")}
                      className={`w-full md:w-[110px] p-1 outline-0 bg-gray-100 rounded-md px-2 py-2}`}>
                      <option value="desc">Desc</option>
                      <option value="asc">Asc</option>
                    </select>
                  </div>

                  <button
                    className={`w-full outline-0 bg-gray-100 rounded-md px-3 py-1 md:py-0 cursor-pointer`}
                    onClick={() => resetFilters()}>
                    Reset Filters
                  </button>
                </div>
              </div>
            </form>
          </div>

          {loading ? (
            <span className="flex justify-center items-center h-[65vh]">
              <ClipLoader />
            </span>
          ) : tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-1 md:w-full">
              {tasks.map((task) => (
                <Link
                  to={`/task/details/${task?._id}`}
                  key={task._id}
                  className="bg-white shadow-md rounded-md p-5 flex flex-col border border-gray-200 hover:scale-105 transition-all duration-300 mt-3">
                  <span className="flex items-center gap-3 mb-3">
                    <FaTasks className="text-gray-600 text-md" />
                    <span className="text-gray-600 text-md font-semibold">
                      {truncateString(task?.title, 20)}
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
            <div className="flex justify-center items-center h-[65vh] text-lg">
              No task found
            </div>
          )}

          {tasks.length > 0 && (
            <div className="flex justify-center mt-8 mb-6">
              {totalPages > 0 && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPage((prev) => prev - 1)}
                    className={`bg-white text-gray-600 cursor-pointer rounded-md px-2 py-1`}
                    disabled={page === 1}>
                    Prev
                  </button>
                  <span>
                    {page} of {totalPages} pages
                  </span>
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className={`bg-white text-gray-600 cursor-pointer rounded-md px-2 py-1`}
                    disabled={page === totalPages}>
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </AuthLayout>
    </>
  );
};

export default TaskListAdmin;
