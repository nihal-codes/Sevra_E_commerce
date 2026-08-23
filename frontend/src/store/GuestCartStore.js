import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGuestCartStore = create(
  persist(
    (set, get) => ({
      items: [], // { productId, quantity }
      addItem: (productId, quantity = 1) => {
        const existing = get().items.find(i => i.productId === productId);
        if (existing) {
          set({ items: get().items.map(i =>
            i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
          )});
        } else {
          set({ items: [...get().items, { productId, quantity }] });
        }
      },
      removeItem: (productId) => set({ items: get().items.filter(i => i.productId !== productId) }),
      clear: () => set({ items: [] }),
    }),
    { name: "guest-cart" } // localStorage key
  )
);

export default useGuestCartStore;
