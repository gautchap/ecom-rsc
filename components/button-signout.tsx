"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { PinRightIcon } from "@radix-ui/react-icons";

export default function ButtonSignOut() {
  return (
    <DropdownMenuItem
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex justify-between items-center cursor-pointer"
    >
      <p className="font-medium text-red-500 hover:text-red-500">Déconnexion</p>
      <PinRightIcon className="text-red-500" />
    </DropdownMenuItem>
  );
}
