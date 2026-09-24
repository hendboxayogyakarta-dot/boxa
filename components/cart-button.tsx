"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";
import { cn } from "@/lib/utils";

/**
 * Just a trigger now — the actual <CartDrawer> is rendered once in the
 * site layout, driven by CartContext's shared isOpen state. Two separate
 * drawer instances (one per trigger) with their own local state was the
 * bug where the drawer looked "stuck" over whatever page you navigated to.
 */
export function CartButton({ className = "" }: { className?: string }) {
  const { items, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      aria-label="Buka keranjang"
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-maroon hover:text-accent",
        className
      )}
    >
      <ShoppingCart size={16} />
      {items.length > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-flame text-[10px] font-bold text-on-brand">
          {items.length}
        </span>
      )}
    </button>
  );
}
