import { MediaLibrary } from "@/components/admin/media-library";

export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Media Library</h1>
      <p className="mt-1 max-w-lg text-sm text-muted">
        Unggah gambar di sini, salin URL-nya, lalu tempel ke kolom gambar produk. Butuh bucket
        Storage bernama <code className="rounded bg-cream-warm px-1 py-0.5 text-xs">media-library</code> — lihat README.md.
      </p>
      <div className="mt-5">
        <MediaLibrary />
      </div>
    </div>
  );
}
