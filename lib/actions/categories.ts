"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "./require-admin";
import { slugify } from "@/lib/utils";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}

export async function saveCategory(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = str(formData, "id");
  const name = str(formData, "name");
  if (!name) throw new Error("Nama kategori wajib diisi.");
  const slug = slugify(str(formData, "slug") ?? name);

  const payload = {
    name,
    slug,
    description: str(formData, "description"),
    image_url: str(formData, "image_url"),
    icon: str(formData, "icon"),
    status: str(formData, "status") ?? "active",
    sort_order: Number(str(formData, "sort_order") ?? "0") || 0,
  };

  if (id) {
    const { error } = await supabase.from("categories").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("categories").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/categories");
  revalidatePath("/shop");
  revalidatePath("/");
}

export async function deleteCategory(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData, "id");
  if (!id) throw new Error("Kategori tidak ditemukan.");

  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  revalidatePath("/shop");
}
