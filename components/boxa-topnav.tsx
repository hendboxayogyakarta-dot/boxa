"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Flame, Search, Menu, X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";
import { SearchOverlay } from "./search-overlay";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Koleksi", href: "/shop?featured=1" },
  { label: "Rare", href: "/shop?rare=1" },
  { label: "Tentang", href: "/tentang" },
];

export function BoxaTopNav({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-site-border bg-site-bg/80 backdrop-blur md:pl-[76px]">
        <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-extrabold text-site-text md:hidden">
            <Flame size={18} className="text-flame" />
            {settings.brand_name}
          </Link>

          <nav className="hidden flex-1 items-center gap-7 md:flex">
            {NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("?")[0]) && item.href !== "/";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-site-text-muted transition-colors hover:text-site-text",
                    active && "text-flame after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-flame after:shadow-[0_0_8px_theme(colors.flame)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Cari"
              className="text-site-text-muted transition-colors hover:text-flame"
            >
              <Search size={17} />
            </button>
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="hidden text-site-text-muted transition-colors hover:text-flame sm:block"
              aria-label="Instagram"
            >
              <Camera size={17} />
            </a>
            <Link
              href="/shop"
              className="hidden rounded-full bg-flame px-5 py-2 text-xs font-bold uppercase tracking-wider text-site-bg transition-colors hover:bg-ember sm:inline-block"
            >
              Shop Now
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="text-site-text md:hidden"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-site-border px-5 pb-4 md:hidden">
            <nav className="flex flex-col gap-1 pt-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-site-text-muted hover:bg-site-surface hover:text-site-text"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-flame px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-site-bg"
              >
                Shop Now
              </Link>
            </nav>
          </div>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
