import api from "../api/api";
import useAuthStore from "../store/AuthStore";

const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);
    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            logout();
            window.location.href = "/login";
        }
    };
    return handleLogout;
};

export default useLogout;