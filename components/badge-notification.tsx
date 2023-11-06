"use client";

import { useShoppingCart } from "@/context/shopping-cart-provider";

export default function BadgeNotification() {
  const { cartQuantity } = useShoppingCart();

  return (
    <>
      {cartQuantity > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {cartQuantity}
        </span>
      )}
    </>
  );
}
