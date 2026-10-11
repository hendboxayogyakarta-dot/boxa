"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, Search, Eye, EyeOff, Trash2 } from "lucide-react";
import { deleteProduct, toggleProductStatus } from "@/lib/actions/products";
import { formatIDR } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

type Filter = "all" | "published" | "draft" | "archived";
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "published", label: "Tayang" },
  { key: "draft", label: "Draft" },
  { key: "archived", label: "Arsip" },
];

function statusLabel(s: string) {
  return s === "published" ? "Tayang" : s === "archived" ? "Diarsipkan" : "Draft";
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
        status === "published" ? "bg-flame/10 text-flame" : "bg-cream-warm text-ink-soft"
      )}
    >
      {statusLabel(status)}
    </span>
  );
}

function ToggleForm({ p, className }: { p: Product; className?: string }) {
  const publishing = p.status !== "published";
  return (
    <form action={toggleProductStatus}>
      <input type="hidden" name="id" value={p.id} />
      <input type="hidden" name="status" value={publishing ? "published" : "draft"} />
      <button type="submit" className={className}>
        {publishing ? <Eye size={16} /> : <EyeOff size={16} />}
        {publishing ? "Tayangkan" : "Sembunyikan"}
      </button>
    </form>
  );
}

function DeleteForm({ p, className, label }: { p: Product; className?: string; label?: string }) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(e) => {
        if (!confirm(`Hapus "${p.name}"? Tindakan ini tidak bisa dibatalkan.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={p.id} />
      <button type="submit" className={className} aria-label={`Hapus ${p.name}`}>
        <Trash2 size={16} />
        {label}
      </button>
    </form>
  );
}

export function ProductList({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (filter === "all" || p.status === filter) &&
        (!needle || p.name.toLowerCase().includes(needle) || (p.sku ?? "").toLowerCase().includes(needle))
    );
  }, [products, q, filter]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: products.length, published: 0, draft: 0, archived: 0 };
    for (const p of products) if (p.status in c) c[p.status as Filter]++;
    return c;
  }, [products]);

  return (
    <div className="mt-4">
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari nama atau SKU…"
          className="h-12 w-full rounded-xl border border-line bg-white pl-10 pr-3 text-base outline-none focus:border-maroon md:h-10 md:text-sm"
        />
      </div>

      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold",
              filter === f.key ? "border-maroon bg-maroon text-cream" : "border-line bg-white text-ink-soft"
            )}
          >
            {f.label} <span className="opacity-70">{counts[f.key]}</span>
          </button>
        ))}
      </div>

      {/* Phone: cards */}
      <ul className="mt-4 space-y-3 md:hidden">
        {shown.map((p) => (
          <li key={p.id} className="overflow-hidden rounded-2xl border border-line bg-white">
            <Link href={`/admin/products/${p.id}/edit`} className="flex gap-3 p-3 active:bg-cream-warm">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-warm">
                {p.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0].url} alt="" loading="lazy" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="line-clamp-2 text-sm font-semibold leading-snug text-ink">{p.name}</div>
                <div className="mt-1 text-sm font-bold text-maroon">
                  {p.price ? formatIDR(p.price) : "Harga belum diisi"}
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <StatusPill status={p.status} />
                  <span className="text-[11px] text-muted">Stok {p.stock_quantity}</span>
                  {!p.offline_available && <span className="text-[11px] text-muted">· Affiliate</span>}
                </div>
              </div>
            </Link>
            <div className="grid grid-cols-3 divide-x divide-line border-t border-line text-xs font-semibold">
              <Link href={`/admin/products/${p.id}/edit`} className="flex h-12 items-center justify-center gap-1.5 text-maroon active:bg-cream-warm">
                <Pencil size={16} /> Edit
              </Link>
              <ToggleForm p={p} className="flex h-12 w-full items-center justify-center gap-1.5 text-ink-soft active:bg-cream-warm" />
              <DeleteForm p={p} label="Hapus" className="flex h-12 w-full items-center justify-center gap-1.5 text-coral active:bg-cream-warm" />
            </div>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="rounded-2xl border border-dashed border-line bg-white px-4 py-10 text-center text-sm text-muted">
            {products.length === 0 ? "Belum ada produk. Ketuk tombol Tambah di bawah." : "Tidak ada produk yang cocok."}
          </li>
        )}
      </ul>

      {/* Desktop: table */}
      <div className="mt-4 hidden overflow-hidden rounded-2xl border border-line bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-warm text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Produk</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Harga</th>
              <th className="px-4 py-3 font-medium">Stok</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {shown.map((p) => (
              <tr key={p.id} className="hover:bg-cream-warm/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-cream-warm">
                      {p.images[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.images[0].url} alt="" loading="lazy" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <span className="font-medium text-ink">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{p.sku}</td>
                <td className="px-4 py-3 text-ink-soft">{p.price ? formatIDR(p.price) : "—"}</td>
                <td className="px-4 py-3 text-ink-soft">{p.stock_quantity}</td>
                <td className="px-4 py-3"><StatusPill status={p.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/products/${p.id}/edit`} className="flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-maroon">
                      <Pencil size={14} /> Edit
                    </Link>
                    <ToggleForm p={p} className="flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-maroon" />
                    <DeleteForm p={p} label="Hapus" className="flex items-center gap-1 text-xs font-semibold text-coral hover:text-coral/70" />
                  </div>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted">
                  {products.length === 0 ? "Belum ada produk." : "Tidak ada produk yang cocok."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
