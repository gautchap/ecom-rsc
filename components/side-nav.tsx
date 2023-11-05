"use client";

import Link from "next/link";
import { Teko } from "next/font/google";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/ui/icons";
import { useShoppingCart } from "@/context/shopping-cart-provider";

const teko = Teko({ weight: ["500"], subsets: ["latin"] });

export default function SideNav() {
  const pathname = usePathname();
  const { cartQuantity } = useShoppingCart();
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Icons.burger className="h-8 w-8" />
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <ul>
              <li className="text-center">
                <SheetClose asChild>
                  <Link
                    className={`${
                      teko.className
                    } uppercase text-2xl transition-all hover:text-[#55d8f9]
              ${pathname === "/" && "text-[#55d8f9]"}`}
                    href="/"
                  >
                    home
                  </Link>
                </SheetClose>
              </li>
              <li className="text-center">
                <SheetClose asChild>
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
                </SheetClose>
              </li>
              <li className="text-center">
                <SheetClose asChild>
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
                </SheetClose>
              </li>
            </ul>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
