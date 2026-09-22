import { saveCategory } from "@/lib/actions/categories";
import type { Category } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-maroon";

export function CategoryForm({ category }: { category?: Category }) {
  return (
    <form action={saveCategory} className="max-w-lg space-y-4 rounded-2xl border border-line bg-white p-5">
      {category && <input type="hidden" name="id" value={category.id} />}

      <label className="block">
        <span className="text-sm font-medium text-ink">Nama Kategori</span>
        <input name="name" required defaultValue={category?.name} className={inputClass} />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Slug</span>
        <input name="slug" defaultValue={category?.slug} placeholder="dibuat otomatis jika kosong" className={inputClass} />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Deskripsi</span>
        <textarea name="description" defaultValue={category?.description ?? ""} rows={3} className={inputClass} />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">URL Gambar</span>
        <input name="image_url" defaultValue={category?.image_url ?? ""} className={inputClass} />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-ink">Urutan</span>
          <input type="number" name="sort_order" defaultValue={category?.sort_order ?? 0} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Status</span>
          <select name="status" defaultValue={category?.status ?? "active"} className={inputClass}>
            <option value="active">Aktif</option>
            <option value="hidden">Tersembunyi</option>
          </select>
        </label>
      </div>

      <button type="submit" className="rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-deep">
        Simpan Kategori
      </button>
    </form>
  );
}
