"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";
import { slugify } from "@/lib/utils";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}

export async function saveStore(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = str(formData, "id");
  const rawName = str(formData, "name");
  const name = rawName ?? "Toko Baru";
  const slugSource = str(formData, "slug") ?? (rawName ?? `${name}-${Date.now().toString(36)}`);
  const slug = slugify(slugSource);

  const payload = {
    name,
    slug,
    logo_url: str(formData, "logo_url"),
    description: str(formData, "description"),
    platform: str(formData, "platform"),
    link: str(formData, "link"),
    location: str(formData, "location"),
    status: str(formData, "status") ?? "active",
    relationship_type: str(formData, "relationship_type") ?? "reference",
    sort_order: Number(str(formData, "sort_order") ?? "0") || 0,
  };

  if (id) {
    const { error } = await supabase.from("stores").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("stores").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/stores");
  revalidatePath("/", "layout");
  redirect("/admin/stores");
}

export async function deleteStore(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData, "id");
  if (!id) throw new Error("Toko tidak ditemukan.");

  const { error } = await supabase.from("stores").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/stores");
  revalidatePath("/", "layout");
}
