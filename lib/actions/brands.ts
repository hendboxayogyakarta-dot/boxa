"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";
import { slugify } from "@/lib/utils";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}

export async function saveBrand(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = str(formData, "id");
  const rawName = str(formData, "name");
  const name = rawName ?? "Brand Baru";
  const slugSource = str(formData, "slug") ?? (rawName ?? `${name}-${Date.now().toString(36)}`);
  const slug = slugify(slugSource);

  const payload = {
    name,
    slug,
    logo_url: str(formData, "logo_url"),
    status: str(formData, "status") ?? "active",
    sort_order: Number(str(formData, "sort_order") ?? "0") || 0,
  };

  if (id) {
    const { error } = await supabase.from("brands").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("brands").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/brands");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/admin/brands");
}

export async function deleteBrand(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData, "id");
  if (!id) throw new Error("Brand tidak ditemukan.");

  const { error } = await supabase.from("brands").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/brands");
  revalidatePath("/shop");
}
