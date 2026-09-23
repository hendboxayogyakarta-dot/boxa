"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Menu, Search, X, MessageCircle, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartButton } from "@/components/cart-button";

const NAV = [
  { label: "Beranda", href: "/" },
  { label: "Semua Produk", href: "/shop" },
  { label: "Tentang BOXA", href: "/tentang" },
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-1.5 font-display text-xl font-extrabold tracking-tight text-accent">
          {settings.logo_url ? (
            <span className="relative block h-8 w-8 shrink-0">
              <Image src={settings.logo_url} alt={settings.brand_name} fill sizes="32px" className="object-contain" />
            </span>
          ) : (
            <Flame size={19} className="text-flame" />
          )}
          {settings.brand_name}
        </Link>

        <nav className="hidden flex-1 items-center gap-7 md:flex">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("?")[0]) && item.href !== "/";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-ink-soft transition-colors hover:text-accent",
                  active && "text-accent"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form action="/shop" className="hidden flex-1 items-center md:flex md:max-w-xs">
          <div className="flex w-full items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 transition-colors focus-within:border-maroon">
            <Search size={16} className="text-muted" />
            <input
              name="q"
              placeholder="Cari mainan, brand, seri..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
        </form>

        <CartButton whatsappNumber={settings.whatsapp_number} />

        <ThemeToggle className="hidden sm:flex" />

        <a
          href={`https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent("Halo BOXA, saya mau tanya-tanya soal produk (bukan request atau soal pesanan tertentu).")}`}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1.5 rounded-full bg-flame px-4 py-2 text-sm font-semibold text-on-brand transition-colors hover:bg-flame-light sm:inline-flex"
        >
          <MessageCircle size={15} />
          Chat BOXA
        </a>

        <button
          className="ml-auto rounded-lg p-2 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Search always visible at the top on mobile — Shopee-style, not
          tucked behind the hamburger menu. */}
      <form action="/shop" className="border-t border-line px-4 py-2.5 md:hidden">
        <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2">
          <Search size={16} className="shrink-0 text-muted" />
          <input
            name="q"
            placeholder="Cari mainan, brand, seri..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </div>
      </form>

      {open && (
        <div className="border-t border-line bg-cream px-4 pb-4 md:hidden">
          <nav className="mt-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-ink-soft hover:bg-cream-warm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
            <ThemeToggle />
            <span className="text-sm text-ink-soft">Mode gelap</span>
          </div>
        </div>
      )}
    </header>
  );
}
