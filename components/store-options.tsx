import Image from "next/image";
import { MessageCircle, MapPin, ShoppingBag, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatIDR, buildWhatsAppOrderLink } from "@/lib/utils";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { MysteryPrice } from "@/components/mystery-price";

/**
 * "Tempat Beli" — where a customer can actually get this product. Two
 * independent parts, either or both may show:
 *   1. BOXA Local Price — only if this product has a local_price AND is
 *      still offline_available (COD/pickup eligible).
 *   2. Pilihan Online — every store this product is linked to via
 *      product_stores (Store Reference), presented as plain "places to
 *      buy" cards. Never call these "affiliate" — that's dashboard-only
 *      language (see relationship_type on Store). A product that only
 *      has the legacy single shopee_url/marketplace_id set (no
 *      product_stores rows yet) still gets one synthesized card here,
 *      so nothing already configured stops working.
 *
 * Returns null when there's genuinely nothing to show here, in which
 * case the product page falls back to the plain single-price <OrderCta>.
 */
export function StoreOptions({ product, whatsappNumber }: { product: Product; whatsappNumber: string }) {
  const soldOut = product.stock_status === "sold_out";
  const showLocal = product.local_price != null && product.offline_available;

  const storeCards =
    product.store_refs && product.store_refs.length > 0
      ? product.store_refs.map((ref) => ({
          key: ref.id,
          name: ref.store?.name ?? "Toko",
          logoUrl: ref.store?.logo_url ?? null,
          url: ref.product_url ?? ref.store?.link ?? "#",
          price: ref.price,
        }))
      : product.shopee_url
        ? [
            {
              key: "legacy",
              name: product.marketplace?.name ?? "Marketplace",
              logoUrl: product.marketplace?.logo_url ?? null,
              url: product.shopee_url,
              price: product.price > 0 ? product.price : null,
            },
          ]
        : [];

  if (!showLocal && storeCards.length === 0) return null;

  const localWhatsAppLink = showLocal
    ? buildWhatsAppOrderLink(whatsappNumber, product, "Harga Lokal", product.local_price!)
    : null;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink">Tempat Beli</h2>

      {showLocal && (
        <div className="rounded-2xl border-2 border-flame bg-white p-4">
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-flame">
            <MapPin size={12} /> BOXA Local Price
          </span>
          <span className="mt-1 block font-display text-2xl font-extrabold text-accent">
            {formatIDR(product.local_price!)}
          </span>
          <span className="mt-0.5 block text-xs text-muted">Ambil langsung / COD area Yogyakarta</span>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <a
              href={soldOut ? undefined : localWhatsAppLink!}
              target="_blank"
              rel="noreferrer"
              aria-disabled={soldOut}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                soldOut ? "pointer-events-none bg-line text-muted" : "bg-flame text-on-brand hover:bg-flame-light"
              }`}
            >
              <MessageCircle size={16} />
              {soldOut ? "Stok Habis" : "Beli di BOXA"}
            </a>
          </div>
          {!soldOut && (
            <AddToCartButton
              item={{
                productId: product.id,
                slug: product.slug,
                name: product.name,
                imageUrl: product.images[0]?.url ?? null,
                localPrice: product.local_price!,
              }}
            />
          )}
        </div>
      )}

      {storeCards.length > 0 && (
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">Pilihan Online</span>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {storeCards.map((s) => (
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-line bg-white p-3 transition-colors hover:border-maroon"
              >
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream-warm">
                  {s.logoUrl ? (
                    <Image src={s.logoUrl} alt={s.name} fill sizes="36px" className="object-contain p-1" />
                  ) : (
                    <ShoppingBag size={15} className="text-muted" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{s.name}</span>
                  {s.price != null ? (
                    <span className="text-sm font-bold text-accent">{formatIDR(s.price)}</span>
                  ) : (
                    <MysteryPrice />
                  )}
                </span>
                <ArrowRight size={15} className="shrink-0 text-muted" />
              </a>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted">
            Beberapa link pembelian dapat memberikan dukungan kepada BOXA.
          </p>
        </div>
      )}
    </div>
  );
}
