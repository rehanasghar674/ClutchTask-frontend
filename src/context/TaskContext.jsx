import { useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { api } from "../utils/api";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { useForm } from "react-hook-form";

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    console.log("useAuth must be used within AuthProvider");
  }
  return context;
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debouncedHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(debouncedHandler);
    };
  }, [value, delay]);
  return debouncedValue;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const { user, token } = useAuth();
  const [allTasks, setAllTasks] = useState([]);
  const [userAllTasks, setUserAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const filtersChange = useRef(false)

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const form = useForm({
    defaultValues: {
      search: "",
      status: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    },
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { watch, reset } = form;
  const search = watch("search");
  const status = watch("status");
  const sortBy = watch("sortBy");
  const sortOrder = watch("sortOrder");

  const debouncedSearch = useDebounce(search, 500);

  const getAllTasks = async () => {
    try {
      setLoading(true);
      if (token) {
        if (user?.role === "admin") {
          const params = new URLSearchParams({
            search: debouncedSearch || "",
            status: status || "",
            sortBy: sortBy || "createdAt",
            sortOrder: sortOrder || "desc",
            page: page,
            limit: 6,
          });
          const response = await api.get(`/admin/tasks?${params}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response?.data?.status === true) {
            setTasks(response?.data?.tasks);
            setTotalPages(response.data.totalPages);
            setAllTasks(response.data.allTasks);
          } else {
            toast.error(response?.data?.message);
          }
        }
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const getTasksByUser = async () => {
    try {
      setLoading(true);
      if (token) {
        if (user?.role === "user") {
          const params = new URLSearchParams({
            search: debouncedSearch || "",
            status: status || "",
            sortBy: sortBy || "createdAt",
            sortOrder: sortOrder || "desc",
            page: page,
            limit: 6,
          });
          const response = await api.get(`/user/tasks/get?${params}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response?.data?.status === true) {
            setUserTasks(response?.data?.tasks);
            setUserAllTasks(response?.data?.userAllTasks);
          } else {
            toast.error(response?.data?.message);
          }
        }
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    (reset(), setPage(1));
  };

  const truncateString = (str, limit = 50) => {
    if (!str) return "";
    if (str.length <= limit) return str;
    return str.substring(str, limit) + "...";
  };

  useEffect(() => {
    if (token && user?.role === "admin") {
      getAllTasks();
    } else if (token && user?.role === "user") {
      getTasksByUser();
    }
  }, [token, user?.role, debouncedSearch, status, sortBy, sortOrder, page]);

  useEffect(() => {
    if (filtersChange.current) {
      setPage(1)
    }
    filtersChange.current = true
  }, [debouncedSearch, status, sortBy, sortOrder]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getAllTasks,
        getTasksByUser,
        userTasks,
        form,
        setPage,
        page,
        totalPages,
        resetFilters,
        allTasks,
        userAllTasks,
        toggle,
        isOpen,
        truncateString,
        loading,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
