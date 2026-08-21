import { Navigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const ProtectedRoute = ({ children, allowedRoles }) => {

    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );

    const isLoading = useAuthStore(
        (state) => state.isLoading
    );

    const role = useAuthStore(
        (state) => state.role
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;