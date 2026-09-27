import Image from "next/image";
import { addProductLicense, removeProductLicense } from "@/lib/actions/product-licenses";
import type { Brand, Product } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-maroon";

/**
 * A product can carry more than one license (a crossover figure, say) —
 * this is separate from the single brand_id/"Brand & Lisensi" field on
 * the main form below, which still drives the shop's brand filter and
 * the small corner badge on cards. This section is purely about which
 * license logos show in a row on the product page.
 */
export function ProductLicenses({ product, brands }: { product: Product; brands: Brand[] }) {
  const linked = product.licenses ?? [];
  const linkedBrandIds = new Set(linked.map((l) => l.brand_id));
  const availableBrands = brands.filter((b) => !linkedBrandIds.has(b.id));

  return (
    <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
      <div>
        <h2 className="font-display text-base font-bold text-ink">Logo Lisensi</h2>
        <p className="text-xs text-muted">
          Produk bisa punya lebih dari satu lisensi (misalnya figure crossover) — semua logo yang
          ditambahkan di sini tampil berjejer di halaman produk.
        </p>
      </div>

      {linked.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {linked.map((l) => (
            <div key={l.id} className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3">
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-photo-frame">
                {l.brand?.logo_url ? (
                  <Image src={l.brand.logo_url} alt={l.brand.name} fill sizes="28px" className="object-contain p-1" />
                ) : (
                  <span className="text-[10px] font-bold text-maroon">{l.brand?.name?.charAt(0)}</span>
                )}
              </span>
              <span className="text-xs font-medium text-ink">{l.brand?.name ?? "(lisensi dihapus)"}</span>
              <form action={removeProductLicense}>
                <input type="hidden" name="id" value={l.id} />
                <input type="hidden" name="product_id" value={product.id} />
                <button type="submit" className="text-xs font-semibold text-coral hover:text-coral/70">×</button>
              </form>
            </div>
          ))}
        </div>
      )}

      {availableBrands.length > 0 ? (
        <form action={addProductLicense} className="flex gap-2">
          <input type="hidden" name="product_id" value={product.id} />
          <select name="brand_id" required className={`${inputClass} mt-0 flex-1`}>
            <option value="">Tambah lisensi...</option>
            {availableBrands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
          <button type="submit" className="shrink-0 rounded-lg bg-maroon px-4 py-2 text-xs font-semibold text-cream">
            Tambah
          </button>
        </form>
      ) : (
        brands.length === 0 && (
          <p className="text-xs text-muted">
            Belum ada brand/lisensi tersimpan. Tambah dulu lewat menu <strong>Brand &amp; Lisensi</strong> di sidebar.
          </p>
        )
      )}
    </section>
  );
}
