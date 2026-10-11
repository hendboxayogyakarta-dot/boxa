import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, Tag } from "lucide-react";

/**
 * The homepage's persistent positioning block — shows regardless of
 * whether any banner has been uploaded (the banner carousel is separate,
 * purely visual, and never carries a heading — see BannerCarousel). This
 * is where the page's actual <h1> lives, unconditionally. "brandLine"
 * (e.g. "Original Toys, Local Prices.") is the tagline — shown, but never
 * as the h1 itself, so it doesn't compete with the SEO-facing heading.
 */
export function UspStrip({
  h1,
  brandLine,
  subtitle,
  primaryCtaText,
  primaryCtaHref,
}: {
  h1: string;
  brandLine: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-2 pt-6 sm:px-6 sm:pt-8">
      <div className="relative overflow-hidden rounded-3xl bg-maroon-deep px-5 py-7 text-on-brand sm:px-10 sm:py-10">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-flame/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-ember/15 blur-3xl" />

        <div className="relative max-w-2xl">
          <p className="inline-flex items-center rounded-full bg-on-brand/10 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-ember sm:text-sm">
            {brandLine}
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-5xl">{h1}</h1>
          <p className="mt-3 max-w-xl text-sm text-on-brand/80 sm:text-base">{subtitle}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={primaryCtaHref}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-flame px-6 text-sm font-bold text-on-brand shadow-lg transition-colors hover:bg-flame-light"
            >
              {primaryCtaText}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
            <li className="inline-flex items-center gap-1.5 rounded-full bg-on-brand/10 px-3 py-1.5">
              <BadgeCheck size={14} className="text-ember" /> Original & dicek
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-on-brand/10 px-3 py-1.5">
              <MapPin size={14} className="text-ember" /> COD Yogyakarta
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-on-brand/10 px-3 py-1.5">
              <Tag size={14} className="text-ember" /> Harga Lokal hemat
            </li>
          </ul>
        </div>
      </div>

      <nav aria-label="Pencarian populer" className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
        <span className="py-1.5 text-muted">Populer:</span>
        <Link href="/mainan-murah-jogja" className="rounded-full border border-line bg-white px-3.5 py-1.5 font-semibold text-ink-soft transition-colors hover:border-flame hover:text-flame">
          Mainan murah Jogja
        </Link>
        <Link href="/blokees-jogja" className="rounded-full border border-line bg-white px-3.5 py-1.5 font-semibold text-ink-soft transition-colors hover:border-flame hover:text-flame">
          Blokees Jogja
        </Link>
        <Link href="/shop?local=1" className="rounded-full border border-line bg-white px-3.5 py-1.5 font-semibold text-ink-soft transition-colors hover:border-flame hover:text-flame">
          COD Local
        </Link>
      </nav>
    </section>
  );
}
