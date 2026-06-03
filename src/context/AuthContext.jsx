import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { api } from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // navigation
  const navigate = useNavigate();

  // useState()
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // login
  const login = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/user/login", data);
      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        setUser(response?.data?.user);
        localStorage.setItem("token", response?.data?.token);
        setToken(response?.data?.token);
        navigate("/dashboard");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  // register
  const Register = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/user/register", data);
      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        navigate("/login", { replace: true });
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  // check authentication
  const checkAuth = async () => {
    try {
      setLoading(true);
      if (token) {
        const response = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        if (response.data.status === true) {
          setUser(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  // all users
  const getAllUsers = async () => {
    try {
      setLoading(true);
      if (token) {
        if (user?.role === "admin") {
          const response = await api.get("/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response?.data?.status === true) {
            setUsers(response?.data?.users || []);
            console.log(response);
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

  const logout = () => {
    (setToken(""), setUser(null), localStorage.removeItem("token"));
    navigate("/login");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ login, Register, user, token, users, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
