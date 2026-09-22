import { MediaLibrary } from "@/components/admin/media-library";

export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Media Library</h1>
      <p className="mt-1 max-w-lg text-sm text-muted">
        Foto produk, banner, logo, dan gambar kategori sudah bisa diunggah langsung dari
        halaman masing-masing — tidak perlu lewat sini lagi. Halaman ini cuma untuk gambar
        lain yang belum ada tempatnya sendiri.
      </p>
      <div className="mt-5">
        <MediaLibrary />
      </div>
    </div>
  );
}
