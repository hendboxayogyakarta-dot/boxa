"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

/**
 * `shuffle` reorders the products client-side, after hydration — the
 * server/cached HTML still renders the original (e.g. newest-first)
 * order so there's no hydration mismatch, then a client-only effect
 * re-shuffles it. That means a different order on every page load
 * (every refresh re-runs this component from scratch) without needing
 * to skip the page's server-side cache or hit Supabase more often —
 * the underlying data is identical, just displayed in a different order.
 */
export function ProductRail({
  title,
  subtitle,
  products,
  viewAllHref,
  shuffle = false,
}: {
  title: string;
  subtitle?: string | null;
  products: Product[];
  viewAllHref?: string;
  shuffle?: boolean;
}) {
  const [items, setItems] = useState(products);

  useEffect(() => {
    if (!shuffle) return;
    setItems([...products].sort(() => Math.random() - 0.5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffle]);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="hidden items-center gap-1 text-sm font-semibold text-accent hover:text-flame sm:inline-flex"
          >
            Lihat semua <ArrowRight size={15} />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
