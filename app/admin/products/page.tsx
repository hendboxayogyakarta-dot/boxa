import Link from "next/link";
import { getAllProductsForAdmin } from "@/lib/data";
import { ProductList } from "@/components/admin/product-list";
import { Plus, Zap } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await getAllProductsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-ink">Produk</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/quick-add"
            className="hidden items-center gap-1.5 rounded-full border border-maroon px-4 py-2 text-sm font-semibold text-maroon md:flex"
          >
            <Zap size={16} /> Tambah Cepat
          </Link>
          <Link
            href="/admin/products/new"
            className="flex h-11 items-center gap-1.5 rounded-full bg-maroon px-4 text-sm font-semibold text-cream md:h-auto md:py-2"
          >
            <Plus size={16} /> Produk Baru
          </Link>
        </div>
      </div>
      <ProductList products={products} />
    </div>
  );
}
