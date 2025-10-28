import { create } from "zustand";

const CART_KEY = "cart_count";

interface CartState {
  count: number;
  addItem: () => void;
  resetCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  count: (() => {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? Number(saved) : 0;
  })(),

  addItem: () =>
    set((state) => {
      const newCount = state.count + 1;
      localStorage.setItem(CART_KEY, String(newCount));
      return { count: newCount };
    }),

  resetCart: () => set(() => {
    localStorage.setItem(CART_KEY, "0");
    return { count: 0 };
  }),
}));
