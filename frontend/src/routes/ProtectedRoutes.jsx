import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoutes = () => {
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

  return <Outlet />;

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (!allowRoles && allowRoles.includes(user.role)) {
  //   // go to admin but just can see the relatet page like, add place and see his places and setting to change his profile
  //   // return <Navigate to="/unauthorized" replace />;
  //   return <Navigate to="/home" replace />;
  // }

  // return <Outlet />;
};
