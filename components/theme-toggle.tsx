"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <div className="relative">
      <Button
        title="switch theme dark"
        onClick={() => setTheme("dark")}
        variant="ghost"
        size="icon"
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        title="switch theme white"
        onClick={() => setTheme("light")}
        variant="ghost"
        size="icon"
        className="absolute left-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      >
        <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
}
