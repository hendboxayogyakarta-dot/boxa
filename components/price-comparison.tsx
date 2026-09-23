import Image from "next/image";
import { MessageCircle, ShoppingBag, MapPin } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatIDR, buildWhatsAppOrderLink } from "@/lib/utils";
import { AddToCartButton } from "@/components/add-to-cart-button";

/**
 * BOXA's "Original Toys, Local Prices" USP made concrete: same product,
 * two ways to get it. Only rendered when the product has a local_price —
 * otherwise the product page keeps the plain single-price <OrderCta>
 * unchanged (see the conditional in the product page).
 */
export function PriceComparison({ product, whatsappNumber }: { product: Product; whatsappNumber: string }) {
  if (product.local_price == null) return null;

  // No per-product WhatsApp link needed — the message is generated from
  // the product's own name/condition/price, so it's already clear what
  // the shopper wants to confirm when it lands in BOXA's WhatsApp.
  const localWhatsAppLink = buildWhatsAppOrderLink(whatsappNumber, product, "Harga Lokal", product.local_price);

  // Online always routes to the Shopee affiliate link — that's the whole
  // point of the online side of this comparison. WhatsApp stays reserved
  // for the local pickup / COD side below.
  const noShopeeLink = !product.shopee_url;
  const soldOut = product.stock_status === "sold_out";
  const onlineDisabled = soldOut || noShopeeLink;
  const marketplaceName = product.marketplace?.name ?? "Marketplace";
  const savings = product.price - product.local_price;
  const hasSavings = savings > 0;

  return (
    <div className="rounded-3xl border border-line bg-cream-warm p-5 sm:p-6">
      <div className="text-xs font-semibold uppercase tracking-widest text-flame">
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
            href={product.shopee_url ?? "#"}
            target="_blank"
            rel="noreferrer"
            aria-disabled={onlineDisabled}
            className={`mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              onlineDisabled
                ? "pointer-events-none bg-line text-muted"
                : "bg-maroon text-on-brand hover:bg-maroon-deep"
            }`}
          >
            {product.marketplace?.logo_url ? (
              <span className="relative h-4 w-4 shrink-0 overflow-hidden rounded-full bg-on-brand">
                <Image src={product.marketplace.logo_url} alt={marketplaceName} fill sizes="16px" className="object-contain" />
              </span>
            ) : (
              <ShoppingBag size={16} />
            )}
            {soldOut ? "Stok Habis" : noShopeeLink ? "Link Belum Ada" : `Pesan via ${marketplaceName}`}
          </a>
        </div>

        {/* Local */}
        <div className="relative flex flex-col rounded-2xl border-2 border-flame bg-white p-4">
          {hasSavings && (
            <span className="absolute -top-3 right-4 rounded-full bg-flame px-2.5 py-0.5 text-[11px] font-bold text-on-brand shadow-sm">
              Hemat {formatIDR(savings)}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-flame">
            <MapPin size={12} /> Lokal — Yogyakarta
          </span>
          <span className="mt-1 font-display text-2xl font-extrabold text-accent">{formatIDR(product.local_price)}</span>
          <span className="mt-0.5 text-xs text-muted">Ambil langsung / COD lokal</span>
          <a
            href={localWhatsAppLink}
            target="_blank"
            rel="noreferrer"
            aria-disabled={soldOut}
            className={`mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              soldOut
                ? "pointer-events-none bg-line text-muted"
                : "bg-flame text-on-brand hover:bg-flame-light"
            }`}
          >
            <MessageCircle size={16} />
            {soldOut ? "Stok Habis" : "Ambil di Yogyakarta"}
          </a>
          {!soldOut && (
            <AddToCartButton
              item={{
                productId: product.id,
                slug: product.slug,
                name: product.name,
                imageUrl: product.images[0]?.url ?? null,
                localPrice: product.local_price,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
