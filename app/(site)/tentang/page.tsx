import { ShieldCheck, MessageCircle, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <span className="text-xs font-semibold uppercase tracking-widest text-flame">Tentang BOXA</span>
      <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-site-text sm:text-4xl">
        Nggak semua yang kamu mau, harus kamu punya.
      </h1>
      <p className="mt-5 text-base leading-relaxed text-site-text-muted">
        BOXA.YK bukan sekadar toko mainan online. Kami memilih produk, mengecek kondisinya,
        dan menyampaikan informasinya apa adanya — termasuk kalau ada kekurangannya. Prinsip
        kami sederhana: kalau sebuah barang tidak punya alasan kuat untuk dijual, ya tidak
        kami jual.
      </p>
      <p className="mt-4 text-base leading-relaxed text-site-text-muted">
        Kami berbasis di Yogyakarta dan fokus melayani pembeli lokal dulu, dengan pengiriman
        area Yogyakarta yang cepat. Dari Blokees, licensed toys, blind box, sampai koleksi
        preloved yang sudah kami cek — semuanya melewati proses kurasi yang sama.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-site-border bg-site-surface p-5">
          <ShieldCheck className="text-flame" size={22} />
          <h3 className="mt-3 font-display text-base font-bold text-site-text">Dicek Dulu</h3>
          <p className="mt-1.5 text-sm text-site-text-muted">Kondisi produk kami periksa sebelum ditawarkan.</p>
        </div>
        <div className="rounded-2xl border border-site-border bg-site-surface p-5">
          <Sparkles className="text-flame" size={22} />
          <h3 className="mt-3 font-display text-base font-bold text-site-text">Dikurasi</h3>
          <p className="mt-1.5 text-sm text-site-text-muted">Setiap produk punya alasan untuk masuk BOXA.</p>
        </div>
        <div className="rounded-2xl border border-site-border bg-site-surface p-5">
          <MessageCircle className="text-flame" size={22} />
          <h3 className="mt-3 font-display text-base font-bold text-site-text">Gampang Ditanya</h3>
          <p className="mt-1.5 text-sm text-site-text-muted">Belum yakin? Nggak apa-apa, tanya dulu.</p>
        </div>
      </div>
    </div>
  );
}
