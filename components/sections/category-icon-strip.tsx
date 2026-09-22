import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";

export function CategoryIconStrip({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="flex gap-4 overflow-x-auto pb-1 sm:grid sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/shop?category=${c.slug}`}
            className="flex shrink-0 flex-col items-center gap-1.5 text-center sm:shrink"
          >
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-line bg-cream-warm">
              {c.image_url ? (
                <Image src={c.image_url} alt={c.name} fill sizes="56px" className="object-cover" />
              ) : (
                <span className="font-display text-lg font-bold text-maroon">{c.name.charAt(0)}</span>
              )}
            </div>
            <span className="w-16 text-xs text-ink-soft">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
