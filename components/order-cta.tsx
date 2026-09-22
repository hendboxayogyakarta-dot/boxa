"use client";

import { MessageCircle, ShoppingBag, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/types";

function resolveHref(product: Product): { href: string; icon: React.ReactNode; label: string } {
  switch (product.cta_type) {
    case "SHOPEE":
      return { href: product.shopee_url ?? "#", icon: <ShoppingBag size={18} />, label: "Pesan di Shopee" };
    case "EXTERNAL_URL":
      return { href: product.external_order_url ?? "#", icon: <ExternalLink size={18} />, label: "Pesan Sekarang" };
    case "WHATSAPP":
    default:
      return { href: product.whatsapp_url ?? "#", icon: <MessageCircle size={18} />, label: "Pesan via WhatsApp" };
  }
}

export function OrderCta({ product }: { product: Product }) {
  const soldOut = product.stock_status === "sold_out";
  const { href, icon, label } = resolveHref(product);

  function handleClick() {
    // Fire-and-forget click tracking (see app/api/cta-click/route.ts).
    // Never blocks navigation — analytics failures should not stop a sale.
    fetch("/api/cta-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: product.id, cta_type: product.cta_type }),
      keepalive: true,
    }).catch(() => {});
  }

  if (soldOut) {
    return (
      <button
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-ink/20 px-6 py-3.5 text-sm font-semibold text-ink/50"
      >
        Stok Habis
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-maroon-deep"
    >
      {icon}
      {label}
    </a>
  );
}
