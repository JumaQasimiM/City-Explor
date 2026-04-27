import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoutes = ({ allowRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ همیشه array check
  if (allowRole && !allowRole.includes(user?.user?.role)) {
    // redirect based on role
    if (user?.user?.role === "business") {
      return <Navigate to="/dashboard/places" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
