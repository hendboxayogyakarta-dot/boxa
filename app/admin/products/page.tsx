import { getProducts } from "@/lib/data";
import { formatIDR, stockLabel } from "@/lib/utils";
import { Plus } from "lucide-react";

/**
 * TODO: this list and every mutation below (create/edit/duplicate/archive/
 * publish) needs to move onto real Supabase queries + Server Actions once
 * connected, guarded by the admin RLS policies in db/schema.sql. Right now
 * it just reads the shared mock/live data layer (lib/data.ts) read-only.
 */
export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Produk</h1>
        <button className="flex items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream">
          <Plus size={16} /> Tambah Produk
        </button>
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
                  <span className="rounded-full bg-cream-warm px-2 py-0.5 text-xs font-medium text-ink-soft">
                    {stockLabel(p.stock_status)}
                  </span>
                </td>
                <td className="px-4 py-3">{p.is_boxa_approved ? "✓" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
