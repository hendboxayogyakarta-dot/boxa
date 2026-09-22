"use client";

import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

/**
 * Drop-in single-image uploader used by any admin form that needs one
 * image URL (category thumbnail, banner, etc). Uploads straight to the
 * given Storage bucket and keeps a hidden input named `name` in sync, so
 * the parent <form action={serverAction}> submits the resulting URL
 * exactly like a normal text field — no separate "copy the URL" step.
 */
export function ImageUploadField({
  name,
  bucket,
  initialUrl,
  aspect = "aspect-square",
}: {
  name: string;
  bucket: "product-images" | "media-library";
  initialUrl?: string | null;
  aspect?: string;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !SUPABASE_CONFIGURED) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, "-")}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });

    setUploading(false);
    e.target.value = "";

    if (uploadError) {
      setError(`Upload gagal: ${uploadError.message}`);
      return;
    }
    setUrl(supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl);
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className={`mb-2 w-full rounded-xl border border-line object-cover ${aspect}`} />
      ) : (
        <div className={`mb-2 flex w-full items-center justify-center rounded-xl border border-dashed border-line text-xs text-muted ${aspect}`}>
          Belum ada gambar
        </div>
      )}
      <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink-soft hover:border-maroon">
        {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
        {url ? "Ganti Gambar" : "Unggah Gambar"}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading || !SUPABASE_CONFIGURED} />
      </label>
      {error && <p className="mt-2 text-xs text-coral">{error}</p>}
      {!SUPABASE_CONFIGURED && <p className="mt-1 text-xs text-muted">Sambungkan Supabase dulu untuk upload.</p>}
    </div>
  );
}
