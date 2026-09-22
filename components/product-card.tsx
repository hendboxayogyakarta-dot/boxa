import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatIDR } from "@/lib/utils";
import { ProductBadges } from "./badges";

export function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.images.find((i) => i.is_primary) ?? product.images[0];
  const soldOut = product.stock_status === "sold_out";
  const hasLocalPrice = product.local_price != null;
  const savings = hasLocalPrice ? product.price - product.local_price! : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="hover-lift group flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-warm">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={product.name}
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
        {hasLocalPrice && savings > 0 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-flame px-2 py-1 text-[10px] font-bold text-cream shadow-sm">
            <Tag size={10} />
            Hemat {formatIDR(savings)}
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
              Harga Lokal — Yogyakarta
            </span>
            <div className="font-display text-base font-bold text-maroon">
              {formatIDR(product.local_price!)}
            </div>
            <div className="text-xs text-muted">
              Online <span className="line-through">{formatIDR(product.price)}</span>
            </div>
          </div>
        ) : (
          <div className="mt-auto flex items-baseline gap-2 pt-1">
            <span className="font-display text-base font-bold text-maroon">
              {formatIDR(product.price)}
            </span>
            {product.compare_price && (
              <span className="text-xs text-muted line-through">
                {formatIDR(product.compare_price)}
              </span>
            )}
          </div>
        )}

        {product.sold_count > 0 && (
          <span className="text-xs text-muted">{product.sold_count} terjual</span>
        )}
      </div>
    </Link>
  );
}
