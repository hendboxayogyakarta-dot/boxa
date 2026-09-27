"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "./require-admin";

export async function addProductLicense(formData: FormData) {
  const { supabase } = await requireAdmin();

  const productId = formData.get("product_id");
  const brandId = formData.get("brand_id");
  if (typeof productId !== "string" || typeof brandId !== "string" || !brandId) {
    throw new Error("Pilih lisensi dulu.");
  }

  const { error } = await supabase
    .from("product_licenses")
    .upsert({ product_id: productId, brand_id: brandId }, { onConflict: "product_id,brand_id" });
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/products/${productId}/edit`);
}

export async function removeProductLicense(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id");
  const productId = formData.get("product_id");
  if (typeof id !== "string") throw new Error("Lisensi tidak ditemukan.");

  const { error } = await supabase.from("product_licenses").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (typeof productId === "string") revalidatePath(`/admin/products/${productId}/edit`);
}
