"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Profile } from "@/components/profile";

export function Navbar() {
    const { data: session } = useSession();
    const { setTheme } = useTheme();

    return (
        <nav className="container flex items-center justify-between py-3">
            <div className="flex gap-2 items-center">
                {session ? (
                    <Profile />
                ) : (
                    <Link href="/login">
                        <Button>Sign In</Button>
                    </Link>
                )}
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                        <SunIcon
                            onClick={() => setTheme("dark")}
                            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                        />
                        <MoonIcon
                            onClick={() => setTheme("light")}
                            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                        />
                    </Button>
                </div>
            </div>
        </nav>
    );
}