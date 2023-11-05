"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CartItems } from "@/types/storage";

type ShoppingCartContextProps = {
  children: ReactNode;
};

type ShoppingCartContextType = {
  getQuantity: (productId: string) => number;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: (productId: string) => void;
  cartQuantity: number;
  cartItems: CartItems;
  setCartItems: (value: CartItems) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const useShoppingCart = () => useContext(ShoppingCartContext);

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartContextProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItems>("cart", []);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );

  const getQuantity = (id: string) =>
    cartItems.find((item) => item.productId === id)?.quantity ?? 0;

  const addItem = (productId: string) =>
    setCartItems((currentItems) =>
      currentItems.some((item) => item.productId === productId)
        ? currentItems.map((item) => {
            if (item.productId === productId) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          })
        : [...currentItems, { productId, quantity: 1 }],
    );

  const removeItem = (productId: string) =>
    setCartItems((currentItems) =>
      currentItems.find((item) => item.productId === productId)?.quantity === 1
        ? currentItems.filter((item) => item.productId !== productId)
        : currentItems.map((item) => {
            if (item.productId === productId) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          }),
    );

  const clearCart = (productId: string) =>
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    );

  return (
    <ShoppingCartContext.Provider
      value={{
        getQuantity,
        addItem,
        removeItem,
        clearCart,
        cartItems,
        cartQuantity,
        setCartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
