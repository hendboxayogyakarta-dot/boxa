import { saveBrand } from "@/lib/actions/brands";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { SubmitButton } from "@/components/admin/submit-button";
import type { Brand } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-maroon";

export function BrandForm({ brand }: { brand?: Brand }) {
  return (
    <form action={saveBrand} className="max-w-lg space-y-4 rounded-2xl border border-line bg-white p-5">
      {brand && <input type="hidden" name="id" value={brand.id} />}

      <div>
        <span className="text-sm font-medium text-ink">Logo</span>
        <div className="mt-1">
          <ImageUploadField name="logo_url" bucket="media-library" initialUrl={brand?.logo_url} aspect="aspect-square max-w-[160px]" />
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink">Nama</span>
        <input name="name" defaultValue={brand?.name} placeholder="Blokees, Transformers, Hot Toys..." className={inputClass} />
        <span className="mt-1 block text-xs text-muted">
          Bisa nama pabrikan mainan (Blokees, ZD Toy) atau lisensi karakter/film (Transformers, One Piece).
        </span>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Slug</span>
        <input name="slug" defaultValue={brand?.slug} placeholder="dibuat otomatis jika kosong" className={inputClass} />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-ink">Urutan</span>
          <input type="number" name="sort_order" defaultValue={brand?.sort_order ?? 0} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Status</span>
          <select name="status" defaultValue={brand?.status ?? "active"} className={inputClass}>
            <option value="active">Aktif</option>
            <option value="hidden">Tersembunyi</option>
          </select>
        </label>
      </div>

      <SubmitButton>Simpan</SubmitButton>
    </form>
  );
}
