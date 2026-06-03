import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiAlarmOn, CiEdit } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { LuCalendarDays, LuUsers } from "react-icons/lu";
import dayjs from "dayjs";
import { TbFileDescription } from "react-icons/tb";
import { useTask } from "../context/TaskContext";
import { PriorityBadge, StatusBadge } from "../TaskActivities/Badges";
import {
  OlderActivities,
  TodayActivities,
  YesterdayActivities,
} from "../TaskActivities/Activities";
import { ClipLoader } from "react-spinners";

const TaskDetails = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { token, user } = useAuth();
  const [task, setTask] = useState(null);
  const [activities, setActivities] = useState([]);
  const { getAllTasks, getTasksByUser } = useTask();
  const [loading, setLoading] = useState(false);

  const getTask = async () => {
    try {
      setLoading(true);
      let response;
      if (token && user?.role === "admin") {
        response = await api.get(`/admin/task/get/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (token && user?.role === "user") {
        response = await api.get(`/user/task/get/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response?.data?.status === true) {
        if (user?.role === "admin") {
          setTask(response?.data?.task);
          setActivities(response?.data?.taskActivities);
        } else if (user?.role === "user") {
          setTask(response?.data?.task);
          setActivities(response?.data?.taskActivities);
        }
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTask();
  }, [token, user?.role, taskId]);

  if (loading) <ClipLoader />;

  const isToday = dayjs().startOf("day").format("YYYY-MM-DD");
  const isYesterday = dayjs()
    .startOf("day")
    .subtract(1, "day")
    .format("YYYY-MM-DD");

  console.log(isToday, isYesterday);

  const getGroupedActivities = (activities) => {
    const groups = {
      today: [],
      yesterday: [],
      older: [],
    };

    activities.forEach((activity) => {
      const activityDate = dayjs(activity.createdAt)
        .startOf("day")
        .format("YYYY-MM-DD");
      if (activityDate === isToday) {
        groups.today.push(activity);
      } else if (activityDate === isYesterday) {
        groups.yesterday.push(activity);
      } else {
        groups.older.push(activity);
      }
    });

    return groups;
  };

  const groupedActivities = getGroupedActivities(activities);

  const daysLeft = dayjs(task?.dueDate)
    .startOf("day")
    .diff(dayjs().startOf("day"), "day");

  const deleteTask = async () => {
    try {
      let response;
      if (!confirm("Are you sure")) return;
      if (token && user?.role === "admin") {
        response = await api.delete(`/admin/task/delete/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (token && user?.role === "user") {
        response = await api.delete(`/user/task/delete/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        if (user?.role === "admin") {
          await getAllTasks();
          navigate("/dashboard");
        } else if (user?.role === "user") {
          await getTasksByUser();
          navigate("/dashboard");
        }
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="container mx-auto p-2 bg-gray-50 h-full">
        <div className="flex flex-row justify-between md:items-center bg-white shadow-sm px-4 py-3 rounded-md sticky top-0 left-0 z-50">
          <Link to="/task-list" className="text-blue-500 underline">
            Back to list
          </Link>
          <div>Task Details</div>
        </div>
        <div className="flex flex-col md:flex-row my-5">
          <div className="w-full md:w-[50%] px-5">
            <div className="flex gap-2 items-center font-semibold text-lg text-gray-600">
              <FaTasks />
              <span>Title:</span>
              {task?.title}
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex gap-10 flex-row my-5">
                <StatusBadge status={task?.status} />
                <PriorityBadge priority={task?.priority} />
              </div>
              <div className="flex gap-8 md:mr-10">
                <Link
                  to={
                    user?.role === "admin"
                      ? `/edit-task/${taskId}`
                      : `/user-edit-task/${taskId}`
                  }
                  className="text-green-500 text-xl cursor-pointer">
                  <CiEdit />
                </Link>
                {user?.role === "user" && task?.createdBy?._id === user?._id ? (
                  <Link
                    onClick={deleteTask}
                    className="text-red-600 mb-2 text-xl">
                    <MdOutlineDeleteOutline />
                  </Link>
                ) : (
                  user?.role === "admin" && (
                    <Link
                      onClick={deleteTask}
                      className="text-red-600 mb-2 text-xl">
                      <MdOutlineDeleteOutline />
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mt-2 mb-4">
              <div className="flex items-center gap-2">
                <FiUser className="text-gray-600 text-md" />
                <span className="text-gray-600 text-md">
                  Created: {task?.createdBy?.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LuUsers className="text-gray-600 text-md" />
                <span className="text-gray-600 text-md">
                  Assigned:{" "}
                  {task?.assignedTo ? task?.assignedTo?.name : "unassigned"}
                </span>
              </div>

              <div className="flex text-gray-600 text-md items-center gap-2">
                <LuCalendarDays className="text-gray-600 text-md" />
                {dayjs(task?.dueDate).format("MM/D/YYYY") <
                  dayjs().format("MM/D/YYYY") && task?.status !== "done" ? (
                  <span className="border border-red-300 p-1 rounded-md">
                    OverDue: {dayjs(task?.dueDate).format("MM/D/YYYY")}
                  </span>
                ) : (
                  <span>
                    Due: {dayjs(task?.dueDate).format("MM/D/YYYY")}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-3">
              {(dayjs(task?.dueDate).isAfter(dayjs(), "day") &&
                daysLeft === 1 && (
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-600 text-md">
                      <CiAlarmOn />
                    </span>
                    <span className="text-orange-600 text-md font-semibold">
                      Reminder: {daysLeft} day left for deadline
                    </span>
                  </div>
                )) ||
                (dayjs(task?.dueDate).isAfter(dayjs(), "day") &&
                  daysLeft === 2 && (
                    <div className="flex gap-2 items-center">
                      <span className="text-gray-600 text-md">
                        <CiAlarmOn />
                      </span>
                      <span className="text-orange-600 text-md font-semibold">
                        Reminder: {daysLeft} days left for deadline
                      </span>
                    </div>
                  ))}
            </div>
            <div>
              <div className="flex gap-2 items-center text-gray-600">
                <TbFileDescription /> Description:
              </div>
              <div className="bg-white border border-gray-100 p-4 rounded-lg my-2 leading-10 overflow-y-auto h-[44vh]">
                {task?.description}
              </div>
            </div>
          </div>
          <div className="flex-1 px-3 overflow-y-auto h-[80vh]">
            <h1 className="font-semibold mb-4">Activity</h1>
            <div>
              {groupedActivities.today.length > 0 ? (
                <div className="mb-6">
                  <span className="flex gap-2 items-center">
                    <span className="text-blue-500 underline font-semibold">
                      Today
                    </span>{" "}
                    ({groupedActivities.today.length})
                  </span>
                  {groupedActivities.today.map((activity) => (
                    <div>
                      <TodayActivities
                        type={activity.type}
                        message={activity.message}
                        oldValue={activity.oldValue}
                        newValue={activity.newValue}
                        createdAt={activity.createdAt}
                        userName={activity?.userId?.name}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>No Activities Today yet</div>
              )}
            </div>

            <div className="my-4">
              {groupedActivities.yesterday.length > 0 ? (
                <div className="mb-6">
                  <span className="flex gap-2 items-center">
                    <span className="text-blue-500 underline font-semibold">
                      Yesterday
                    </span>{" "}
                    ({groupedActivities.yesterday.length})
                  </span>
                  {groupedActivities.yesterday.map((activity) => (
                    <div>
                      <YesterdayActivities
                        type={activity.type}
                        message={activity.message}
                        oldValue={activity.oldValue}
                        newValue={activity.newValue}
                        createdAt={activity.createdAt}
                        userName={activity?.userId?.name}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>No Yesterday Activities yet</div>
              )}
            </div>

            <div>
              {groupedActivities.older.length > 0 ? (
                <>
                  <span className="flex gap-2 items-center">
                    <span className="text-blue-500 underline font-semibold">
                      Older
                    </span>{" "}
                    ({groupedActivities.older.length})
                  </span>
                  {groupedActivities.older.map((activity) => (
                    <div>
                      <OlderActivities
                        type={activity.type}
                        message={activity.message}
                        oldValue={activity.oldValue}
                        newValue={activity.newValue}
                        createdAt={activity.createdAt}
                        userName={activity?.userId?.name}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div>No Older Activities yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
