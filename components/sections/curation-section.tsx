import { CheckCircle2, MessageCircle, ShieldCheck, Truck } from "lucide-react";

const PILLARS = [
  { icon: ShieldCheck, title: "Kondisi", text: "Kami periksa fisik dan kelengkapannya sebelum ditawarkan." },
  { icon: CheckCircle2, title: "Nilai Koleksi", text: "Ada alasan kenapa barang ini layak dikoleksi, bukan sekadar laku dijual." },
  { icon: MessageCircle, title: "Informasi Jujur", text: "Kalau ada minus, kami tulis di halaman produk — bukan disembunyikan." },
  { icon: Truck, title: "Gampang Didapat", text: "Antar cepat area Yogyakarta, tanya-tanya juga direspons langsung." },
];

export function CurationSection() {
  return (
    <section className="border-y border-site-border bg-site-bg-raised">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-flame">Filosofi BOXA</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-site-text sm:text-4xl">
            Kenapa BOXA memilihnya.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-site-text-muted">
            Nggak semua yang kamu mau, harus kamu punya. Setiap produk yang masuk BOXA melewati
            kurasi yang sama — dicek kondisinya, dilihat nilai koleksinya, dan disampaikan apa
            adanya sebelum ditawarkan ke kamu.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-site-border bg-site-surface p-5">
              <Icon className="text-flame" size={20} />
              <h3 className="mt-3 font-display text-base font-bold text-site-text">{title}</h3>
              <p className="mt-1.5 text-sm text-site-text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
