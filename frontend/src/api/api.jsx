import axios from "axios";
import useAuthStore from "../store/AuthStore";

let refreshRequest;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
                refreshRequest ??= api.post("/refresh").finally(() => {
                    refreshRequest = undefined;
                });
                await refreshRequest;
                return api(originalRequest);
            } catch (refreshError) {
                useAuthStore.getState().logout();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;