"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X, MessageCircle } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

const NAV = [
  { label: "Beranda", href: "/" },
  { label: "Semua Produk", href: "/shop" },
  { label: "Rare / Secret", href: "/shop?rare=1" },
  { label: "Tentang BOXA", href: "/tentang" },
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-maroon">
          {settings.brand_name}
        </Link>

        <nav className="hidden flex-1 items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-maroon"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form action="/shop" className="hidden flex-1 items-center md:flex md:max-w-xs">
          <div className="flex w-full items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5">
            <Search size={16} className="text-muted" />
            <input
              name="q"
              placeholder="Cari mainan, brand, seri..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
        </form>

        <a
          href={`https://wa.me/${settings.whatsapp_number}`}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1.5 rounded-full bg-flame px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-flame-light sm:inline-flex"
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

      {open && (
        <div className="border-t border-line bg-cream px-4 pb-4 md:hidden">
          <form action="/shop" className="my-3 flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2">
            <Search size={16} className="text-muted" />
            <input
              name="q"
              placeholder="Cari mainan..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </form>
          <nav className="flex flex-col gap-1">
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
        </div>
      )}
    </header>
  );
}
