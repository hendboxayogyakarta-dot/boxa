"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Home, ShoppingBag, Layers, Gem, Info, Camera, Music2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

const NAV = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Koleksi", href: "/shop?featured=1", icon: Layers },
  { label: "Rare", href: "/shop?rare=1", icon: Gem },
  { label: "Tentang", href: "/tentang", icon: Info },
];

export function BoxaSidebar({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[76px] flex-col items-center border-r border-site-border bg-site-bg/95 py-6 backdrop-blur md:flex">
      <Link
        href="/"
        aria-label={settings.brand_name}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-flame to-ember text-site-bg"
      >
        <Flame size={20} strokeWidth={2.5} />
      </Link>

      <div className="my-8 [writing-mode:vertical-rl]">
        <span className="font-display text-xs font-bold tracking-[0.3em] text-site-text-muted">
          BOXA.YK
        </span>
      </div>

      <nav className="flex flex-1 flex-col items-center gap-1">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]) && href !== "/";
          return (
            <Link
              key={label}
              href={href}
              title={label}
              className={cn(
                "group flex w-full flex-col items-center gap-1 py-3 text-site-text-faint transition-colors hover:text-flame",
                active && "text-flame"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg border border-transparent transition-colors",
                  active && "border-flame/40 bg-flame/10"
                )}
              >
                <Icon size={16} />
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wider">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-4 pt-4">
        <a href={settings.instagram_url} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-site-text-faint transition-colors hover:text-flame">
          <Camera size={15} />
        </a>
        <a href={settings.tiktok_url} target="_blank" rel="noreferrer" aria-label="TikTok" className="text-site-text-faint transition-colors hover:text-flame">
          <Music2 size={15} />
        </a>
        <a href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-site-text-faint transition-colors hover:text-flame">
          <MessageCircle size={15} />
        </a>
      </div>
    </aside>
  );
}
