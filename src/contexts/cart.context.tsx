import React, { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  resetCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface ICartProviderProps {
  children: React.ReactNode;
}

const CART_KEY = "cart_count";

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, String(count));
  }, [count]);

  const resetCart = () => {
    setCount(0);
    localStorage.setItem(CART_KEY, "0");
  };

  return (
    <CartContext.Provider value={{ count, setCount, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart most be used within <CartProvider>");
  }
  return context;
};
