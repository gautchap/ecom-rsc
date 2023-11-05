"use client";

import Link from "next/link";
import { Teko } from "next/font/google";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "@/context/shopping-cart-provider";

const teko = Teko({ weight: ["500"], subsets: ["latin"] });

export default function MainNav() {
  const pathname = usePathname();
  const { cartQuantity } = useShoppingCart();
  return (
    <>
      <ul className="hidden md:flex gap-3 ">
        <li>
          <Link
            className={`${
              teko.className
            } uppercase text-2xl transition-all hover:text-[#55d8f9]
              ${pathname === "/" && "text-[#55d8f9]"}`}
            href="/"
          >
            home
          </Link>
        </li>
        <li>
          <Link
            className={`${
              teko.className
            } uppercase text-2xl transition-all hover:text-[#55d8f9] ${
              pathname.includes("/shop") && "text-[#55d8f9]"
            }`}
            href="/shop"
          >
            shop
          </Link>
        </li>
        <li>
          <Link
            className={`${
              teko.className
            } relative uppercase text-2xl transition-all hover:text-[#55d8f9] ${
              pathname === "/checkout" && "text-[#55d8f9]"
            }`}
            href="/checkout"
          >
            <span>panier</span>

            {cartQuantity > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartQuantity}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </>
  );
}
