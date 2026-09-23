"use client";

import Image from "next/image";
import { MessageCircle, ShoppingBag, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/types";
import { buildWhatsAppOrderLink } from "@/lib/utils";

function resolveHref(
  product: Product,
  whatsappLink: string
): { href: string; icon: React.ReactNode; label: string } {
  switch (product.cta_type) {
    case "SHOPEE": {
      const name = product.marketplace?.name ?? "Marketplace";
      const icon = product.marketplace?.logo_url ? (
        <span className="relative h-4 w-4 shrink-0 overflow-hidden rounded-full bg-on-brand">
          <Image src={product.marketplace.logo_url} alt={name} fill sizes="16px" className="object-contain" />
        </span>
      ) : (
        <ShoppingBag size={18} />
      );
      return { href: product.shopee_url ?? "#", icon, label: `Pesan via ${name}` };
    }
    case "EXTERNAL_URL":
      return { href: product.external_order_url ?? "#", icon: <ExternalLink size={18} />, label: "Pesan Sekarang" };
    case "WHATSAPP":
    default:
      return { href: whatsappLink, icon: <MessageCircle size={18} />, label: "Pesan Sekarang" };
  }
}

export function OrderCta({ product, whatsappNumber }: { product: Product; whatsappNumber: string }) {
  const soldOut = product.stock_status === "sold_out";
  // Auto-built from the product's own name/condition/price — no manual
  // per-product WhatsApp link to maintain.
  const whatsappLink = buildWhatsAppOrderLink(whatsappNumber, product, "Harga", product.price);
  const { href, icon, label } = resolveHref(product, whatsappLink);

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
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-line text-sm font-semibold text-muted px-6 py-3.5"
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
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-maroon px-6 py-3.5 text-sm font-semibold text-on-brand transition-colors hover:bg-maroon-deep"
      >
        {icon}
        {label}
      </a>
      {product.cta_type !== "WHATSAPP" && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          onClick={handleClick}
          className="flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm font-semibold text-ink-soft transition-colors hover:border-maroon hover:text-accent"
        >
          <MessageCircle size={16} />
          Tanya via WhatsApp
        </a>
      )}
    </div>
  );
}
