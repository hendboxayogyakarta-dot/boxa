"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart, type CartItem } from "./cart-context";

export function AddToCartButton({ item, disabled }: { item: CartItem; disabled?: boolean }) {
  const { items, addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.some((i) => i.productId === item.productId);

  function handleAdd() {
    addItem(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled || inCart}
      className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-flame hover:text-flame disabled:cursor-not-allowed disabled:opacity-60"
    >
      {inCart || justAdded ? (
        <>
          <Check size={13} /> {justAdded ? "Ditambahkan" : "Sudah di Keranjang"}
        </>
      ) : (
        <>
          <ShoppingCart size={13} /> Tambah ke Keranjang
        </>
      )}
    </button>
  );
}
