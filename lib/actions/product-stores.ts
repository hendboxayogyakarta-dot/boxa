"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "./require-admin";

export async function addProductStore(formData: FormData) {
  const { supabase } = await requireAdmin();

  const productId = formData.get("product_id");
  const storeId = formData.get("store_id");
  if (typeof productId !== "string" || typeof storeId !== "string" || !storeId) {
    throw new Error("Pilih toko dulu.");
  }

  const productUrl = formData.get("product_url");
  const price = formData.get("price");

  const { error } = await supabase.from("product_stores").upsert(
    {
      product_id: productId,
      store_id: storeId,
      product_url: typeof productUrl === "string" && productUrl.trim() ? productUrl.trim() : null,
      price: typeof price === "string" && price.trim() ? Number(price) : null,
    },
    { onConflict: "product_id,store_id" }
  );
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/products/${productId}/edit`);
  revalidatePath("/rekomendasi");
}

export async function removeProductStore(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id");
  const productId = formData.get("product_id");
  if (typeof id !== "string") throw new Error("Referensi toko tidak ditemukan.");

  const { error } = await supabase.from("product_stores").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (typeof productId === "string") revalidatePath(`/admin/products/${productId}/edit`);
}
