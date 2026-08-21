import { create } from "zustand";

const useAuthStore = create((set) => ({
  role: null,
  isAuthenticated: false,
  isLoading: true,

  login: (role) => {
      set({
          role,
          isAuthenticated: true,
          isLoading: false,
      });
  },

  logout: () => {
      set({
          role: null,
          isAuthenticated: false,
          isLoading: false,
      });
  },

  setLoading: (isLoading) => {
      set({ isLoading });
  },
}));

export default useAuthStore;