import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";


  function ProtectedRoute() {
    const { user, isAuthLoading } = useAuthContext();

    if (isAuthLoading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
  }

export default ProtectedRoute;