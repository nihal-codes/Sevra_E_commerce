import axios from "axios";
import useAuthStore from "../store/AuthStore";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            originalRequest &&
            originalRequest.url !== "/refresh" &&
            originalRequest.url !== "/login" &&
            originalRequest.url !== "/logout" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                await api.post("/refresh");
                return api(originalRequest);
            } catch (refreshError) {
                if (originalRequest.url === "/me") {
                    return Promise.reject(refreshError);
                }
                useAuthStore.getState().logout();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;