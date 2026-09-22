import { getProducts, getAllApprovedReviews } from "@/lib/data";
import { Eye, Flame, MousePointerClick, Package, Star } from "lucide-react";

export default async function AdminOverviewPage() {
  const [products, reviews] = await Promise.all([getProducts(), getAllApprovedReviews()]);

  const cards = [
    { label: "Total Produk", value: products.length, icon: Package },
    { label: "Produk Aktif", value: products.filter((p) => p.stock_status !== "sold_out").length, icon: Package },
    { label: "Produk Habis", value: products.filter((p) => p.stock_status === "sold_out").length, icon: Package },
    { label: "BOXA Approved", value: products.filter((p) => p.is_boxa_approved).length, icon: Flame },
    { label: "Total Ulasan", value: reviews.length, icon: Star },
    { label: "Total Dilihat", value: products.reduce((s, p) => s + p.view_count, 0), icon: Eye },
    { label: "Klik CTA (30 hari)", value: "—", icon: MousePointerClick, note: "Perlu Supabase analytics_events" },
    { label: "Produk Unggulan", value: products.filter((p) => p.is_featured).length, icon: Flame },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Ringkasan</h1>
      <p className="mt-1 text-sm text-muted">
        Data di bawah ini memakai data contoh (mock) sampai Supabase disambungkan — lihat README.md.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, note }) => (
          <div key={label} className="rounded-2xl border border-line bg-white p-4">
            <Icon size={18} className="text-flame" />
            <div className="mt-2 font-display text-2xl font-bold text-ink">{value}</div>
            <div className="text-xs text-muted">{label}</div>
            {note && <div className="mt-1 text-[10px] text-muted/70">{note}</div>}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-5">
          <h2 className="font-display text-base font-bold text-ink">Produk Terbaru</h2>
          <ul className="mt-3 divide-y divide-line">
            {products.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center justify-between py-2 text-sm">
                <span className="text-ink-soft">{p.name}</span>
                <span className="text-xs text-muted">{p.updated_at}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <h2 className="font-display text-base font-bold text-ink">Ulasan Terbaru</h2>
          <ul className="mt-3 divide-y divide-line">
            {reviews.slice(0, 5).map((r) => (
              <li key={r.id} className="flex items-center justify-between py-2 text-sm">
                <span className="text-ink-soft">{r.customer_name}</span>
                <span className="text-xs text-muted">{r.rating}★</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
