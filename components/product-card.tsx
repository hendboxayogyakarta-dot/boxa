import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { cn, formatIDR, hasPrice, isRecommendationProduct, savingsPercent } from "@/lib/utils";
import { ProductBadges } from "./badges";
import { MysteryPrice } from "./mystery-price";
import { StoreReferenceCard } from "./store-reference-card";
import { CodLocalBadge } from "./cod-local-badge";

export function ProductCard({ product }: { product: Product }) {
  // Affiliate/no-local-stock products get their own card treatment
  // (store logo + a wiggling "Beli melalui ..." button)
  // wherever they show up — homepage rails, shop grid, related products,
  // not just the dedicated Pilihan Online page — so there's one single
  // place that defines what an affiliate card looks like.
  if (isRecommendationProduct(product)) {
    return <StoreReferenceCard product={product} />;
  }

  const primaryImage = product.images.find((i) => i.is_primary) ?? product.images[0];
  const soldOut = product.stock_status === "sold_out";
  const hasLocalPrice = product.local_price != null;
  const savingsPct = hasLocalPrice ? savingsPercent(product.price, product.local_price!) : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "hover-lift group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm",
        // Local/COD products get a flame border + slow pulsing halo so
        // they stand out in a grid of otherwise plain cards.
        hasLocalPrice ? "animate-glow border-2 border-flame" : "border border-line"
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-photo-frame">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={`${product.name} — BOXA.YK Yogyakarta`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              soldOut ? "grayscale-[40%] opacity-70" : ""
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">No image</div>
        )}
        <div className="absolute left-2 top-2">
          <ProductBadges product={product} />
        </div>
        {product.brand_logo?.logo_url && (
          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-line bg-white shadow-sm">
            <Image src={product.brand_logo.logo_url} alt={product.brand_logo.name} fill sizes="28px" className="object-contain p-0.5" />
          </span>
        )}
        {hasLocalPrice && savingsPct > 0 && (
          <div className="absolute bottom-2 right-2 flex flex-col items-center rounded-xl bg-flame px-3 py-1.5 leading-none text-on-brand shadow-lg">
            <span className="font-display text-2xl font-extrabold">{savingsPct}%</span>
            <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide">lebih murah</span>
          </div>
        )}
        {hasLocalPrice && (
          <div className="absolute bottom-2 left-2">
            <CodLocalBadge />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        {product.brand && (
          <span className="text-xs text-muted">{product.brand}</span>
        )}
        <h3 className="line-clamp-2 text-sm font-semibold text-ink">{product.name}</h3>

        {hasLocalPrice ? (
          <div className="mt-auto pt-1">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-flame">
              BOXA Local Price
            </span>
            <div className="font-display text-base font-bold text-accent">
              {formatIDR(product.local_price!)}
            </div>
            <div className="text-xs text-muted">
              Online <span className="line-through">{formatIDR(product.price)}</span>
            </div>
          </div>
        ) : (
          <div className="mt-auto flex items-baseline gap-2 pt-1">
            {hasPrice(product.price) ? (
              <>
                <span className="font-display text-base font-bold text-accent">
                  {formatIDR(product.price)}
                </span>
                {product.compare_price && (
                  <span className="text-xs text-muted line-through">
                    {formatIDR(product.compare_price)}
                  </span>
                )}
              </>
            ) : (
              <MysteryPrice />
            )}
          </div>
        )}

        {product.sold_count > 0 && (
          <span className="text-xs text-muted">
            <span className="font-semibold text-ink-soft">{product.sold_count}</span> terjual
          </span>
        )}
      </div>
    </Link>
  );
}
