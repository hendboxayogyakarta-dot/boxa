import { Search, BookOpenCheck, Scale, ShoppingBag } from "lucide-react";

const STEPS = [
  { icon: Search, title: "Temukan", text: "Jelajahi mainan dan collectibles pilihan dari berbagai brand." },
  { icon: BookOpenCheck, title: "Pahami", text: "Cek kondisi, kelengkapan, dan apa saja yang akan kamu terima." },
  { icon: Scale, title: "Bandingkan", text: "Lihat pilihan harga — online atau ambil langsung di Yogyakarta." },
  { icon: ShoppingBag, title: "Beli", text: "Pilih cara beli yang paling sesuai, lewat BOXA atau toko lain." },
];

export function JourneyStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="relative rounded-2xl border border-line bg-white p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-flame/10 text-flame">
              <Icon size={17} />
            </span>
            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="font-display text-xs font-bold text-muted">{i + 1}</span>
              <h3 className="font-display text-sm font-bold text-ink">{title}</h3>
            </div>
            <p className="mt-1 text-xs text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
