import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * The homepage's persistent positioning block — shows regardless of
 * whether any banner has been uploaded (the banner carousel is separate,
 * purely visual, and never carries a heading — see BannerCarousel). This
 * is where the page's actual <h1> lives: previously the H1 only existed
 * in the banner's empty-state fallback, so a real banner meant the
 * homepage had NO h1 at all. That's fixed by having it live here instead,
 * unconditionally. "brandLine" (e.g. "Original Toys, Local Prices.") is
 * the tagline — shown, but never as the h1 itself, so it doesn't compete
 * with the SEO-facing heading for that role.
 */
export function UspStrip({
  h1,
  brandLine,
  subtitle,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
}: {
  h1: string;
  brandLine: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-2 pt-6 sm:px-6 sm:pt-8">
      <div className="rounded-2xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7">
        <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">{h1}</h1>
        <p className="mt-1 font-display text-sm font-bold text-flame sm:text-base">{brandLine}</p>
        <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">{subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={primaryCtaHref}
            className="rounded-full bg-flame px-5 py-2.5 text-sm font-semibold text-on-brand hover:bg-flame-light"
          >
            {primaryCtaText}
          </Link>
          <Link
            href={secondaryCtaHref}
            className="flex items-center gap-1 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink-soft hover:border-maroon hover:text-accent"
          >
            {secondaryCtaText}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
