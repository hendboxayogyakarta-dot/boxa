"use client";

import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkItem {
  label: string;
  href: string;
  active: boolean;
}

export function ShopMobileControls({
  categoryLinks,
  brandLinks,
  quickLinks,
  sortLinks,
  activeSortLabel,
  resultCount,
}: {
  categoryLinks: LinkItem[];
  brandLinks: LinkItem[];
  quickLinks: LinkItem[];
  sortLinks: LinkItem[];
  activeSortLabel: string;
  resultCount: number;
}) {
  const [open, setOpen] = useState<"filter" | "sort" | null>(null);
  const activeFilterCount =
    [...categoryLinks, ...brandLinks, ...quickLinks].filter((l) => l.active && l.label !== "Semua" && l.label !== "Semua Brand").length;

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen("filter")}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line bg-white py-2 text-sm font-medium text-ink-soft"
        >
          <SlidersHorizontal size={15} />
          Filter
          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-maroon text-[10px] font-bold text-cream">
              {activeFilterCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setOpen("sort")}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line bg-white py-2 text-sm font-medium text-ink-soft"
        >
          <ArrowUpDown size={15} />
          {activeSortLabel}
        </button>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-ink/40" onClick={() => setOpen(null)} />
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-cream p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink">
                {open === "filter" ? "Filter" : "Urutkan"}
              </h2>
              <button onClick={() => setOpen(null)} aria-label="Tutup" className="text-ink-soft">
                <X size={20} />
              </button>
            </div>

            {open === "sort" ? (
              <div className="space-y-1">
                {sortLinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setOpen(null)}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 text-sm",
                      s.active ? "bg-maroon text-cream" : "text-ink-soft hover:bg-cream-warm"
                    )}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Kategori</h3>
                  <div className="flex flex-wrap gap-2">
                    {categoryLinks.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(null)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-sm",
                          c.active ? "border-maroon bg-maroon text-cream" : "border-line text-ink-soft"
                        )}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {brandLinks.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Brand & Lisensi</h3>
                    <div className="flex flex-wrap gap-2">
                      {brandLinks.map((b) => (
                        <Link
                          key={b.href}
                          href={b.href}
                          onClick={() => setOpen(null)}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-sm",
                            b.active ? "border-maroon bg-maroon text-cream" : "border-line text-ink-soft"
                          )}
                        >
                          {b.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Cepat</h3>
                  <div className="flex flex-wrap gap-2">
                    {quickLinks.map((q) => (
                      <Link
                        key={q.href}
                        href={q.href}
                        onClick={() => setOpen(null)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-sm",
                          q.active ? "border-maroon bg-maroon text-cream" : "border-line text-ink-soft"
                        )}
                      >
                        {q.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setOpen(null)}
                  className="w-full rounded-full bg-maroon py-3 text-sm font-semibold text-cream"
                >
                  Lihat {resultCount} Produk
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
