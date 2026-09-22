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
      return { href: product.whatsapp_url ?? "#", icon: <MessageCircle size={18} />, label: "Pesan Sekarang" };
  }
}

export function OrderCta({ product }: { product: Product }) {
  const soldOut = product.stock_status === "sold_out";
  const { href, icon, label } = resolveHref(product);

  function handleClick() {
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
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-site-surface px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-site-text-faint"
      >
        Stok Habis
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 sm:flex-row">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-flame px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-site-bg shadow-[0_0_24px_-6px_theme(colors.flame)] transition-transform hover:scale-[1.02]"
      >
        {icon}
        {label}
      </a>
      {product.whatsapp_url && product.cta_type !== "WHATSAPP" && (
        <a
          href={product.whatsapp_url}
          target="_blank"
          rel="noreferrer"
          onClick={handleClick}
          className="flex items-center justify-center gap-2 rounded-full border border-site-border-strong px-5 py-3.5 text-sm font-semibold text-site-text transition-colors hover:border-flame hover:text-flame"
        >
          <MessageCircle size={16} />
          Tanya via WhatsApp
        </a>
      )}
    </div>
  );
}
