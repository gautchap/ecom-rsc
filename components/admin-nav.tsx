"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="my-4">
      <Link
        href="/admin"
        className={`${pathname === "/admin" && "underline"} hover:underline`}
      >
        Modifier mon un produit/catégorie
      </Link>
      <br />
      <Link
        href="/admin/history"
        className={`${
          pathname === "/admin/history" && "underline"
        } hover:underline`}
      >
        Historique des commandes
      </Link>
      <br />
    </aside>
  );
}
