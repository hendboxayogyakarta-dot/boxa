/**
 * Client-side image prep for admin uploads.
 *
 * Takes whatever the phone gives us (HEIC/HEIF from iPhone, huge JPEGs,
 * PNG screenshots...), shrinks it to a web-friendly size and re-encodes it
 * as WebP, so product pages stay light and every browser can show it.
 * The HEIC decoder is only downloaded when a HEIC file is actually picked.
 */

const MAX_SIDE = 1600;
const QUALITY = 0.82;
// Formats we leave untouched (vector / animated).
const PASS_THROUGH = ["image/svg+xml", "image/gif"];

export const IMAGE_ACCEPT = "image/*,.heic,.heif";

function isHeic(file: File) {
  return /image\/hei[cf]/i.test(file.type) || /\.(heic|heif)$/i.test(file.name);
}

async function decode(file: File): Promise<ImageBitmap> {
  let blob: Blob = file;
  if (isHeic(file)) {
    // Safari can decode HEIC natively; try that before loading the library.
    try {
      return await createImageBitmap(blob);
    } catch {
      const { heicTo } = await import("heic-to");
      blob = await heicTo({ blob: file, type: "image/jpeg", quality: 0.9 });
    }
  }
  return createImageBitmap(blob, { imageOrientation: "from-image" });
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
}

export type PreparedImage = { file: File; savedPercent: number };

/** Returns a lightweight WebP File (or the original if it can't be improved). */
export async function prepareImage(file: File): Promise<File> {
  return (await prepareImageDetailed(file)).file;
}

export async function prepareImageDetailed(file: File): Promise<PreparedImage> {
  if (PASS_THROUGH.includes(file.type)) return { file, savedPercent: 0 };

  const bitmap = await decode(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();

  // WebP first; some old browsers silently return PNG, so check the type.
  let blob = await toBlob(canvas, "image/webp", QUALITY);
  let ext = "webp";
  if (!blob || blob.type !== "image/webp") {
    blob = await toBlob(canvas, "image/jpeg", 0.85);
    ext = "jpg";
  }
  if (!blob) throw new Error("Foto tidak bisa diproses.");

  // Never make a non-HEIC file bigger than it already was.
  if (!isHeic(file) && blob.size >= file.size && scale === 1) {
    return { file, savedPercent: 0 };
  }

  const base = file.name.replace(/\.[^.]+$/, "") || "foto";
  const out = new File([blob], `${base}.${ext}`, { type: blob.type });
  return { file: out, savedPercent: Math.max(0, Math.round((1 - out.size / file.size) * 100)) };
}
