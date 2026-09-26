import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatIDR, hasPrice } from "@/lib/utils";
import { MysteryPrice } from "./mystery-price";

/**
 * Deliberately NOT the same card used for regular listings or the old
 * "Pilihan BOXA" framing — no boxa_score, no recommendation badge. This
 * page is "we don't have it locally, here's where else to look," not a
 * quality ranking, so the card leads with the store options instead.
 */
export function StoreReferenceCard({ product }: { product: Product }) {
  const primaryImage = product.images.find((i) => i.is_primary) ?? product.images[0];
  const storeCount = product.store_refs?.length ?? (product.shopee_url ? 1 : 0);
  const firstStore = product.store_refs?.[0]?.store ?? product.marketplace;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="hover-lift group flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
    >
      <div className="relative aspect-square overflow-hidden bg-photo-frame">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">No image</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        {product.brand && <span className="text-xs text-muted">{product.brand}</span>}
        <h3 className="line-clamp-2 text-sm font-semibold text-ink">{product.name}</h3>

        <div className="mt-auto pt-1">
          {hasPrice(product.price) ? (
            <span className="font-display text-base font-bold text-accent">{formatIDR(product.price)}</span>
          ) : (
            <MysteryPrice />
          )}
        </div>

        {storeCount > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full bg-photo-frame">
              {firstStore?.logo_url ? (
                <Image src={firstStore.logo_url} alt="" fill sizes="16px" className="object-contain p-0.5" />
              ) : (
                <ShoppingBag size={9} />
              )}
            </span>
            {storeCount > 1 ? `${storeCount} pilihan toko` : "Pilihan online tersedia"}
          </div>
        )}
      </div>
    </Link>
  );
}
