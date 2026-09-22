import { RatingStars } from "@/components/rating-stars";
import { Truck } from "lucide-react";
import type { Review, SiteSettings } from "@/lib/types";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
      <h2 className="font-display text-2xl font-bold text-site-text sm:text-3xl">Kata Mereka</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-site-border bg-site-surface p-5">
            <RatingStars rating={r.rating} />
            <p className="mt-3 text-sm text-site-text-muted">{r.review}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-site-text-faint">
              <span className="font-semibold text-site-text">{r.customer_name}</span>
              {r.verified_purchase && <span>· Pembelian terverifikasi</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DeliveryBanner({ settings }: { settings: SiteSettings }) {
  if (!settings.delivery.enabled) return null;
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-8">
      <div className="relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl border border-site-border bg-gradient-to-br from-maroon to-maroon-deep px-6 py-8 text-site-text sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-flame/25 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <Truck size={20} className="text-flame" />
            {settings.delivery.service_area}
          </div>
          <p className="mt-2 max-w-md text-sm text-site-text/80">{settings.delivery.notes}</p>
        </div>
        <a
          href={`https://wa.me/${settings.whatsapp_number}`}
          className="relative z-10 whitespace-nowrap rounded-full bg-flame px-6 py-3 text-sm font-bold uppercase tracking-wide text-site-bg"
        >
          Tanya Ongkir
        </a>
      </div>
    </section>
  );
}
