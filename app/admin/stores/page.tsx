import Image from "next/image";
import Link from "next/link";
import { getAllStoresForAdmin } from "@/lib/data";
import { deleteStore } from "@/lib/actions/stores";
import { Plus, Pencil } from "lucide-react";

const RELATIONSHIP_LABEL: Record<string, string> = {
  reference: "Reference",
  affiliate: "Affiliate",
  partner: "Partner",
};

export default async function AdminStoresPage() {
  const stores = await getAllStoresForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Store Reference</h1>
          <p className="mt-1 max-w-lg text-sm text-muted">
            Toko, official store, atau marketplace yang bisa jadi referensi tempat beli. Simpan
            sekali di sini, lalu hubungkan ke produk manapun dari halaman edit produk — tidak
            perlu isi ulang nama/logo tiap kali. &ldquo;Jenis Hubungan&rdquo; cuma catatan internal,
            customer selalu lihatnya sebagai &ldquo;Pilihan Online&rdquo;.
          </p>
        </div>
        <Link href="/admin/stores/new" className="flex shrink-0 items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream">
          <Plus size={16} /> Tambah Toko
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((s) => (
          <div key={s.id} className="rounded-2xl border border-line bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream-warm">
                {s.logo_url ? (
                  <Image src={s.logo_url} alt={s.name} fill sizes="48px" className="object-contain" />
                ) : (
                  <span className="font-display text-lg font-bold text-maroon">{s.name.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-ink">{s.name}</div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <span className={s.status === "active" ? "text-flame" : ""}>
                    {s.status === "active" ? "Aktif" : "Tersembunyi"}
                  </span>
                  <span>·</span>
                  <span>{RELATIONSHIP_LABEL[s.relationship_type]}</span>
                </div>
              </div>
            </div>
            {s.description && <p className="mt-2 line-clamp-2 text-xs text-muted">{s.description}</p>}
            <div className="mt-3 flex items-center gap-3">
              <Link href={`/admin/stores/${s.id}/edit`} className="flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-maroon">
                <Pencil size={13} /> Edit
              </Link>
              <form action={deleteStore}>
                <input type="hidden" name="id" value={s.id} />
                <button type="submit" className="text-xs font-semibold text-coral hover:text-coral/70">Hapus</button>
              </form>
            </div>
          </div>
        ))}
        {stores.length === 0 && <p className="text-sm text-muted">Belum ada toko/referensi.</p>}
      </div>
    </div>
  );
}
