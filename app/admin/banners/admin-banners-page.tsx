import Image from "next/image";
import Link from "next/link";
import { getAllBannersForAdmin } from "@/lib/data";
import { deleteBanner, toggleBanner } from "@/lib/actions/banners";
import { Plus, Pencil } from "lucide-react";

export default async function AdminBannersPage() {
  const banners = await getAllBannersForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Banner</h1>
          <p className="mt-1 text-sm text-muted">Gambar yang bergeser di paling atas halaman depan, seperti banner di Shopee.</p>
        </div>
        <Link href="/admin/banners/new" className="flex items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream">
          <Plus size={16} /> Tambah Banner
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {banners.map((b) => (
          <div key={b.id} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-3">
            <div className="relative flex h-16 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cream-warm">
              {b.image_url ? (
                <Image src={b.image_url} alt={b.alt_text ?? ""} fill sizes="112px" className="object-cover" />
              ) : (
                <span className="text-[10px] text-muted">Belum ada gambar</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-ink">{b.alt_text || "(tanpa judul)"}</div>
              <div className="truncate text-xs text-muted">{b.link_url || "Tidak ada link"}</div>
            </div>
            <form action={toggleBanner}>
              <input type="hidden" name="id" value={b.id} />
              <input type="hidden" name="enabled" value={String(b.enabled)} />
              <button
                type="submit"
                className={`rounded-full px-3 py-1 text-xs font-semibold ${b.enabled ? "bg-flame/10 text-flame" : "bg-cream-warm text-ink-soft"}`}
              >
                {b.enabled ? "Tampil" : "Sembunyi"}
              </button>
            </form>
            <Link href={`/admin/banners/${b.id}/edit`} className="text-ink-soft hover:text-maroon" title="Edit">
              <Pencil size={15} />
            </Link>
            <form action={deleteBanner}>
              <input type="hidden" name="id" value={b.id} />
              <button type="submit" className="text-xs font-semibold text-coral hover:text-coral/70">Hapus</button>
            </form>
          </div>
        ))}
        {banners.length === 0 && (
          <p className="text-sm text-muted">Belum ada banner. Tambahkan yang pertama.</p>
        )}
      </div>
    </div>
  );
}
