import { create } from "zustand";

// This will be the new login and logout 
const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  role : localStorage.getItem("role") || null,

  login: (token, role) =>{
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    set({ token, role });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({ token: null, role: null });
  },
  isAuthenticated: () => !!localStorage.getItem("token"),
}));

export default useAuthStore;