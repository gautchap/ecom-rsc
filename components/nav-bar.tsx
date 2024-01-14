import { Profile } from "@/components/profile";
import MainNav from "@/components/main-nav";
import SideNav from "@/components/side-nav";
import ThemeToggle from "@/components/theme-toggle";
import { Session } from "next-auth";
import { ModalLogin } from "@/components/modal-login";

export type NavBarProps = {
    session: Session | null;
};

export function Navbar({ session }: NavBarProps) {
    return (
        <nav className="container flex items-center justify-between py-3">
            <SideNav />
            <MainNav />
            <div className="flex gap-2 items-center">
                {session ? (
                    <Profile session={session} />
                ) : (
                    <>
                        <ModalLogin />
                    </>
                )}
                <div className="flex items-center space-x-2">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
