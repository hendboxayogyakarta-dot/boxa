"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gem, MessageCircle, LayoutGrid, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

export function MobileBottomNav({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();

  const items = [
    { label: "Home", href: "/", icon: Home, match: (p: string) => p === "/" },
    { label: "Shop", href: "/shop", icon: LayoutGrid, match: (p: string) => p === "/shop" },
    { label: "Rare", href: "/shop?rare=1", icon: Gem, match: () => false },
    { label: "Tentang", href: "/tentang", icon: Info, match: (p: string) => p === "/tentang" },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid grid-cols-5">
        {items.map(({ label, href, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium",
                active ? "text-accent" : "text-muted"
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.4 : 2} />
              {label}
            </Link>
          );
        })}
        <a
          href={`https://wa.me/${settings.whatsapp_number}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium text-flame"
        >
          <MessageCircle size={20} />
          Chat
        </a>
      </div>
    </nav>
  );
}
