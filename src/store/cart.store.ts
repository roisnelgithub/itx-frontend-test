import { create } from "zustand";

const CART_KEY = "cart_items";

export interface ICartItem {
  id: string;
  uniqueId?: string;
  name: string;
  price: number;
  quantity: number;
  imageURL: string;
  color: string;
  storage: string;
}

interface CartState {
  items: ICartItem[];
  count: number;

  addItem: (product: Omit<ICartItem, "quantity">) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  resetCart: () => void;
}

const saveToLocalStorage = (items: ICartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

const calculateCount = (items: ICartItem[]) =>
  items.reduce((acc, item) => acc + item.quantity, 0);

export const useCartStore = create<CartState>((set) => ({
  items: (() => {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  })(),

  count: (() => {
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) return 0;
    const parsed = JSON.parse(saved);
    return parsed.reduce((acc: number, i: ICartItem) => acc + i.quantity, 0);
  })(),

  addItem: (product) =>
    set((state) => {
      const uniqueId = `${product.id}-${product.color}-${product.storage}`;

      const existing = state.items.find((i) => i.uniqueId === uniqueId);

      let newItems: ICartItem[];

      if (existing) {
        newItems = state.items.map((i) =>
          i.uniqueId === uniqueId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...state.items, { ...product, quantity: 1, uniqueId }];
      }

      saveToLocalStorage(newItems);
      const newCount = calculateCount(newItems);

      return { items: newItems, count: newCount };
    }),

  increaseQuantity: (uniqueId: string) =>
    set((state) => {
      const newItems = state.items.map((i) =>
        i.uniqueId === uniqueId ? { ...i, quantity: i.quantity + 1 } : i
      );
      saveToLocalStorage(newItems);
      return { items: newItems, count: calculateCount(newItems) };
    }),

  decreaseQuantity: (uniqueId: string) =>
    set((state) => {
      const newItems = state.items
        .map((i) =>
          i.uniqueId === uniqueId
            ? { ...i, quantity: Math.max(0, i.quantity - 1) }
            : i
        )
        .filter((i) => i.quantity > 0);

      saveToLocalStorage(newItems);
      return { items: newItems, count: calculateCount(newItems) };
    }),

  resetCart: () =>
    set(() => {
      saveToLocalStorage([]);
      return { items: [], count: 0 };
    }),
}));
