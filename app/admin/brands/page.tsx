import Image from "next/image";
import Link from "next/link";
import { getAllBrandsForAdmin } from "@/lib/data";
import { deleteBrand } from "@/lib/actions/brands";
import { Plus, Pencil } from "lucide-react";

export default async function AdminBrandsPage() {
  const brands = await getAllBrandsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Brand & Lisensi</h1>
          <p className="mt-1 max-w-md text-sm text-muted">
            Logo pabrikan (Blokees, ZD Toy) atau lisensi karakter (Transformers, One Piece).
            Upload sekali di sini, lalu pilih dari dropdown di form produk — tidak perlu upload ulang tiap produk.
          </p>
        </div>
        <Link href="/admin/brands/new" className="flex shrink-0 items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream">
          <Plus size={16} /> Tambah
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((b) => (
          <div key={b.id} className="rounded-2xl border border-line bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream-warm">
                {b.logo_url ? (
                  <Image src={b.logo_url} alt={b.name} fill sizes="48px" className="object-contain" />
                ) : (
                  <span className="font-display text-lg font-bold text-maroon">{b.name.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-ink">{b.name}</div>
                <span className={`text-xs ${b.status === "active" ? "text-flame" : "text-muted"}`}>
                  {b.status === "active" ? "Aktif" : "Tersembunyi"}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <Link href={`/admin/brands/${b.id}/edit`} className="flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-maroon">
                <Pencil size={13} /> Edit
              </Link>
              <form action={deleteBrand}>
                <input type="hidden" name="id" value={b.id} />
                <button type="submit" className="text-xs font-semibold text-coral hover:text-coral/70">Hapus</button>
              </form>
            </div>
          </div>
        ))}
        {brands.length === 0 && <p className="text-sm text-muted">Belum ada brand/lisensi.</p>}
      </div>
    </div>
  );
}
