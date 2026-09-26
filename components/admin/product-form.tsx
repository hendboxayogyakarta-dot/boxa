import { saveProduct } from "@/lib/actions/products";
import { ProductImagesField } from "@/components/admin/product-images-field";
import { SubmitButton } from "@/components/admin/submit-button";
import type { Brand, Category, Marketplace, Product } from "@/lib/types";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

const inputClass =
  "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-maroon";

export function ProductForm({
  product,
  categories,
  brands,
  marketplaces,
}: {
  product?: Product;
  categories: Category[];
  brands: Brand[];
  marketplaces: Marketplace[];
}) {
  return (
    <form action={saveProduct} className="max-w-3xl space-y-8">
      {product && <input type="hidden" name="id" value={product.id} />}

      <section className="space-y-3 rounded-2xl border-2 border-flame/30 bg-flame/5 p-5">
        <h2 className="font-display text-base font-bold text-ink">Jenis Produk</h2>
        <p className="text-xs text-muted">Ini menentukan tombol, harga, dan tampilan produk di halaman depan.</p>
        <div className="space-y-2">
          <label className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-3 text-sm">
            <input
              type="radio"
              name="offline_available"
              value="on"
              defaultChecked={product?.offline_available ?? true}
              className="mt-0.5"
            />
            <span>
              <span className="font-semibold text-ink">COD / Lokal tersedia</span>
              <span className="block text-xs text-muted">
                Bisa diambil langsung / COD Yogyakarta. Isi harga online dan (opsional) harga lokal di bawah.
              </span>
            </span>
          </label>
          <label className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-3 text-sm">
            <input
              type="radio"
              name="offline_available"
              value="off"
              defaultChecked={product ? !product.offline_available : false}
              className="mt-0.5"
            />
            <span>
              <span className="font-semibold text-ink">Rekomendasi — Affiliate saja</span>
              <span className="block text-xs text-muted">
                BOXA tidak simpan fisiknya (link affiliate Shopee/marketplace lain). Harga tetap
                tampil kalau diisi; kalau dikosongkan, otomatis muncul &ldquo;Rp ???&rdquo; yang
                mengundang klik, plus label &ldquo;Pilihan BOXA&rdquo; + skor (isi di bagian Kondisi
                &amp; Kurasi). Tombol beli langsung ke link marketplace, tanpa opsi COD/WhatsApp.
              </span>
            </span>
          </label>
        </div>
        <Field label="Teks Rekomendasi (opsional)" hint={'Ganti label default "Pilihan BOXA" — misalnya "Best Seller" atau "Favorit Pelanggan". Cuma dipakai kalau jenis produknya Rekomendasi.'}>
          <input name="recommendation_note" defaultValue={product?.recommendation_note ?? ""} placeholder="Pilihan BOXA" className={inputClass} />
        </Field>
      </section>

      <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
        <h2 className="font-display text-base font-bold text-ink">Informasi Dasar</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nama Produk">
            <input name="name" defaultValue={product?.name} className={inputClass} />
          </Field>
          <Field label="Slug" hint="Kosongkan untuk dibuat otomatis dari nama.">
            <input name="slug" defaultValue={product?.slug} className={inputClass} placeholder="nama-produk" />
          </Field>
          <Field label="SKU">
            <input name="sku" defaultValue={product?.sku} className={inputClass} />
          </Field>
          <Field label="Kategori">
            <select name="category_id" defaultValue={product?.category_id} className={inputClass}>
              <option value="">Pilih kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Brand (teks bebas)">
            <input name="brand" defaultValue={product?.brand ?? ""} className={inputClass} />
          </Field>
          <Field label="Seri">
            <input name="series" defaultValue={product?.series ?? ""} className={inputClass} />
          </Field>
          <Field
            label="Logo Brand / Lisensi (opsional)"
            hint="Pilih supaya logonya muncul di produk. Belum ada pilihannya? Tambah dulu di menu Brand & Lisensi — upload sekali, pakai di produk manapun."
          >
            <select name="brand_id" defaultValue={product?.brand_id ?? ""} className={inputClass}>
              <option value="">Tidak ada logo</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Deskripsi Singkat">
          <input name="short_description" defaultValue={product?.short_description} className={inputClass} />
        </Field>
        <Field label="Deskripsi Lengkap" hint="Pisahkan paragraf dengan baris kosong.">
          <textarea name="description" defaultValue={product?.description} rows={5} className={inputClass} />
        </Field>
      </section>

      <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
        <h2 className="font-display text-base font-bold text-ink">Harga & Stok</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Harga (Rp)" hint='Boleh dikosongkan untuk produk jenis Rekomendasi — otomatis tampil "Rp ???" sampai kamu isi.'>
            <input type="number" name="price" min={0} defaultValue={product?.price} className={inputClass} />
          </Field>
          <Field label="Harga Coret (opsional)">
            <input type="number" name="compare_price" min={0} defaultValue={product?.compare_price ?? ""} className={inputClass} />
          </Field>
          <Field
            label="Harga Lokal — Yogyakarta (opsional)"
            hint="Isi kalau produk ini punya harga lebih hemat untuk ambil langsung di Yogyakarta. Kosongkan kalau cuma satu harga (online), atau kalau jenis produknya Rekomendasi."
          >
            <input type="number" name="local_price" min={0} defaultValue={product?.local_price ?? ""} className={inputClass} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Jumlah Stok">
            <input type="number" name="stock_quantity" min={0} defaultValue={product?.stock_quantity ?? 0} className={inputClass} />
          </Field>
          <Field label="Status Stok">
            <select name="stock_status" defaultValue={product?.stock_status ?? "in_stock"} className={inputClass}>
              <option value="in_stock">Tersedia</option>
              <option value="low_stock">Stok Terbatas</option>
              <option value="sold_out">Habis</option>
              <option value="preorder">Pre-Order</option>
            </select>
          </Field>
          <Field label="Jumlah Terjual" hint="Tampil sebagai 'X terjual' di kartu produk. Bisa diisi manual, misalnya kalau pindahan dari toko lain.">
            <input type="number" name="sold_count" min={0} defaultValue={product?.sold_count ?? 0} className={inputClass} />
          </Field>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
        <h2 className="font-display text-base font-bold text-ink">Kondisi & Kurasi</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Kondisi">
            <select name="condition" defaultValue={product?.condition ?? "new_sealed"} className={inputClass}>
              <option value="new_sealed">Baru, Segel</option>
              <option value="new_built">Baru, Sudah Dirakit</option>
              <option value="pre_owned_like_new">Preloved, Sangat Baik</option>
              <option value="pre_owned_good">Preloved, Baik</option>
            </select>
          </Field>
          <Field label="Segel / Rakit">
            <select name="sealed_or_built" defaultValue={product?.sealed_or_built ?? "n/a"} className={inputClass}>
              <option value="sealed">Segel</option>
              <option value="built">Sudah Dirakit</option>
              <option value="n/a">N/A</option>
            </select>
          </Field>
          <Field label="Rarity">
            <select name="rarity" defaultValue={product?.rarity ?? ""} className={inputClass}>
              <option value="">Tidak ada</option>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="secret">Secret</option>
              <option value="limited">Limited</option>
            </select>
          </Field>
          <Field label="BOXA Score (0-10)" hint="Buat produk Rekomendasi, ini tampil sebagai skor di narasi 'Pilihan BOXA'.">
            <input type="number" name="boxa_score" min={0} max={10} step={0.1} defaultValue={product?.boxa_score ?? ""} className={inputClass} />
          </Field>
        </div>
        <div className="flex flex-wrap gap-4 pt-2">
          {[
            ["is_featured", "Featured", product?.is_featured],
            ["is_new", "Baru", product?.is_new],
            ["is_rare", "Rare", product?.is_rare],
            ["is_secret", "Secret", product?.is_secret],
            ["is_boxa_approved", "BOXA Approved", product?.is_boxa_approved],
          ].map(([name, label, checked]) => (
            <label key={name as string} className="flex items-center gap-2 text-sm text-ink-soft">
              <input type="checkbox" name={name as string} defaultChecked={Boolean(checked)} className="rounded border-line" />
              {label as string}
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm text-ink-soft" title="Box in Box — dus asli disimpan dalam dus pelindung tambahan, kondisi packaging terjaga maksimal.">
            <input type="checkbox" name="is_bib" defaultChecked={product?.is_bib} className="rounded border-line" />
            BIB (Box in Box)
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-soft" title="Original Factory Condition — kondisi masih persis seperti saat keluar pabrik, segel belum pernah dibuka.">
            <input type="checkbox" name="is_ofc" defaultChecked={product?.is_ofc} className="rounded border-line" />
            OFC (Original Factory Condition)
          </label>
        </div>
        <p className="text-xs text-muted">
          Arahkan kursor ke &ldquo;BIB&rdquo; atau &ldquo;OFC&rdquo; di atas buat lihat artinya. Badge yang sama
          juga muncul di halaman produk dengan penjelasan singkat.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
        <h2 className="font-display text-base font-bold text-ink">Foto Produk</h2>
        <p className="text-xs text-muted">Bisa unggah beberapa foto sekaligus. Foto pertama otomatis jadi foto utama — geser urutannya kalau perlu.</p>
        <ProductImagesField initialUrls={product?.images.map((i) => i.url) ?? []} />
      </section>

      <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
        <h2 className="font-display text-base font-bold text-ink">Pengiriman & CTA</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Lokasi">
            <input name="location" defaultValue={product?.location ?? "Yogyakarta"} className={inputClass} />
          </Field>
          <Field label="Jenis CTA">
            <select name="cta_type" defaultValue={product?.cta_type ?? "WHATSAPP"} className={inputClass}>
              <option value="WHATSAPP">WhatsApp</option>
              <option value="SHOPEE">Marketplace (link affiliate)</option>
              <option value="EXTERNAL_URL">Link Lain / Official Store</option>
            </select>
          </Field>
          <Field label="Link WhatsApp">
            <input name="whatsapp_url" defaultValue={product?.whatsapp_url ?? ""} className={inputClass} />
          </Field>
          <Field label="Link Marketplace" hint="Link affiliate — boleh dari Shopee, Tokopedia, Lazada, atau marketplace lain.">
            <input name="shopee_url" defaultValue={product?.shopee_url ?? ""} className={inputClass} />
          </Field>
          <Field
            label="Marketplace (logo tombol)"
            hint="Menentukan logo & nama yang tampil di tombol beli online. Tambah pilihan baru di menu Marketplace."
          >
            <select name="marketplace_id" defaultValue={product?.marketplace_id ?? ""} className={inputClass}>
              <option value="">Tanpa logo</option>
              {marketplaces.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Link Eksternal Lain" hint='Cocok buat "belum ada di BOXA, lihat official store" — tombolnya otomatis jadi "Lihat Official Store".'>
            <input name="external_order_url" defaultValue={product?.external_order_url ?? ""} className={inputClass} />
          </Field>
        </div>
        <div className="flex flex-wrap gap-4 pt-2">
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input type="checkbox" name="delivery_available" defaultChecked={product?.delivery_available ?? true} className="rounded border-line" />
            Bisa diantar
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input type="checkbox" name="instant_delivery_available" defaultChecked={Boolean(product?.instant_delivery_available)} className="rounded border-line" />
            Pengiriman instan
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
        <h2 className="font-display text-base font-bold text-ink">Garansi & Catatan</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Jenis Garansi">
            <input name="warranty_type" defaultValue={product?.warranty_type ?? ""} className={inputClass} />
          </Field>
        </div>
        <Field label="Deskripsi Garansi / Catatan BOXA">
          <textarea name="warranty_description" defaultValue={product?.warranty_description ?? ""} rows={3} className={inputClass} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Kelebihan" hint="Satu poin per baris.">
            <textarea name="pros" defaultValue={product?.pros.join("\n")} rows={4} className={inputClass} />
          </Field>
          <Field label="Perlu Diperhatikan" hint="Satu poin per baris.">
            <textarea name="cons" defaultValue={product?.cons.join("\n")} rows={4} className={inputClass} />
          </Field>
          <Field label="Yang Didapat" hint="Satu poin per baris.">
            <textarea name="what_is_included" defaultValue={product?.what_is_included.join("\n")} rows={4} className={inputClass} />
          </Field>
          <Field label="Tidak Termasuk" hint="Satu poin per baris.">
            <textarea name="what_is_not_included" defaultValue={product?.what_is_not_included.join("\n")} rows={4} className={inputClass} />
          </Field>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
        <h2 className="font-display text-base font-bold text-ink">Status Publikasi</h2>
        <Field label="Status">
          <select name="status" defaultValue={product?.status ?? "draft"} className={inputClass}>
            <option value="draft">Draft (belum tayang)</option>
            <option value="published">Tayang</option>
            <option value="archived">Diarsipkan</option>
          </select>
        </Field>
      </section>

      <div className="flex justify-end gap-3">
        <SubmitButton>Simpan Produk</SubmitButton>
      </div>
    </form>
  );
}
