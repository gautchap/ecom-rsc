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
import dynamic from "next/dynamic";

const teko = Teko({ weight: ["500"], subsets: ["latin"] });

const BadgeNotification = dynamic(
  () => import("@/components/badge-notification"),
  {
    ssr: false,
  },
);

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

                    <BadgeNotification />
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
