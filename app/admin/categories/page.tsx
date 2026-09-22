import { getCategories } from "@/lib/data";
import { Plus } from "lucide-react";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Kategori</h1>
        <button className="flex items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream">
          <Plus size={16} /> Tambah Kategori
        </button>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="rounded-2xl border border-line bg-white p-4">
            <div className="font-display text-base font-bold text-ink">{c.name}</div>
            <div className="text-xs text-muted">/{c.slug}</div>
            <p className="mt-2 text-sm text-ink-soft">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
