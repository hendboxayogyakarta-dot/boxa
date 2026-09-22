import Link from "next/link";
import { getAllProductsForAdmin } from "@/lib/data";
import { formatIDR, stockLabel } from "@/lib/utils";
import { deleteProduct, toggleProductStatus } from "@/lib/actions/products";
import { Plus, Pencil, Zap } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await getAllProductsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Produk</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/quick-add"
            className="flex items-center gap-1.5 rounded-full border border-maroon px-4 py-2 text-sm font-semibold text-maroon"
          >
            <Zap size={16} /> Tambah Cepat
          </Link>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream"
          >
            <Plus size={16} /> Tambah Produk
          </Link>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-warm text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Produk</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Harga</th>
              <th className="px-4 py-3 font-medium">Stok</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Approved</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-cream-warm/50">
                <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                <td className="px-4 py-3 text-muted">{p.sku}</td>
                <td className="px-4 py-3 text-ink-soft">{formatIDR(p.price)}</td>
                <td className="px-4 py-3 text-ink-soft">{p.stock_quantity}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.status === "published"
                        ? "bg-flame/10 text-flame"
                        : "bg-cream-warm text-ink-soft"
                    }`}
                  >
                    {p.status === "published" ? "Tayang" : p.status === "archived" ? "Diarsipkan" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">{p.is_boxa_approved ? "✓" : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/products/${p.id}/edit`} className="text-ink-soft hover:text-maroon" title="Edit">
                      <Pencil size={15} />
                    </Link>
                    <form action={toggleProductStatus}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="status" value={p.status === "published" ? "draft" : "published"} />
                      <button type="submit" className="text-xs font-semibold text-ink-soft hover:text-maroon">
                        {p.status === "published" ? "Sembunyikan" : "Tayangkan"}
                      </button>
                    </form>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className="text-xs font-semibold text-coral hover:text-coral/70">
                        Hapus
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-muted">
                  Belum ada produk. Klik &ldquo;Tambah Produk&rdquo; untuk mulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
