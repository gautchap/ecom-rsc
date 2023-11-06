"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CartItems, CartItem } from "@/types/storage";

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

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined,
);

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider",
    );
  }
  return context;
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartContextProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItems>("cart", []);

  const hasDuplicates = (items: CartItems): boolean => {
    const uniqueProductIds = items.map((item) => item.productId);
    const uniqueSet = new Set(uniqueProductIds);

    return uniqueSet.size < items.length;
  };

  const mergeDuplicates = (items: CartItems): CartItems => {
    const mergedItems: { [key: string]: CartItem } = {};
    for (const item of items) {
      const productId = item.productId;
      const quantity = item.quantity;
      if (mergedItems[productId]) {
        mergedItems[productId].quantity += quantity;
      } else {
        mergedItems[productId] = { productId, quantity };
      }
    }
    return Object.values(mergedItems);
  };

  useEffect(() => {
    if (hasDuplicates(cartItems)) {
      setCartItems(mergeDuplicates(cartItems));
    }
  }, []);

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
