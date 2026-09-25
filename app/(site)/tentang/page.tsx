import { ShieldCheck, MessageCircle, Gem } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <span className="text-sm font-semibold text-flame">Tentang BOXA</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
        Nggak semua yang kamu mau, harus kamu punya.
      </h1>
      <p className="mt-3 font-display text-lg font-bold text-accent">
        Original Toys, Local Prices.
      </p>
      <p className="mt-5 text-base leading-relaxed text-ink-soft">
        BOXA.YK bukan sekadar toko mainan online. Kami memilih produk, mengecek kondisinya,
        dan menyampaikan informasinya apa adanya — termasuk kalau ada kekurangannya. Prinsip
        kami sederhana: kalau sebuah barang tidak punya alasan kuat untuk dijual, ya tidak
        kami jual.
      </p>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        Kami berbasis di Yogyakarta dan fokus melayani pembeli lokal dulu, dengan pengiriman
        area Yogyakarta yang cepat. Dari Blokees, licensed toys, blind box, sampai koleksi
        preloved yang sudah kami cek — semuanya melewati proses kurasi yang sama.
      </p>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        Anggap BOXA kayak temen yang paham mainan — bukan marketplace yang cuma mau jualan.
        Kamu bisa temukan barangnya di sini, pahami dulu kondisi dan isi box-nya, bandingkan
        harga online dan lokal, baru putusin mau beli lewat mana. Kalau kebetulan barangnya
        belum ada di BOXA, kami tetap kasih tahu ke mana kamu bisa cek — biasanya ke official
        store atau toko yang bisa dipercaya.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-5">
          <ShieldCheck className="text-flame" size={22} />
          <h3 className="mt-3 font-display text-base font-bold text-ink">Dicek Dulu</h3>
          <p className="mt-1.5 text-sm text-muted">Kondisi produk kami periksa sebelum ditawarkan.</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <Gem className="text-flame" size={22} />
          <h3 className="mt-3 font-display text-base font-bold text-ink">Dikurasi</h3>
          <p className="mt-1.5 text-sm text-muted">Setiap produk punya alasan untuk masuk BOXA.</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <MessageCircle className="text-flame" size={22} />
          <h3 className="mt-3 font-display text-base font-bold text-ink">Gampang Ditanya</h3>
          <p className="mt-1.5 text-sm text-muted">Belum yakin? Nggak apa-apa, tanya dulu.</p>
        </div>
      </div>
    </div>
  );
}
