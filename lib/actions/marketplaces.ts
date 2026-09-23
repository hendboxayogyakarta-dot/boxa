"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";
import { slugify } from "@/lib/utils";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}

export async function saveMarketplace(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = str(formData, "id");
  const rawName = str(formData, "name");
  const name = rawName ?? "Marketplace Baru";
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
    const { error } = await supabase.from("marketplaces").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("marketplaces").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/marketplaces");
  revalidatePath("/shop");
  revalidatePath("/", "layout");
  redirect("/admin/marketplaces");
}

export async function deleteMarketplace(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData, "id");
  if (!id) throw new Error("Marketplace tidak ditemukan.");

  const { error } = await supabase.from("marketplaces").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/marketplaces");
}
