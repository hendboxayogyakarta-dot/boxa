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
  const category = current.category?.name ?? "";

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="site-glow pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-maroon/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 px-5 pb-8 pt-12 sm:px-8 sm:pt-16 md:grid-cols-2 md:gap-4 md:pt-20">
        {/* Left: copy */}
        <div className="relative z-10 order-2 md:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-flame/40 bg-flame/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-flame">
                {hero.badge}
              </span>

              <h1 className="mt-4 font-display text-[2.6rem] font-extrabold uppercase leading-[0.95] tracking-tight text-site-text sm:text-6xl">
                {current.brand ?? category}
                <br />
                <span className="text-flame">{current.series ?? current.name.split(" ").slice(0, 2).join(" ")}</span>
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-site-text-muted">
                {current.short_description}
              </p>

              <div className="mt-5 font-display text-2xl font-bold text-site-text">
                {formatIDR(current.price)}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={current.whatsapp_url ?? hero.cta_href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold uppercase tracking-wide text-site-bg shadow-[0_0_24px_-4px_theme(colors.flame)] transition-transform hover:scale-[1.03]"
                >
                  <MessageCircle size={16} />
                  {hero.cta_text}
                </a>
                {hero.secondary_cta_text && (
                  <Link
                    href={hero.secondary_cta_href ?? "#"}
                    className="text-xs font-semibold uppercase tracking-widest text-site-text-muted underline decoration-site-border underline-offset-4 hover:text-site-text"
                  >
                    {hero.secondary_cta_text}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: product image */}
        <div className="relative order-1 z-10 md:order-2">
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-flame/25 via-ember/10 to-transparent blur-2xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative mx-auto aspect-square w-full max-w-md"
            >
              {current.images[0] && (
                <Image
                  src={current.images[0].url}
                  alt={current.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 480px"
                  priority
                  className="rounded-[2rem] object-cover shadow-2xl"
                />
              )}
              <div className="absolute left-3 top-3">
                <ProductBadges product={current} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right-side numbered slide nav */}
          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex">
            {slides.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                aria-label={`Lihat ${p.name}`}
                className={`flex items-center gap-2 text-xs font-semibold transition-colors ${
                  i === active ? "text-flame" : "text-site-text-faint hover:text-site-text-muted"
                }`}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className={`h-px w-5 bg-current transition-all ${i === active ? "w-8" : ""}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating product showcase cards */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-14 sm:px-8">
        <div className="-mt-2 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
          {slides.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`group flex min-w-[220px] shrink-0 items-center gap-3 rounded-2xl border bg-site-surface/70 p-3 text-left backdrop-blur transition-all hover:-translate-y-1 md:min-w-0 ${
                i === active ? "border-flame/60" : "border-site-border"
              }`}
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-site-bg-raised">
                {p.images[0] && (
                  <Image
                    src={p.images[0].url}
                    alt={p.name}
                    fill
                    sizes="64px"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-site-text">{p.name}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-site-text-faint">
                  {p.is_secret ? "Secret" : p.is_rare ? "Rare" : p.category?.name ?? "Collectible"}
                </div>
                <div className="mt-0.5 text-sm font-bold text-flame">{formatIDR(p.price)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
