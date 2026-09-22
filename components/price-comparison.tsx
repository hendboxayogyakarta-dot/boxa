import { MessageCircle, ShoppingBag, ExternalLink, MapPin, Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatIDR } from "@/lib/utils";

function resolveOnlineCta(product: Product): { href: string; icon: React.ReactNode; label: string } {
  switch (product.cta_type) {
    case "SHOPEE":
      return { href: product.shopee_url ?? "#", icon: <ShoppingBag size={16} />, label: "Beli di Shopee" };
    case "EXTERNAL_URL":
      return { href: product.external_order_url ?? "#", icon: <ExternalLink size={16} />, label: "Beli Online" };
    case "WHATSAPP":
    default:
      return { href: product.whatsapp_url ?? "#", icon: <MessageCircle size={16} />, label: "Beli Online" };
  }
}

/**
 * BOXA's "Original Toys, Local Prices" USP made concrete: same product,
 * two ways to get it. Only rendered when the product has a local_price —
 * otherwise the product page keeps the plain single-price <OrderCta>
 * unchanged (see the conditional in the product page).
 */
export function PriceComparison({ product }: { product: Product }) {
  if (product.local_price == null) return null;

  const online = resolveOnlineCta(product);
  const soldOut = product.stock_status === "sold_out";
  const savings = product.price - product.local_price;
  const hasSavings = savings > 0;

  return (
    <div className="rounded-3xl border border-line bg-cream-warm p-5 sm:p-6">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-flame">
        <Sparkles size={13} />
        Original Toys, Local Prices
      </div>
      <p className="mt-1.5 text-sm text-ink-soft">
        Barang sama, orisinal — ambil langsung di Yogyakarta bisa lebih hemat.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* Online */}
        <div className="flex flex-col rounded-2xl border border-line bg-white p-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">Online</span>
          <span className="mt-1 font-display text-2xl font-extrabold text-ink">{formatIDR(product.price)}</span>
          <span className="mt-0.5 text-xs text-muted">Beli online / diantar</span>
          <a
            href={online.href}
            target="_blank"
            rel="noreferrer"
            aria-disabled={soldOut}
            className={`mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              soldOut
                ? "pointer-events-none bg-ink/10 text-ink/40"
                : "bg-ink text-cream hover:bg-ink-soft"
            }`}
          >
            {online.icon}
            {soldOut ? "Stok Habis" : online.label}
          </a>
        </div>

        {/* Local */}
        <div className="relative flex flex-col rounded-2xl border-2 border-flame bg-white p-4">
          {hasSavings && (
            <span className="absolute -top-3 right-4 rounded-full bg-flame px-2.5 py-0.5 text-[11px] font-bold text-cream shadow-sm">
              Hemat {formatIDR(savings)}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-flame">
            <MapPin size={12} /> Lokal — Yogyakarta
          </span>
          <span className="mt-1 font-display text-2xl font-extrabold text-maroon">{formatIDR(product.local_price)}</span>
          <span className="mt-0.5 text-xs text-muted">Ambil langsung / COD lokal</span>
          <a
            href={product.whatsapp_url ?? `https://wa.me/`}
            target="_blank"
            rel="noreferrer"
            aria-disabled={soldOut}
            className={`mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              soldOut
                ? "pointer-events-none bg-ink/10 text-ink/40"
                : "bg-flame text-cream hover:bg-flame-light"
            }`}
          >
            <MessageCircle size={16} />
            {soldOut ? "Stok Habis" : "Ambil di Yogyakarta"}
          </a>
        </div>
      </div>
    </div>
  );
}
