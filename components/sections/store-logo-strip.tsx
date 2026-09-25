import Image from "next/image";
import type { Store } from "@/lib/types";

/**
 * Just shows which stores are in the system as discovery references —
 * deliberately doesn't call them "partners" (per the brief: only use
 * that word if there's an actual, verified partnership) and never
 * mentions relationship_type (that field is dashboard-internal only).
 */
export function StoreLogoStrip({ stores }: { stores: Store[] }) {
  if (stores.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h2 className="font-display text-xl font-bold text-ink">Pilihan Toko &amp; Official Store</h2>
      <p className="mt-1 text-sm text-muted">Temukan berbagai tempat untuk mendapatkan produk yang kamu cari.</p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {stores.map((s) => (
          <div
            key={s.id}
            title={s.name}
            className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2"
          >
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream-warm">
              {s.logo_url ? (
                <Image src={s.logo_url} alt={s.name} fill sizes="28px" className="object-contain p-1" />
              ) : (
                <span className="font-display text-xs font-bold text-maroon">{s.name.charAt(0)}</span>
              )}
            </span>
            <span className="text-xs font-medium text-ink-soft">{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
