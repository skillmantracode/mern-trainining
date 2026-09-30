import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoadingDashboard } from "../components/common/LoadingDashboard";

export const ProtectedRoutes = () => {
  const { isLoggedin, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingDashboard/>
  }

  if (!isLoggedin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};
