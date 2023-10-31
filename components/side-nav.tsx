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

const teko = Teko({ weight: ["500"], subsets: ["latin"] });

export default function SideNav() {
  const pathname = usePathname();
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
                      pathname === "/shop" && "text-[#55d8f9]"
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
                    } uppercase text-2xl transition-all hover:text-[#55d8f9] ${
                      pathname === "/checkout" && "text-[#55d8f9]"
                    }`}
                    href="/checkout"
                  >
                    panier
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
