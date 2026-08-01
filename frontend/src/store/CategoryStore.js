import { create } from "zustand";

const useCategoryStore = create((set) => ({
  selectedCategory: "",

  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useCategoryStore;