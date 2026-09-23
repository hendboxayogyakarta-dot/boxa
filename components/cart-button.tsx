"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";
import { CartDrawer } from "./cart-drawer";

export function CartButton({ whatsappNumber, className = "" }: { whatsappNumber: string; className?: string }) {
  const { items } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buka keranjang"
        className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-maroon hover:text-accent ${className}`}
      >
        <ShoppingCart size={16} />
        {items.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-flame text-[10px] font-bold text-on-brand">
            {items.length}
          </span>
        )}
      </button>
      <CartDrawer open={open} onClose={() => setOpen(false)} whatsappNumber={whatsappNumber} />
    </>
  );
}
