"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "./require-admin";

export async function moderateReview(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || typeof status !== "string") {
    throw new Error("Data tidak lengkap.");
  }

  const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/reviews");
  revalidatePath("/", "layout");
}

export async function deleteReview(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string") throw new Error("Ulasan tidak ditemukan.");

  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/reviews");
}
