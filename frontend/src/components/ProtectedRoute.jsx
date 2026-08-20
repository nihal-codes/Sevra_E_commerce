import { Navigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const ProtectedRoute = ({children, allowedRoles}) => {
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(role)){
    return <Navigate to="/" replace />
  }
  return children;
}

export default ProtectedRoute;