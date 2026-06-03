import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { api } from "../utils/api";
import { useTask } from "../context/TaskContext";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { ClipLoader } from "react-spinners";

const UserEditTask = () => {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { getTasksByUser } = useTask();
  const [task, setTask] = useState(null);
  const { taskId } = useParams();
  const [loading, setLoading] = useState(false);

  const isUserOwnTask = task?.createdBy?._id.toString() === user?._id.toString();
  const isAssignedTask = task?.assignedTo?._id.toString() === user?._id.toString();
  console.log(isUserOwnTask)
  console.log(isAssignedTask)

  const getTaskByNormalUser = async () => {
    try {
      setLoading(true)
      if (token) {
        const response = await api.get(`/user/task/get/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.data?.status === true) {
          setTask(response?.data?.task);
          console.log(response)
          reset({
            title: response?.data?.task?.title,
            description: response?.data?.task?.description,
            status: response?.data?.task?.status,
            dueDate: dayjs(response?.data?.task?.dueDate).format("YYYY-MM-DD"),
            priority: response?.data?.task?.priority,
          });
        } else {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getTaskByNormalUser();
  }, [token, taskId]);

  const onSubmit = async (data) => {
  // Prevent double submission
  if (loading) return;
  
  setLoading(true);
  
  try {
    // Check token
    if (!token) {
      toast.error("Please login again");
      navigate("/login");
      return;
    }

    // Due date validation (only for owners)
    if (isUserOwnTask && data.dueDate) {
      const selectedDate = new Date(data.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        toast.error("Due date can't be in the past");
        return;
      }
    }

    // Prepare data based on user type
    let newData = {};

    if (isUserOwnTask) {
      // Owner: Sab kuch bhejo
      newData = {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate,
        priority: data.priority,
      };
    } 
    else if (isAssignedTask) {
      // Assigned: Sirf status bhejo
      // Check if status is valid
      const isValidStatus = 
        (task?.status === "to-do" && data.status === "in-progress") ||
        (task?.status === "in-progress" && data.status === "done");
      
      if (!isValidStatus) {
        toast.error(`Cannot change from ${task?.status} to ${data.status}`);
        return;
      }
      
      newData = { status: data.status };
    }
    else {
      toast.error("You don't have permission to edit this task");
      return;
    }

    // Send request
    const response = await api.put(`/user/task/update/${taskId}`, newData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Handle response
    if (response?.data?.status === true) {
      toast.success(response?.data?.message || "Task updated successfully!");
      await getTasksByUser(); // Refresh task list
      navigate("/dashboard");
    } else {
      toast.error(response?.data?.message || "Update failed");
    }
    
  } catch (error) {
    console.error("Error:", error);
    toast.error(error?.response?.data?.message || error?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100 absolute inset-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white p-5 shadow-2xl rounded-md w-[90vw] md:w-[380px]">
            <div className="mb-6">
              <span className="flex gap-6 items-center font-semibold text-lg">
                <Link to="/task-list">
                  {" "}
                  <FaArrowLeft />{" "}
                </Link>
                <span className="font-semibold text-2xl">Edit Task</span>
              </span>
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="title" className="text-gray-800">
                Title
              </label>
              <input
                type="text"
                readOnly={!isUserOwnTask}
                placeholder="Enter Task Title"
                id="title"
                className={`mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1 ${!isUserOwnTask && "text-gray-500"}`}
                {...register("title")}
              />
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="description" className="text-gray-800">
                Description
              </label>
              <textarea
                id="description"
                className={`mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1 ${!isUserOwnTask && "text-gray-500"}`}
                placeholder="Enter Task Description"
                readOnly={!isUserOwnTask}
                {...register("description")}></textarea>
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="dueDate" className="text-gray-800">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                readOnly={!isUserOwnTask}
                className={`mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1 ${!isUserOwnTask && "text-gray-600"}`}
                {...register("dueDate")}
              />
            </div>
            <div className="my-4">
              <label htmlFor="priority" className="text-gray-800">
                Priority
              </label>
              <select
                id="priority"
                {...register("priority")}
                disabled={!isUserOwnTask}
                className={`w-full mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1 ${!isUserOwnTask && "text-gray-600"}`}>
                <option value="low">Low (default)</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="my-4">
              <label htmlFor="status" className="text-gray-800">
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                className="w-full mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1">
                <option value="to-do">Pending (default)</option>
                <option value="in-progress">Working</option>
                <option value="done">Complete</option>
              </select>
            </div>
            <div className="mt-7 mb-3">
              <button className="bg-blue-600 text-white w-full rounded-md cursor-pointer py-1">
                {loading ? <ClipLoader size={19} /> : 'edit task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserEditTask;
