import { CheckCircle2, MessageCircle, ShieldCheck, Truck } from "lucide-react";

const PILLARS = [
  { icon: ShieldCheck, title: "Kondisi", text: "Kami periksa fisik dan kelengkapannya sebelum ditawarkan." },
  { icon: CheckCircle2, title: "Nilai Koleksi", text: "Ada alasan kenapa barang ini layak dikoleksi, bukan sekadar laku dijual." },
  { icon: MessageCircle, title: "Informasi Jujur", text: "Kalau ada minus, kami tulis di halaman produk — bukan disembunyikan." },
  { icon: Truck, title: "Gampang Didapat", text: "Antar cepat area Yogyakarta, tanya-tanya juga direspons langsung." },
];

export function CurationSection() {
  return (
    <section className="bg-cream-warm py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-flame">Filosofi BOXA</span>
        <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">Kenapa BOXA memilihnya.</h2>
        <p className="mt-3 max-w-lg text-sm text-muted">
          Nggak semua yang kamu mau, harus kamu punya. Setiap produk yang masuk BOXA melewati
          kurasi yang sama — dicek kondisinya, dilihat nilai koleksinya, dan disampaikan apa
          adanya sebelum ditawarkan ke kamu.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-line bg-white p-5">
              <Icon className="text-flame" size={22} />
              <h3 className="mt-3 font-display text-base font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
