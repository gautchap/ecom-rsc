import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import profileIcon from "@/assets/boy-front-gradient.png";
import { NavBarProps } from "@/components/nav-bar";
import ButtonSignOut from "@/components/button-signout";

export function Profile({ session }: NavBarProps) {
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
        <ButtonSignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
