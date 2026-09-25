import Image from "next/image";
import { addProductStore, removeProductStore } from "@/lib/actions/product-stores";
import type { Product, Store } from "@/lib/types";
import { formatIDR } from "@/lib/utils";

const inputClass =
  "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-maroon";

/**
 * Lets an admin attach several stores to one product, each with its own
 * link and price — this is what powers the "Pilihan Online" section on
 * the product page. Only shown on the edit page (a product needs an id
 * to have store references at all, so this isn't part of the create form).
 */
export function ProductStoreRefs({ product, stores }: { product: Product; stores: Store[] }) {
  const linked = product.store_refs ?? [];
  const linkedStoreIds = new Set(linked.map((r) => r.store_id));
  const availableStores = stores.filter((s) => !linkedStoreIds.has(s.id));

  return (
    <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
      <div>
        <h2 className="font-display text-base font-bold text-ink">Tempat Beli / Pilihan Online</h2>
        <p className="text-xs text-muted">
          Hubungkan produk ini ke toko yang sudah tersimpan di menu Store Reference — tidak perlu
          isi ulang nama/logo. Ini yang muncul sebagai &ldquo;Pilihan Online&rdquo; di halaman produk.
        </p>
      </div>

      {linked.length > 0 && (
        <div className="space-y-2">
          {linked.map((ref) => (
            <div key={ref.id} className="flex items-center gap-3 rounded-xl border border-line p-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cream-warm">
                {ref.store?.logo_url ? (
                  <Image src={ref.store.logo_url} alt={ref.store.name} fill sizes="40px" className="object-contain" />
                ) : (
                  <span className="font-display text-sm font-bold text-maroon">{ref.store?.name?.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-ink">{ref.store?.name ?? "(toko dihapus)"}</div>
                <div className="truncate text-xs text-muted">
                  {ref.price != null ? formatIDR(ref.price) : "Harga belum diisi"}
                  {ref.product_url && <> · {ref.product_url}</>}
                </div>
              </div>
              <form action={removeProductStore}>
                <input type="hidden" name="id" value={ref.id} />
                <input type="hidden" name="product_id" value={product.id} />
                <button type="submit" className="text-xs font-semibold text-coral hover:text-coral/70">Hapus</button>
              </form>
            </div>
          ))}
        </div>
      )}

      {availableStores.length > 0 ? (
        <form action={addProductStore} className="grid gap-2 rounded-xl border border-dashed border-line p-3 sm:grid-cols-4">
          <input type="hidden" name="product_id" value={product.id} />
          <select name="store_id" required className={`${inputClass} mt-0 sm:col-span-1`}>
            <option value="">Pilih toko...</option>
            {availableStores.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <input name="product_url" placeholder="Link produk di toko ini" className={`${inputClass} mt-0 sm:col-span-2`} />
          <input type="number" name="price" min={0} placeholder="Harga (opsional)" className={`${inputClass} mt-0`} />
          <button type="submit" className="rounded-lg bg-maroon px-3 py-2 text-xs font-semibold text-cream sm:col-span-4">
            Tambahkan
          </button>
        </form>
      ) : (
        stores.length === 0 && (
          <p className="text-xs text-muted">
            Belum ada toko tersimpan. Tambah dulu lewat menu <strong>Store Reference</strong> di sidebar.
          </p>
        )
      )}
    </section>
  );
}
