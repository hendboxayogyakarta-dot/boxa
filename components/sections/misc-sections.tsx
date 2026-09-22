import Link from "next/link";
import { CheckCircle2, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import type { Category, Review, SiteSettings } from "@/lib/types";
import { RatingStars } from "@/components/rating-stars";

export function CategoriesGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h2 className="font-display text-2xl font-bold text-ink">Jelajahi Kategori</h2>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/shop?category=${c.slug}`}
            className="hover-lift flex flex-col items-center gap-2 rounded-2xl border border-line bg-white p-5 text-center"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-warm text-maroon">
              <span className="font-display text-lg font-bold">{c.name.charAt(0)}</span>
            </div>
            <span className="text-sm font-semibold text-ink">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

const WHY_BOXA = [
  { icon: ShieldCheck, title: "Dicek Dulu", text: "Setiap produk kami periksa kondisinya sebelum ditawarkan ke kamu." },
  { icon: CheckCircle2, title: "Informasi Jujur", text: "Kalau ada minus, kami tulis. Nggak ada yang ditutup-tutupi." },
  { icon: MessageCircle, title: "Gampang Ditanya", text: "Masih bingung pilih yang mana? Tanya aja, kami bantu jawab." },
  { icon: Truck, title: "Antar Yogyakarta", text: "Pengiriman lokal cepat untuk area Yogyakarta." },
];

export function WhyBoxa() {
  return (
    <section className="bg-cream-warm py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-ink">Kenapa BOXA</h2>
        <p className="mt-1 max-w-lg text-sm text-muted">
          &ldquo;Nggak semua barang layak masuk BOXA.&rdquo; Ini yang kami pegang tiap kali kurasi produk.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_BOXA.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-line bg-white p-5">
              <Icon className="text-flame" size={22} />
              <h3 className="mt-3 font-display text-base font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <div className="flex flex-col items-start gap-4 rounded-3xl bg-maroon px-6 py-8 text-cream sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <Truck size={20} />
            {settings.delivery.service_area}
          </div>
          <p className="mt-2 max-w-md text-sm text-cream/80">{settings.delivery.notes}</p>
        </div>
        <a
          href={`https://wa.me/${settings.whatsapp_number}`}
          className="whitespace-nowrap rounded-full bg-cream px-6 py-3 text-sm font-semibold text-maroon"
        >
          Tanya Ongkir
        </a>
      </div>
    </section>
  );
}
