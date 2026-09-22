import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatIDR } from "@/lib/utils";
import { ProductBadges } from "./badges";

export function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.images.find((i) => i.is_primary) ?? product.images[0];
  const soldOut = product.stock_status === "sold_out";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="hover-lift group flex flex-col overflow-hidden rounded-2xl border border-site-border bg-site-surface transition-colors hover:border-flame/50"
    >
      <div className="relative aspect-square overflow-hidden bg-site-bg-raised">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              soldOut ? "grayscale-[40%] opacity-60" : ""
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-site-text-faint">No image</div>
        )}
        <div className="absolute left-2 top-2">
          <ProductBadges product={product} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        {product.brand && (
          <span className="text-xs text-site-text-faint">{product.brand}</span>
        )}
        <h3 className="line-clamp-2 text-sm font-semibold text-site-text">{product.name}</h3>
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="font-display text-base font-bold text-flame">
            {formatIDR(product.price)}
          </span>
          {product.compare_price && (
            <span className="text-xs text-site-text-faint line-through">
              {formatIDR(product.compare_price)}
            </span>
          )}
        </div>
        {product.sold_count > 0 && (
          <span className="text-xs text-site-text-faint">{product.sold_count} terjual</span>
        )}
      </div>
    </Link>
  );
}
