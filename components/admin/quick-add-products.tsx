"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { saveProductsBatch, type QuickProductInput } from "@/lib/actions/products";
import type { Brand, Category } from "@/lib/types";

const STORAGE_KEY = "boxa-quick-add-draft";
const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

interface Row extends QuickProductInput {
  _key: string;
  _uploading?: boolean;
}

function emptyRow(): Row {
  return {
    _key: Math.random().toString(36).slice(2),
    name: "",
    category_id: null,
    brand_id: null,
    price: 0,
    local_price: null,
    stock_quantity: 1,
    image_url: null,
    status: "published",
  };
}

const inputClass = "w-full rounded-lg border border-line px-2.5 py-2 text-sm outline-none focus:border-maroon";

export function QuickAddProducts({ categories, brands }: { categories: Category[]; brands: Brand[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([emptyRow()]);
  const [publishAll, setPublishAll] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ successCount: number; total: number; errors: string[] } | null>(null);
  const loadedRef = useRef(false);

  // Auto-save the draft to localStorage as they type — this is the "auto
  // save" part. Nothing touches Supabase until "Upload Semua" is clicked.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Row[];
        if (Array.isArray(parsed) && parsed.length > 0) setRows(parsed);
      } catch {
        // ignore corrupt draft
      }
    }
    loadedRef.current = true;
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return; // don't overwrite the saved draft with the initial empty row before it's loaded
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  function updateRow(key: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r._key === key ? { ...r, ...patch } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, emptyRow()]);
  }

  function removeRow(key: string) {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r._key !== key) : prev));
  }

  async function handlePhoto(key: string, file: File) {
    if (!SUPABASE_CONFIGURED) return;
    updateRow(key, { _uploading: true });
    const supabase = createClient();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, "-")}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: false });
    if (error) {
      updateRow(key, { _uploading: false });
      return;
    }
    const url = supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
    updateRow(key, { image_url: url, _uploading: false });
  }

  async function handleSubmit() {
    setSubmitting(true);
    setResult(null);
    const payload = rows
      .filter((r) => r.name.trim())
      .map(({ _key, _uploading, ...rest }) => ({ ...rest, status: publishAll ? "published" as const : "draft" as const }));

    if (payload.length === 0) {
      setSubmitting(false);
      return;
    }

    const res = await saveProductsBatch(payload);
    setResult(res);
    setSubmitting(false);

    if (res.errors.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      setTimeout(() => router.push("/admin/products"), 1200);
    }
  }

  const filledCount = rows.filter((r) => r.name.trim()).length;

  return (
    <div>
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={row._key} className="rounded-2xl border border-line bg-white p-4">
            <div className="flex items-start gap-3">
              <label className="relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-line bg-photo-frame">
                {row._uploading ? (
                  <Loader2 size={18} className="animate-spin text-muted" />
                ) : row.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={row.image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <ImagePlus size={18} className="text-muted" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={row._uploading || !SUPABASE_CONFIGURED}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePhoto(row._key, file);
                    e.target.value = "";
                  }}
                />
              </label>

              <div className="grid flex-1 gap-2 sm:grid-cols-6">
                <input
                  placeholder={`Nama produk #${i + 1}`}
                  value={row.name}
                  onChange={(e) => updateRow(row._key, { name: e.target.value })}
                  className={`${inputClass} sm:col-span-2`}
                />
                <select
                  value={row.category_id ?? ""}
                  onChange={(e) => updateRow(row._key, { category_id: e.target.value || null })}
                  className={inputClass}
                >
                  <option value="">Kategori</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <select
                  value={row.brand_id ?? ""}
                  onChange={(e) => updateRow(row._key, { brand_id: e.target.value || null })}
                  className={inputClass}
                >
                  <option value="">Brand</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min={0}
                  placeholder="Harga"
                  value={row.price || ""}
                  onChange={(e) => updateRow(row._key, { price: Number(e.target.value) || 0 })}
                  className={inputClass}
                />
                <input
                  type="number"
                  min={0}
                  placeholder="Harga lokal"
                  value={row.local_price ?? ""}
                  onChange={(e) => updateRow(row._key, { local_price: e.target.value ? Number(e.target.value) : null })}
                  className={inputClass}
                />
              </div>

              <button
                onClick={() => removeRow(row._key)}
                disabled={rows.length === 1}
                className="mt-1 text-muted hover:text-coral disabled:opacity-30"
                title="Hapus baris"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addRow}
        className="mt-3 flex items-center gap-1.5 rounded-full border border-dashed border-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-maroon hover:text-maroon"
      >
        <Plus size={15} /> Tambah Baris
      </button>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          <input type="checkbox" checked={publishAll} onChange={(e) => setPublishAll(e.target.checked)} className="rounded border-line" />
          Langsung tayang semua produk ini
        </label>

        <button
          onClick={handleSubmit}
          disabled={submitting || filledCount === 0 || !SUPABASE_CONFIGURED}
          className="flex items-center gap-2 rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-cream disabled:opacity-50"
        >
          {submitting && <Loader2 size={15} className="animate-spin" />}
          {submitting ? "Mengunggah..." : `Upload Semua (${filledCount} Produk)`}
        </button>
      </div>

      {!SUPABASE_CONFIGURED && (
        <p className="mt-2 text-xs text-muted">Sambungkan Supabase dulu untuk bisa upload.</p>
      )}

      {result && (
        <div className={`mt-4 rounded-xl px-4 py-3 text-sm ${result.errors.length > 0 ? "bg-ember/15 text-ink-soft" : "bg-flame/10 text-flame"}`}>
          <div className="flex items-center gap-2 font-medium">
            {result.errors.length > 0 ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            {result.successCount} dari {result.total} produk berhasil disimpan.
          </div>
          {result.errors.length > 0 && (
            <ul className="mt-2 list-inside list-disc space-y-0.5 text-xs">
              {result.errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
