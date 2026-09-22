"use client";

import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "media-library";
const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

export function BannerImageField({ initialUrl }: { initialUrl?: string }) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !SUPABASE_CONFIGURED) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `banner-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, "-")}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false });

    setUploading(false);
    e.target.value = "";

    if (uploadError) {
      setError(`Upload gagal: ${uploadError.message}`);
      return;
    }
    setUrl(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
  }

  return (
    <div>
      <input type="hidden" name="image_url" value={url} />
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="Preview banner" className="mb-3 aspect-[16/5] w-full rounded-xl border border-line object-cover" />
      ) : (
        <div className="mb-3 flex aspect-[16/5] w-full items-center justify-center rounded-xl border border-dashed border-line text-xs text-muted">
          Belum ada gambar
        </div>
      )}
      <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink-soft hover:border-maroon">
        {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
        {url ? "Ganti Gambar" : "Unggah Gambar"}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading || !SUPABASE_CONFIGURED} />
      </label>
      {error && <p className="mt-2 text-xs text-coral">{error}</p>}
      <p className="mt-1 text-xs text-muted">Rasio disarankan 16:5 (mis. 1600×500px) supaya tidak terpotong.</p>
    </div>
  );
}
