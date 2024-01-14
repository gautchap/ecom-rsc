"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { LoginForm } from "@/components/login-form";

export function ModalLogin() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Connexion</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Se connecter</DialogTitle>
                        <DialogDescription>Entrez votre adresse mail ci-dessous pour vous connecter</DialogDescription>
                    </DialogHeader>
                    <LoginForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button>Connexion</Button>
            </DrawerTrigger>
            <DrawerContent className="px-4">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Connexion</DrawerTitle>
                    <DrawerDescription>Entrez votre adresse mail ci-dessous pour vous connecter</DrawerDescription>
                </DrawerHeader>
                <LoginForm />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Annuler</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
