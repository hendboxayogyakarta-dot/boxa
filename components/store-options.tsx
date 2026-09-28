import Image from "next/image";
import { MessageCircle, MapPin, ShoppingBag, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatIDR, buildWhatsAppOrderLink, savingsPercent } from "@/lib/utils";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { MysteryPrice } from "@/components/mystery-price";
import { CodLocalBadge } from "@/components/cod-local-badge";

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

  const localSavingsPct =
    showLocal && product.price > 0 ? savingsPercent(product.price, product.local_price!) : 0;

  const localWhatsAppLink = showLocal
    ? buildWhatsAppOrderLink(whatsappNumber, product, "Harga Lokal", product.local_price!)
    : null;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink">Tempat Beli</h2>

      {showLocal && (
        <div className={`animate-glow relative rounded-2xl border-2 border-flame bg-white p-4 ${localSavingsPct > 0 ? "pt-8 sm:pt-4" : ""}`}>
          {localSavingsPct > 0 && (
            <span className="absolute -top-5 right-4 flex items-baseline gap-1.5 rounded-xl bg-flame px-3 py-1.5 leading-none text-on-brand shadow-lg sm:px-4">
              <span className="font-display text-2xl font-extrabold sm:text-3xl">{localSavingsPct}%</span>
              <span className="text-xs font-bold uppercase tracking-wide">lebih murah</span>
            </span>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <CodLocalBadge size="md" />
            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-flame">
              <MapPin size={12} /> BOXA Local Price
            </span>
          </div>
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
          {/* Shown here on the product page only — the listing cards
              deliberately don't repeat it, they just carry the buy button. */}
          {!product.offline_available && (
            <p className="mt-1 text-xs text-muted">
              Barang ini belum tersedia untuk pembelian lokal (COD / BOXA Local Price).
            </p>
          )}
          {/* Same card shape as BOXA Local Price above (border, padding,
              price size, full-width button) — COD local can still be the
              suggested default, but every option here is still a real
              choice and should look like one, not an afterthought. */}
          <div className="mt-2 space-y-2">
            {storeCards.map((s) => (
              <div key={s.key} className="rounded-2xl border border-line bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-photo-frame">
                    {s.logoUrl ? (
                      <Image src={s.logoUrl} alt={s.name} fill sizes="44px" className="object-contain p-1.5" />
                    ) : (
                      <ShoppingBag size={18} className="text-muted" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">{s.name}</span>
                    {s.price != null ? (
                      <span className="font-display text-xl font-extrabold text-accent">{formatIDR(s.price)}</span>
                    ) : (
                      <MysteryPrice />
                    )}
                  </div>
                </div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-maroon hover:text-accent"
                >
                  Lihat Produk
                  <ArrowRight size={15} />
                </a>
              </div>
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
