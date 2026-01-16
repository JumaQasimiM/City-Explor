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
  // if role is exist and the exist role inlude the user role

  if (allowRole && !allowRole.includes(user.role)) {
    if (allowRole === "owner") {
      return <Navigate to="/dashboard/places" replace />;
    }
    return <Navigate to="/" replace />;
    // return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};
