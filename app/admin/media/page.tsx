import { ImagePlus } from "lucide-react";

export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Media Library</h1>
      <p className="mt-1 text-sm text-muted">
        Membutuhkan Supabase Storage. Setelah disambungkan, halaman ini akan menampilkan
        semua gambar yang diunggah dan bisa dipilih untuk produk atau CMS.
      </p>
      <div className="mt-6 flex h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line text-muted">
        <ImagePlus size={28} />
        <span className="mt-2 text-sm">Belum ada media — sambungkan Supabase Storage dulu</span>
      </div>
    </div>
  );
}
