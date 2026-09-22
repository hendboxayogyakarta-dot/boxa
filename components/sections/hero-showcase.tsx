"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { HeroSettings, Product } from "@/lib/types";
import { formatIDR } from "@/lib/utils";
import { ProductBadges } from "@/components/badges";

export function HeroShowcase({
  hero,
  products,
}: {
  hero: HeroSettings;
  products: Product[];
}) {
  const [active, setActive] = useState(0);
  if (!hero.enabled || products.length === 0) return null;

  const slides = products.slice(0, 4);
  const current = slides[active];

  return (
    <section className="relative overflow-hidden bg-maroon">
      <div aria-hidden className="site-glow pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-flame/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-14 sm:px-6 md:grid-cols-2 md:py-20">
        {/* Copy */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="inline-flex items-center rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ember">
                {hero.badge}
              </span>

              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] text-cream sm:text-5xl">
                {current.name}
              </h1>
              <p className="mt-4 max-w-md text-base text-cream/80">{current.short_description}</p>

              <div className="mt-4 font-display text-2xl font-bold text-ember">
                {formatIDR(current.price)}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={current.whatsapp_url ?? hero.cta_href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-flame-light"
                >
                  <MessageCircle size={16} />
                  {hero.cta_text}
                </a>
                {hero.secondary_cta_text && (
                  <Link
                    href={hero.secondary_cta_href ?? "#"}
                    className="rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
                  >
                    {hero.secondary_cta_text}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image + slide nav */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border-2 border-cream/20 bg-cream-warm shadow-xl"
            >
              {current.images[0] && (
                <Image src={current.images[0].url} alt={current.name} fill sizes="380px" className="object-cover" />
              )}
              <div className="absolute left-3 top-3">
                <ProductBadges product={current} />
              </div>
            </motion.div>
          </AnimatePresence>

          {slides.length > 1 && (
            <div className="mt-4 flex justify-center gap-2 md:absolute md:-right-2 md:top-1/2 md:mt-0 md:flex-col md:-translate-y-1/2">
              {slides.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  aria-label={`Lihat ${p.name}`}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? "w-6 bg-ember" : "w-2 bg-cream/30 hover:bg-cream/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating showcase cards */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible">
          {slides.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`hover-lift group flex min-w-[210px] shrink-0 items-center gap-3 rounded-2xl border bg-cream p-2.5 text-left md:min-w-0 ${
                i === active ? "border-flame" : "border-transparent"
              }`}
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream-warm">
                {p.images[0] && (
                  <Image src={p.images[0].url} alt={p.name} fill sizes="56px" className="object-cover transition-transform duration-300 group-hover:scale-110" />
                )}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-ink">{p.name}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  {p.is_secret ? "Secret" : p.is_rare ? "Rare" : p.category?.name ?? "Collectible"}
                </div>
                <div className="text-sm font-bold text-maroon">{formatIDR(p.price)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
