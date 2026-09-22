"use client";

import { useCallback, useEffect, useState } from "react";
import { ImagePlus, Copy, Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "media-library";
const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

interface MediaFile {
  name: string;
  url: string;
}

export function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!SUPABASE_CONFIGURED) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.storage.from(BUCKET).list("", {
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) {
      setError(`Gagal memuat media: ${error.message}. Pastikan bucket "${BUCKET}" sudah dibuat di Supabase Storage.`);
      setFiles([]);
    } else {
      setError(null);
      setFiles(
        (data ?? [])
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .map((f) => ({
            name: f.name,
            url: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
          }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !SUPABASE_CONFIGURED) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, "-")}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false });

    setUploading(false);
    e.target.value = "";

    if (error) {
      setError(`Upload gagal: ${error.message}`);
      return;
    }
    refresh();
  }

  async function handleDelete(name: string) {
    if (!SUPABASE_CONFIGURED) return;
    const supabase = createClient();
    const { error } = await supabase.storage.from(BUCKET).remove([name]);
    if (error) {
      setError(`Hapus gagal: ${error.message}`);
      return;
    }
    refresh();
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url).catch(() => {});
  }

  if (!SUPABASE_CONFIGURED) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line text-muted">
        <ImagePlus size={28} />
        <span className="text-sm">Belum ada media — sambungkan Supabase Storage dulu (lihat README.md)</span>
      </div>
    );
  }

  return (
    <div>
      <label className="flex h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-white text-muted transition-colors hover:border-maroon">
        {uploading ? <Loader2 size={24} className="animate-spin" /> : <ImagePlus size={24} />}
        <span className="text-sm">{uploading ? "Mengunggah..." : "Klik untuk unggah gambar"}</span>
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
      </label>

      {error && (
        <p className="mt-3 rounded-lg bg-coral/10 px-3 py-2 text-xs text-coral">{error}</p>
      )}

      {loading ? (
        <p className="mt-6 text-sm text-muted">Memuat...</p>
      ) : files.length === 0 && !error ? (
        <p className="mt-6 text-sm text-muted">Belum ada gambar. Unggah yang pertama di atas.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {files.map((f) => (
            <div key={f.name} className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-cream-warm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-ink/60 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => copyUrl(f.url)} title="Salin URL" className="rounded-full bg-cream p-1.5 text-ink hover:bg-white">
                  <Copy size={14} />
                </button>
                <button onClick={() => handleDelete(f.name)} title="Hapus" className="rounded-full bg-cream p-1.5 text-coral hover:bg-white">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
