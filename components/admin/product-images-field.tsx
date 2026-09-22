"use client";

import { useState } from "react";
import { ImagePlus, Loader2, X, ArrowLeft, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "product-images";
const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

/**
 * Renders thumbnails for the product's photos, lets the admin add more
 * (uploaded straight to Storage — no URLs to copy/paste), reorder, and
 * remove. The first photo is always the primary one. Keeps a hidden
 * textarea named "images" in sync so the existing saveProduct Server
 * Action (lib/actions/products.ts) doesn't need to change at all — it
 * still just reads one URL per line.
 */
export function ProductImagesField({ initialUrls }: { initialUrls: string[] }) {
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0 || !SUPABASE_CONFIGURED) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const uploaded: string[] = [];
    for (const file of files) {
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, "-")}`;
      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false });
      if (uploadError) {
        setError(`Upload gagal: ${uploadError.message}`);
        continue;
      }
      uploaded.push(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
    }

    setUrls((prev) => [...prev, ...uploaded]);
    setUploading(false);
    e.target.value = "";
  }

  function remove(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    setUrls((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div>
      <input type="hidden" name="images" value={urls.join("\n")} />

      {!SUPABASE_CONFIGURED && (
        <p className="mb-3 rounded-lg bg-ember/10 px-3 py-2 text-xs text-ink-soft">
          Upload foto butuh Supabase Storage aktif. Sambungkan dulu — lihat README.md.
        </p>
      )}

      {urls.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {urls.map((url, i) => (
            <div key={url + i} className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-photo-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-1 top-1 rounded-full bg-maroon px-1.5 py-0.5 text-[9px] font-semibold text-cream">
                  Utama
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-ink/60 opacity-0 transition-opacity group-hover:opacity-100">
                {i > 0 && (
                  <button type="button" onClick={() => move(i, -1)} className="rounded-full bg-cream p-1 text-ink hover:bg-white" title="Pindah ke kiri">
                    <ArrowLeft size={12} />
                  </button>
                )}
                {i < urls.length - 1 && (
                  <button type="button" onClick={() => move(i, 1)} className="rounded-full bg-cream p-1 text-ink hover:bg-white" title="Pindah ke kanan">
                    <ArrowRight size={12} />
                  </button>
                )}
                <button type="button" onClick={() => remove(i)} className="rounded-full bg-cream p-1 text-coral hover:bg-white" title="Hapus">
                  <X size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <label className="flex h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-line text-muted transition-colors hover:border-maroon">
        {uploading ? <Loader2 size={20} className="animate-spin" /> : <ImagePlus size={20} />}
        <span className="text-xs">{uploading ? "Mengunggah..." : "Klik untuk tambah foto (bisa pilih beberapa sekaligus)"}</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="hidden"
          disabled={uploading || !SUPABASE_CONFIGURED}
        />
      </label>
      {error && <p className="mt-2 text-xs text-coral">{error}</p>}
    </div>
  );
}
