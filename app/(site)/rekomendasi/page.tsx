import { Flame } from "lucide-react";
import { getProducts } from "@/lib/data";
import { RecommendationProductCard } from "@/components/recommendation-product-card";

export const revalidate = 60;

export const metadata = {
  title: "Boxa Rekomendasi",
  description: "Pilihan affiliate BOXA — sudah dicek dan dikasih skor, tinggal pesan sendiri di marketplace.",
};

export default async function RekomendasiPage() {
  const products = await getProducts({ recommendationOnly: true, sort: "newest" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-flame">
        <Flame size={14} />
        Boxa Rekomendasi
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">Pilihan Affiliate BOXA</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Barang-barang ini bukan stok BOXA — kami cek dan kasih skor, lalu kamu pesan langsung di
        marketplace lewat link yang tersedia. Tidak ada opsi COD/ambil langsung untuk yang ini.
      </p>

      {products.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-white py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink">Belum ada rekomendasi</p>
          <p className="mt-1 text-sm text-muted">Cek lagi lain waktu ya.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <RecommendationProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
