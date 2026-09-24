"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Trash2, MessageCircle, MapPin } from "lucide-react";
import { useCart } from "./cart-context";
import { formatIDR } from "@/lib/utils";

export function CartDrawer({
  open,
  onClose,
  whatsappNumber,
}: {
  open: boolean;
  onClose: () => void;
  whatsappNumber: string;
}) {
  const { items, removeItem, clear } = useCart();
  const total = items.reduce((sum, i) => sum + i.localPrice, 0);

  function buildMessage(): string {
    const lines = [
      "Halo BOXA, aku mau tanya/pesan beberapa barang ini untuk ambil langsung di Yogyakarta:",
      "",
      ...items.map((i, idx) => `${idx + 1}. ${i.name} — ${formatIDR(i.localPrice)}`),
      "",
      `Total: ${formatIDR(total)}`,
      "",
      "Apakah semua masih tersedia?",
    ];
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  if (!open) return null;

  return (
    <>
      {/* Stops above the mobile bottom nav (bottom-16 ≈ its height) so it
          stays visible/usable while the cart is open — full height again
          on desktop where there's no bottom nav to protect. */}
      <div className="fixed inset-x-0 top-0 bottom-16 z-50 bg-ink/40 md:bottom-0" onClick={onClose} />
      <div
        className="fixed right-0 top-0 bottom-16 z-50 flex w-full max-w-sm flex-col bg-cream shadow-xl md:bottom-0"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center justify-between border-b border-line p-4">
          <h2 className="font-display text-lg font-bold text-ink">Keranjang</h2>
          <button onClick={onClose} aria-label="Tutup" className="text-ink-soft">
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-line bg-cream-warm px-4 py-3 text-xs text-ink-soft">
          <span className="flex items-center gap-1 font-semibold text-flame">
            <MapPin size={12} /> Khusus ambil langsung / COD Yogyakarta
          </span>
          Harga di sini adalah harga lokal. Bukan checkout — ini cuma kumpulin barang yang mau
          kamu tanyakan sekaligus lewat WhatsApp.
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-sm text-muted">Keranjang masih kosong.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3 rounded-xl border border-line bg-white p-2.5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-photo-frame">
                    {item.imageUrl && (
                      <Image src={item.imageUrl} alt={item.name} fill sizes="56px" className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${item.slug}`} onClick={onClose} className="line-clamp-2 text-sm font-medium text-ink hover:text-accent">
                      {item.name}
                    </Link>
                    <div className="text-sm font-bold text-accent">{formatIDR(item.localPrice)}</div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    aria-label="Hapus dari keranjang"
                    className="text-muted hover:text-coral"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted">Total ({items.length} barang)</span>
              <span className="font-display text-lg font-bold text-accent">{formatIDR(total)}</span>
            </div>
            <a
              href={buildMessage()}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                clear();
                onClose();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-flame px-4 py-3 text-sm font-semibold text-on-brand hover:bg-flame-light"
            >
              <MessageCircle size={16} />
              Tanyakan via WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
