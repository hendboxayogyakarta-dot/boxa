import { RatingStars } from "@/components/rating-stars";
import { Truck } from "lucide-react";
import type { Review, SiteSettings } from "@/lib/types";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h2 className="font-display text-2xl font-bold text-ink">Kata Mereka</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-line bg-white p-5">
            <RatingStars rating={r.rating} />
            <p className="mt-3 text-sm text-ink-soft">{r.review}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted">
              <span className="font-semibold text-ink">{r.customer_name}</span>
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
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
      <div className="relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl bg-maroon px-6 py-8 text-on-brand sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-flame/25 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <Truck size={20} />
            {settings.delivery.service_area}
          </div>
          <p className="mt-2 max-w-md text-sm text-on-brand/80">{settings.delivery.notes}</p>
        </div>
        <a
          href={`https://wa.me/${settings.whatsapp_number}`}
          className="relative z-10 whitespace-nowrap rounded-full bg-cream px-6 py-3 text-sm font-semibold text-maroon"
        >
          Tanya Ongkir
        </a>
      </div>
    </section>
  );
}
