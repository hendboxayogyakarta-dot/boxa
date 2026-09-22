"use client";

import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateLogoUrl } from "@/lib/actions/settings";

const BUCKET = "media-library";
const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

export function LogoUploader({ currentUrl }: { currentUrl: string | null }) {
  const [preview, setPreview] = useState(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !SUPABASE_CONFIGURED) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `logo-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, "-")}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false });

    if (uploadError) {
      setUploading(false);
      setError(`Upload gagal: ${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    try {
      await updateLogoUrl(data.publicUrl);
      setPreview(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan logo.");
    }
    setUploading(false);
    e.target.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-line bg-cream-warm">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Logo BOXA.YK" className="h-full w-full object-contain" />
        ) : (
          <ImagePlus size={20} className="text-muted" />
        )}
      </div>
      <label className="cursor-pointer rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink-soft hover:border-maroon">
        {uploading ? <Loader2 size={14} className="inline animate-spin" /> : "Ganti Logo"}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading || !SUPABASE_CONFIGURED} />
      </label>
      {error && <span className="text-xs text-coral">{error}</span>}
      {!SUPABASE_CONFIGURED && <span className="text-xs text-muted">Sambungkan Supabase dulu</span>}
    </div>
  );
}
