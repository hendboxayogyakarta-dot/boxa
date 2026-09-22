"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}

export async function saveBanner(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = str(formData, "id");

  const payload = {
    // Banners without an image are kept as drafts — getBanners() only
    // returns ones that actually have an image, so an incomplete banner
    // never breaks the homepage carousel.
    image_url: str(formData, "image_url") ?? "",
    link_url: str(formData, "link_url"),
    alt_text: str(formData, "alt_text"),
    enabled: formData.get("enabled") === "on",
    sort_order: Number(str(formData, "sort_order") ?? "0") || 0,
  };

  if (id) {
    const { error } = await supabase.from("banners").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("banners").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/banners");
  revalidatePath("/");
  redirect("/admin/banners");
}

export async function deleteBanner(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData, "id");
  if (!id) throw new Error("Banner tidak ditemukan.");

  const { error } = await supabase.from("banners").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function toggleBanner(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData, "id");
  const enabled = formData.get("enabled") === "true";
  if (!id) throw new Error("Banner tidak ditemukan.");

  const { error } = await supabase.from("banners").update({ enabled: !enabled }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/banners");
  revalidatePath("/");
}
