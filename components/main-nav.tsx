"use client";

import Link from "next/link";
import { Teko } from "next/font/google";
import { usePathname } from "next/navigation";

const teko = Teko({ weight: ["500"], subsets: ["latin"] });

export default function MainNav() {
  const pathname = usePathname();
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
            } uppercase text-2xl transition-all hover:text-[#55d8f9] ${
              pathname === "/checkout" && "text-[#55d8f9]"
            }`}
            href="/checkout"
          >
            panier
          </Link>
        </li>
      </ul>
    </>
  );
}
