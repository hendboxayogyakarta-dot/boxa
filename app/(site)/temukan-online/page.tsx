import { Compass } from "lucide-react";
import { getProducts, getSiteSettings } from "@/lib/data";
import { StoreReferenceCard } from "@/components/store-reference-card";

export const revalidate = 60;

export const metadata = {
  title: "Temukan Online",
  description: "Belum tersedia untuk pembelian lokal? Temukan produk yang kamu cari lewat pilihan toko online yang tersedia.",
};

/**
 * NOT a "recommended products" page — see the brief this responds to
 * (section 9): "Temukan Online" must never read as "these are BOXA's
 * picks, unlike everything else." It's purely a discovery aid for
 * products that aren't available for local pickup at BOXA yet, pointing
 * to where else they can be found. Same underlying query as before
 * (offline_available = false), just reframed copy + route.
 */
export default async function TemukanOnlinePage() {
  const [products, settings] = await Promise.all([
    getProducts({ recommendationOnly: true, sort: "newest" }),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-flame">
        <Compass size={14} />
        Temukan Online
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">Belum ada di BOXA? Kami bantu kamu menemukannya.</h1>
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
