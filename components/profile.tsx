import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { PinRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import profileIcon from "@/assets/boy-front-gradient.png";

export function Profile() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full bg-muted" variant="ghost" size="icon">
          <Avatar>
            {session?.user?.image ? (
              <AvatarImage src={session?.user?.image} className="p-1" />
            ) : (
              <Image
                className="p-1"
                src={profileIcon}
                alt="profile"
                width={40}
                height={40}
                quality={100}
              />
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex justify-between items-center cursor-pointer">
          <Link href="/me">Mon Compte</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex justify-between items-center cursor-pointer"
        >
          <p className="font-medium text-red-500 hover:text-red-500">
            Déconnexion
          </p>
          <PinRightIcon className="text-red-500" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
