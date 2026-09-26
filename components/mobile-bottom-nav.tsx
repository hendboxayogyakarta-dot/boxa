"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, LayoutGrid, Link2, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";
import { useCart } from "./cart-context";

export function MobileBottomNav({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const { items: cartItems, toggleCart } = useCart();

  const items = [
    { label: "Home", href: "/", icon: Home, match: (p: string) => p === "/" },
    { label: "Shop", href: "/shop", icon: LayoutGrid, match: (p: string) => p === "/shop" },
    { label: "Pilihan", href: "/pilihan-online", icon: Link2, match: (p: string) => p === "/pilihan-online" },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-cream/95 backdrop-blur md:hidden"
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
        <button
          onClick={toggleCart}
          className="relative flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium text-muted"
        >
          <span className="relative">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-flame text-[9px] font-bold text-on-brand">
                {cartItems.length}
              </span>
            )}
          </span>
          Keranjang
        </button>
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
