"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

type UserLayoutProps = {
  session: Session;
};

export default function UserNav({ session }: UserLayoutProps) {
  const pathname = usePathname();

  return (
    <aside className="my-4">
      <Link
        href="/me"
        className={`${pathname === "/me" && "underline"} hover:underline`}
      >
        Modifier mon profil
      </Link>
      <br />
      <Link
        href="/me/history"
        className={`${
          pathname === "/me/history" && "underline"
        } hover:underline`}
      >
        Historique des commandes
      </Link>
      <br />

      {session.user.isAdmin && (
        <Link href="/admin" className="hover:underline">
          Espace Admin
        </Link>
      )}
    </aside>
  );
}
