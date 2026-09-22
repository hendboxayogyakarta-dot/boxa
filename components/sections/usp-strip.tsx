import { Flame } from "lucide-react";

export function UspStrip({ tagline }: { tagline: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-2 pt-1 sm:px-6">
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-flame/10 text-flame">
          <Flame size={17} />
        </span>
        <div>
          <div className="font-display text-sm font-bold text-ink sm:text-base">{tagline}</div>
          <p className="text-xs text-muted sm:text-sm">
            Beli online, atau dapatkan harga lebih hemat kalau ambil langsung di Yogyakarta.
          </p>
        </div>
      </div>
    </section>
  );
}
