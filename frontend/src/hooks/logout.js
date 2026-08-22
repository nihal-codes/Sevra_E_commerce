import api from "../api/api";
import useAuthStore from "../store/AuthStore";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/errorMessage";

const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);
    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch (error) {
            toast.error(getErrorMessage(error, "Unable to sign out"));
        } finally {
            logout();
            window.location.href = "/login";
        }
    };
    return handleLogout;
};

export default useLogout;