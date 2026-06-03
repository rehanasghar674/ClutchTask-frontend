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

const EditTask = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      assignedTo: "",
    },
  });

  const navigate = useNavigate();
  const { users, user, token } = useAuth();
  const { getAllTasks } = useTask();
  const { taskId } = useParams();
  const [loading, setLoading] = useState(false);

  const getTaskByAdmin = async () => {
    try {
      setLoading(true);
      if (token && user?.role === "admin") {
        const response = await api.get(`/admin/task/get/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.data?.status === true) {
          reset({
            title: response?.data?.task?.title,
            description: response?.data?.task?.description,
            status: response?.data?.task?.status,
            assignedTo:
              response?.data?.task?.assignedTo === null
                ? ""
                : response?.data?.task?.assignedTo?._id,
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getTaskByAdmin();
  }, [token, user, taskId]);

  if (loading) <ClipLoader />;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (token && user?.role === "admin") {
        const selectedDate = new Date(data.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (data.dueDate && selectedDate < today) {
          toast.error("due date can't be in the past");
          return;
        }
        const submitData = {
          ...data,
          assignedTo: data.assignedTo === "" ? null : data.assignedTo,
        };
        const response = await api.put(
          `/admin/task/update/${taskId}`,
          submitData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
          navigate("/dashboard");
          await getAllTasks();
        } else {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[110vh] bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white p-5 md:shadow-2xl shadow-lg rounded-md w-[90vw] md:w-[380px]">
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
                placeholder="Enter Task Title"
                id="title"
                className="mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1"
                {...register("title")}
              />
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="description" className="text-gray-800">
                Description
              </label>
              <textarea
                id="description"
                className="mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1"
                placeholder="Enter Task Description"
                {...register("description")}></textarea>
            </div>
            <div className="my-4">
              <label htmlFor="priority" className="text-gray-800">
                Priority
              </label>
              <select
                id="priority"
                {...register("priority")}
                className="w-full mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1">
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
            <div className="flex flex-col my-4">
              <label htmlFor="dueDate" className="text-gray-800">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                className="mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1"
                {...register("dueDate")}
              />
            </div>
            {user?.role === "admin" && token && (
              <div className="my-4">
                <label htmlFor="assignedTo" className="text-gray-800">
                  Assigned To
                </label>
                <select
                  id="assignedTo"
                  {...register("assignedTo")}
                  className="w-full mt-1 outline-0 bg-gray-100 rounded-md px-2 py-1">
                  <option value="">Unassigned</option>
                  {users?.length > 0 &&
                    users?.map((user) => (
                      <option key={user?._id} value={user?._id}>
                        {user?.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div className="mt-7 mb-3">
              <button className="bg-blue-600 text-white w-full rounded-md cursor-pointer py-1">
                {loading ? <ClipLoader size={19} /> : "edit task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditTask;
