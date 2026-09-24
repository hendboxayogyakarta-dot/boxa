"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./site-theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-maroon hover:text-accent",
        className
      )}
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
