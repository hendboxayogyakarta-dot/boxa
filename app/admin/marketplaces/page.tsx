import Image from "next/image";
import Link from "next/link";
import { getAllMarketplacesForAdmin } from "@/lib/data";
import { deleteMarketplace } from "@/lib/actions/marketplaces";
import { Plus, Pencil } from "lucide-react";

export default async function AdminMarketplacesPage() {
  const marketplaces = await getAllMarketplacesForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Marketplace</h1>
          <p className="mt-1 max-w-md text-sm text-muted">
            Logo Shopee, Tokopedia, Lazada, dll. Pilih salah satu di form produk supaya tombol
            &ldquo;Pesan via ...&rdquo; menampilkan logo dan nama yang sesuai dengan link yang dipakai.
          </p>
        </div>
        <Link href="/admin/marketplaces/new" className="flex shrink-0 items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream">
          <Plus size={16} /> Tambah
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {marketplaces.map((m) => (
          <div key={m.id} className="rounded-2xl border border-line bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream-warm">
                {m.logo_url ? (
                  <Image src={m.logo_url} alt={m.name} fill sizes="48px" className="object-contain" />
                ) : (
                  <span className="font-display text-lg font-bold text-maroon">{m.name.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-ink">{m.name}</div>
                <span className={`text-xs ${m.status === "active" ? "text-flame" : "text-muted"}`}>
                  {m.status === "active" ? "Aktif" : "Tersembunyi"}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <Link href={`/admin/marketplaces/${m.id}/edit`} className="flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-maroon">
                <Pencil size={13} /> Edit
              </Link>
              <form action={deleteMarketplace}>
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" className="text-xs font-semibold text-coral hover:text-coral/70">Hapus</button>
              </form>
            </div>
          </div>
        ))}
        {marketplaces.length === 0 && <p className="text-sm text-muted">Belum ada marketplace.</p>}
      </div>
    </div>
  );
}
