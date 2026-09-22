import Link from "next/link";
import { getAllCategoriesForAdmin } from "@/lib/data";
import { deleteCategory } from "@/lib/actions/categories";
import { Plus, Pencil } from "lucide-react";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategoriesForAdmin();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Kategori</h1>
        <Link href="/admin/categories/new" className="flex items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream">
          <Plus size={16} /> Tambah Kategori
        </Link>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="rounded-2xl border border-line bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-base font-bold text-ink">{c.name}</div>
                <div className="text-xs text-muted">/{c.slug}</div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.status === "active" ? "bg-flame/10 text-flame" : "bg-cream-warm text-ink-soft"}`}>
                {c.status === "active" ? "Aktif" : "Tersembunyi"}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-soft">{c.description}</p>
            <div className="mt-3 flex items-center gap-3">
              <Link href={`/admin/categories/${c.id}/edit`} className="flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-maroon">
                <Pencil size={13} /> Edit
              </Link>
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={c.id} />
                <button type="submit" className="text-xs font-semibold text-coral hover:text-coral/70">Hapus</button>
              </form>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-muted">Belum ada kategori.</p>
        )}
      </div>
    </div>
  );
}
