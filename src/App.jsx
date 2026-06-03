import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import UserDashboard from "./pages/UserDashboard";
import UserEditTask from "./pages/UserEditTask";
import TaskListAdmin from "./pages/TaskListAdmin";
import TaskListUser from "./pages/TaskListUser";
import TaskDetails from "./pages/TaskDetails";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const { user, token } = useAuth();
  const ProtectedRoutes = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  const PublicRoutes = ({ children }) => {
    return token ? <Navigate to="/dashboard" /> : children;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/create-task"
        element={
          <ProtectedRoutes>
            <CreateTask />
          </ProtectedRoutes>
        }
      />
      <Route path="/edit-task/:taskId" element={
          <ProtectedRoutes>
            {user?.role === 'admin' && <EditTask />}
          </ProtectedRoutes>
        } />
      <Route path="/user-edit-task/:taskId" element={
          <ProtectedRoutes>
            {user?.role === 'user' && <UserEditTask />}
          </ProtectedRoutes>
        } />
      <Route path="/task/details/:taskId" element={
          <ProtectedRoutes>
            <TaskDetails />
          </ProtectedRoutes>
        } />
      <Route
        path="/task-list"
        element={
          <ProtectedRoutes>
            {user?.role === "admin" ? <TaskListAdmin /> : <TaskListUser />}
          </ProtectedRoutes>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            {user?.role === "admin" ? <Dashboard /> : <UserDashboard />}
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
