import Link from "next/link";
import Image from "next/image";
import type { Brand } from "@/lib/types";

export function BrandStrip({ brands }: { brands: Brand[] }) {
  if (brands.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h2 className="font-display text-xl font-bold text-ink">Jelajahi Brand & Lisensi</h2>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
        {brands.map((b) => (
          <Link
            key={b.id}
            href={`/shop?brand=${b.slug}`}
            className="hover-lift flex shrink-0 items-center gap-2 rounded-full border border-line bg-white py-2 pl-2 pr-4"
          >
            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream-warm">
              {b.logo_url ? (
                <Image src={b.logo_url} alt={b.name} fill sizes="32px" className="object-contain p-1" />
              ) : (
                <span className="font-display text-sm font-bold text-maroon">{b.name.charAt(0)}</span>
              )}
            </span>
            <span className="text-sm font-medium text-ink">{b.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
