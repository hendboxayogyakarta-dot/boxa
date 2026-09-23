import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import type { Product } from "@/lib/types";

/**
 * Deliberately different from the compact <ProductCard> used in the
 * regular shop/homepage grids — there, a recommendation item is one of
 * many products with real prices, so its badge stays small and out of
 * the way. Here, EVERY card on the page is a recommendation, so the
 * score gets to be the headline instead of a small tag.
 */
export function RecommendationProductCard({ product }: { product: Product }) {
  const primaryImage = product.images.find((i) => i.is_primary) ?? product.images[0];
  const label = product.recommendation_note || "Rekomendasi BOXA";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="hover-lift group flex flex-col overflow-hidden rounded-3xl border border-line bg-white"
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
        {product.boxa_score != null && (
          <div className="absolute right-3 top-3 flex flex-col items-center justify-center rounded-2xl bg-flame px-2.5 py-1.5 text-on-brand shadow-md">
            <span className="font-display text-lg font-extrabold leading-none">{product.boxa_score.toFixed(1)}</span>
            <span className="text-[9px] font-semibold uppercase tracking-wide leading-none">Skor</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.brand && <span className="text-xs text-muted">{product.brand}</span>}
        <h3 className="line-clamp-2 font-display text-base font-bold text-ink">{product.name}</h3>
        <p className="line-clamp-2 text-xs text-muted">{product.short_description}</p>
        <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-bold text-flame">
          <Flame size={15} />
          {label}
        </div>
      </div>
    </Link>
  );
}
