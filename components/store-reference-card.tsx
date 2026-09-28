import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
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
  const firstRef = product.store_refs?.[0];
  const firstStore = firstRef?.store ?? product.marketplace;
  const storeUrl = firstRef?.product_url ?? product.shopee_url ?? firstStore?.link;
  const storeName = firstStore?.name ?? "Toko Online";

  return (
    <div className="hover-lift flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden bg-photo-frame">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={`${product.name} — BOXA.YK Yogyakarta`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">No image</div>
          )}
        </div>
        <div className="flex flex-col gap-1 p-3 pb-1">
          {product.brand && <span className="text-xs text-muted">{product.brand}</span>}
          <h3 className="line-clamp-2 text-sm font-semibold text-ink">{product.name}</h3>

          <div className="pt-1">
            {hasPrice(product.price) ? (
              <span className="font-display text-base font-bold text-accent">{formatIDR(product.price)}</span>
            ) : (
              <MysteryPrice />
            )}
          </div>
        </div>
      </Link>

      {storeUrl && (
        <div className="px-3 pb-3 pt-1">
          <a
            href={storeUrl}
            target="_blank"
            rel="noreferrer"
            className="animate-wiggle flex items-center justify-center gap-2 rounded-full bg-flame px-3 py-2 text-xs font-semibold text-on-brand shadow-sm transition-colors hover:bg-flame-light"
          >
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              {firstStore?.logo_url ? (
                <Image src={firstStore.logo_url} alt="" fill sizes="20px" className="object-contain p-0.5" />
              ) : (
                <ShoppingBag size={11} className="text-flame" />
              )}
            </span>
            <span className="truncate">Beli melalui {storeName}</span>
            <ArrowRight size={13} className="shrink-0" />
          </a>
          {storeCount > 1 && (
            <p className="mt-1.5 text-center text-[10px] text-muted">+{storeCount - 1} pilihan toko lain</p>
          )}
        </div>
      )}
    </div>
  );
}
