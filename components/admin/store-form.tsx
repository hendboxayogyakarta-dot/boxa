import { saveStore } from "@/lib/actions/stores";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { SubmitButton } from "@/components/admin/submit-button";
import type { Store } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-maroon";

export function StoreForm({ store }: { store?: Store }) {
  return (
    <form action={saveStore} className="max-w-lg space-y-4 rounded-2xl border border-line bg-white p-5">
      {store && <input type="hidden" name="id" value={store.id} />}

      <div>
        <span className="text-sm font-medium text-ink">Logo</span>
        <div className="mt-1">
          <ImageUploadField name="logo_url" bucket="media-library" initialUrl={store?.logo_url} aspect="aspect-square max-w-[160px]" />
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink">Nama Toko / Official Store</span>
        <input name="name" defaultValue={store?.name} placeholder="Blokees Official Store" className={inputClass} />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Slug</span>
        <input name="slug" defaultValue={store?.slug} placeholder="dibuat otomatis jika kosong" className={inputClass} />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Deskripsi Singkat (opsional)</span>
        <textarea name="description" defaultValue={store?.description ?? ""} rows={2} className={inputClass} />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-ink">Platform (opsional)</span>
          <input name="platform" defaultValue={store?.platform ?? ""} placeholder="Shopee, Tokopedia..." className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Lokasi (opsional)</span>
          <input name="location" defaultValue={store?.location ?? ""} placeholder="Yogyakarta" className={inputClass} />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink">Link Toko (opsional)</span>
        <input name="link" defaultValue={store?.link ?? ""} placeholder="https://..." className={inputClass} />
        <span className="mt-1 block text-xs text-muted">Link umum ke toko — link per produk diatur di halaman edit masing-masing produk.</span>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Jenis Hubungan (catatan internal)</span>
        <select name="relationship_type" defaultValue={store?.relationship_type ?? "reference"} className={inputClass}>
          <option value="reference">Reference</option>
          <option value="affiliate">Affiliate</option>
          <option value="partner">Partner</option>
        </select>
        <span className="mt-1 block text-xs text-muted">
          Cuma buat catatan kamu sendiri di dashboard — tidak pernah tampil ke customer. Di halaman produk, toko ini selalu muncul sebagai &ldquo;Pilihan Online&rdquo;, bukan &ldquo;Affiliate&rdquo;.
        </span>
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-ink">Urutan</span>
          <input type="number" name="sort_order" defaultValue={store?.sort_order ?? 0} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Status</span>
          <select name="status" defaultValue={store?.status ?? "active"} className={inputClass}>
            <option value="active">Aktif</option>
            <option value="hidden">Tersembunyi</option>
          </select>
        </label>
      </div>

      <SubmitButton>Simpan Toko</SubmitButton>
    </form>
  );
}
