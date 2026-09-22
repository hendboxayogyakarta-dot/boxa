import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllBrandsForAdmin, getAllCategoriesForAdmin } from "@/lib/data";
import { QuickAddProducts } from "@/components/admin/quick-add-products";

export default async function QuickAddProductsPage() {
  const [categories, brands] = await Promise.all([getAllCategoriesForAdmin(), getAllBrandsForAdmin()]);

  return (
    <div>
      <Link href="/admin/products" className="mb-2 flex items-center gap-1 text-xs font-medium text-muted hover:text-maroon">
        <ArrowLeft size={13} /> Kembali ke daftar produk
      </Link>
      <h1 className="font-display text-2xl font-bold text-ink">Tambah Cepat — Banyak Produk</h1>
      <p className="mt-1 max-w-xl text-sm text-muted">
        Isi beberapa produk sekaligus, cuma field yang penting. Progres tersimpan otomatis di
        browser ini (aman kalau ke-refresh atau ditutup) — belum masuk ke database sampai kamu
        klik &ldquo;Upload Semua&rdquo; di bawah. Butuh field lebih lengkap (deskripsi, pros/cons,
        beberapa foto)? Edit produknya lagi lewat halaman produk biasa setelah ini.
      </p>

      <div className="mt-6">
        <QuickAddProducts categories={categories} brands={brands} />
      </div>
    </div>
  );
}
