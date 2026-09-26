import { Link2 } from "lucide-react";
import { getProducts, getSiteSettings } from "@/lib/data";
import { StoreReferenceCard } from "@/components/store-reference-card";

export const revalidate = 60;

export const metadata = {
  title: "Pilihan Online",
  description: "Mainan bagus yang belum ada stok fisiknya di BOXA — cek langsung di toko online yang tersedia.",
};

/**
 * NOT a "recommended products" ranking — this page exists purely because
 * BOXA doesn't physically stock these yet, not because they're somehow
 * better than what BOXA does stock. Was "Temukan Online" (implied BOXA
 * actively searches on the customer's behalf); renamed to match how
 * these links actually work — BOXA already picked out good toys and is
 * just pointing at where to get them, no active searching involved.
 * Same underlying query as before (offline_available = false).
 */
export default async function PilihanOnlinePage() {
  const [products, settings] = await Promise.all([
    getProducts({ recommendationOnly: true, sort: "newest" }),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-flame">
        <Link2 size={14} />
        Pilihan Online
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">Mainan bagus, belum ada stoknya di BOXA.</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">{settings.copy.rekomendasi_intro}</p>

      {products.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-white py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink">Belum ada produk di sini</p>
          <p className="mt-1 text-sm text-muted">Cek lagi lain waktu ya.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <StoreReferenceCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
