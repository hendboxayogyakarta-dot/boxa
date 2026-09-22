import Link from "next/link";
import Image from "next/image";
import type { HeroSettings } from "@/lib/types";
import type { Product } from "@/lib/types";

export function Hero({ hero, spotlightProducts }: { hero: HeroSettings; spotlightProducts: Product[] }) {
  if (!hero.enabled) return null;

  return (
    <section className="relative overflow-hidden bg-maroon">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-flame/30 blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div className="relative z-10">
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] text-cream sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-md text-base text-cream/80">{hero.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={hero.cta_href}
              className="rounded-full bg-flame px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-flame-light"
            >
              {hero.cta_text}
            </Link>
            {hero.secondary_cta_text && (
              <Link
                href={hero.secondary_cta_href ?? "#"}
                className="rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                {hero.secondary_cta_text}
              </Link>
            )}
          </div>
        </div>

        <div className="relative z-10 hidden grid-cols-2 gap-3 md:grid">
          {spotlightProducts.slice(0, 4).map((p, i) => {
            const image = p.images[0];
            return (
              <div
                key={p.id}
                className="hover-lift relative aspect-square overflow-hidden rounded-2xl border-2 border-cream/20 bg-cream-warm shadow-xl"
                style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
              >
                {image && (
                  <Image src={image.url} alt={p.name} fill sizes="220px" className="object-cover" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
