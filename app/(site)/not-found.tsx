import Link from "next/link";
import { Flame } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-4 text-center">
      <Flame size={40} className="text-flame" />
      <h1 className="mt-4 font-display text-3xl font-extrabold text-ink">Halaman Tidak Ditemukan</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Sepertinya halaman yang kamu cari sudah tidak ada atau alamatnya salah.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href="/" className="rounded-full bg-flame px-5 py-2.5 text-sm font-semibold text-on-brand hover:bg-flame-light">
          Ke Beranda
        </Link>
        <Link href="/shop" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink-soft hover:border-maroon hover:text-accent">
          Lihat Produk
        </Link>
      </div>
    </div>
  );
}
