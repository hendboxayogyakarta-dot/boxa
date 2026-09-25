import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";

/**
 * The homepage's persistent positioning statement — shows regardless of
 * whether any banner has been uploaded yet (the banner carousel is
 * separate, visual-only). This is where "Original Toys, Local Prices"
 * and the two primary CTAs (browse / find a local price) always live.
 */
export function UspStrip({
  tagline,
  subtitle,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
}: {
  tagline: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-2 pt-1 sm:px-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-flame/10 text-flame">
            <Flame size={17} />
          </span>
          <div>
            <div className="font-display text-sm font-bold text-ink sm:text-base">{tagline}</div>
            <p className="text-xs text-muted sm:text-sm">{subtitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 pl-12 sm:pl-0">
          <Link
            href={primaryCtaHref}
            className="rounded-full bg-flame px-4 py-2 text-xs font-semibold text-on-brand hover:bg-flame-light"
          >
            {primaryCtaText}
          </Link>
          <Link
            href={secondaryCtaHref}
            className="flex items-center gap-1 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink-soft hover:border-maroon hover:text-accent"
          >
            {secondaryCtaText}
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
