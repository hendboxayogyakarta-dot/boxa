import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllBrandsForAdmin, getAllCategoriesForAdmin, getAllMarketplacesForAdmin } from "@/lib/data";
import { QuickAddProducts } from "@/components/admin/quick-add-products";

export default async function QuickAddProductsPage() {
  const [categories, brands, marketplaces] = await Promise.all([
    getAllCategoriesForAdmin(),
    getAllBrandsForAdmin(),
    getAllMarketplacesForAdmin(),
  ]);

  return (
    <div>
      <Link href="/admin/products" className="mb-2 flex items-center gap-1 text-xs font-medium text-muted hover:text-maroon">
        <ArrowLeft size={13} /> Kembali ke daftar produk
      </Link>
      <h1 className="font-display text-2xl font-bold text-ink">Tambah Cepat — Banyak Produk</h1>
      <p className="mt-1 max-w-xl text-sm text-muted">
        Isi beberapa produk sekaligus, cuma field yang penting. Pilih mode <strong>Produk Biasa</strong> (COD/lokal, isi harga)
        atau <strong>Rekomendasi/Affiliate</strong> (isi link + skor, tanpa harga) di atas. Progres
        tersimpan otomatis di browser ini (aman kalau ke-refresh) — belum masuk database sampai
        klik &ldquo;Upload Semua&rdquo;. Butuh field lebih lengkap nanti? Edit lagi lewat halaman
        produk biasa.
      </p>

      <div className="mt-6">
        <QuickAddProducts categories={categories} brands={brands} marketplaces={marketplaces} />
      </div>
    </div>
  );
}
