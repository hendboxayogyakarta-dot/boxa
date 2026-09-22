import Link from "next/link";
import Image from "next/image";
import type { Category, Product } from "@/lib/types";

export function CategoryShowcase({
  categories,
  productsByCategory,
}: {
  categories: Category[];
  productsByCategory: Map<string, Product>;
}) {
  const top = categories.slice(0, 5);
  if (top.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h2 className="font-display text-2xl font-bold text-ink">Jelajahi Kategori</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3 md:grid-rows-2">
        {top.map((c, i) => {
          const sample = productsByCategory.get(c.id);
          const big = i === 0;
          return (
            <Link
              key={c.id}
              href={`/shop?category=${c.slug}`}
              className={`hover-lift group relative flex min-h-[180px] items-end overflow-hidden rounded-3xl border border-line bg-cream-warm ${
                big ? "md:col-span-2 md:row-span-2 md:min-h-[400px]" : "md:min-h-[190px]"
              }`}
            >
              {sample?.images[0] && (
                <Image
                  src={sample.images[0].url}
                  alt={c.name}
                  fill
                  sizes={big ? "60vw" : "30vw"}
                  className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="relative z-10 p-5">
                <h3 className={`font-display font-extrabold text-cream ${big ? "text-3xl" : "text-xl"}`}>
                  {c.name}
                </h3>
                <p className="mt-1 max-w-xs text-xs text-cream/80">{c.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
