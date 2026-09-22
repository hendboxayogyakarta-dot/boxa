"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";
import { slugify, linesToArray } from "@/lib/utils";

function num(formData: FormData, key: string): number | null {
  const v = formData.get(key);
  if (v === null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

/**
 * Creates or updates a product depending on whether `id` is present in the
 * form. Also replaces the product's image rows from the newline-separated
 * URL list (simplest reliable approach without a full upload widget — see
 * media.ts for the Storage-backed uploader used to generate those URLs).
 */
export async function saveProduct(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = str(formData, "id");
  const rawName = str(formData, "name");
  const name = rawName ?? "Produk Tanpa Nama";
  // Auto-generated names get a unique suffix so two blank-name drafts
  // don't collide on the unique slug column.
  const slugSource = str(formData, "slug") ?? (rawName ?? `${name}-${Date.now().toString(36)}`);
  const slug = slugify(slugSource);

  const payload = {
    name,
    slug,
    sku: str(formData, "sku"),
    short_description: str(formData, "short_description"),
    description: str(formData, "description") ?? "",
    price: num(formData, "price") ?? 0,
    compare_price: num(formData, "compare_price"),
    local_price: num(formData, "local_price"),
    offline_available: formData.get("offline_available") === "on",
    brand_id: str(formData, "brand_id"),
    stock_quantity: num(formData, "stock_quantity") ?? 0,
    stock_status: str(formData, "stock_status") ?? "in_stock",
    sold_count: num(formData, "sold_count") ?? 0,
    category_id: str(formData, "category_id"),
    brand: str(formData, "brand"),
    series: str(formData, "series"),
    condition: str(formData, "condition") ?? "new_sealed",
    sealed_or_built: str(formData, "sealed_or_built") ?? "n/a",
    rarity: str(formData, "rarity"),
    is_featured: bool(formData, "is_featured"),
    is_new: bool(formData, "is_new"),
    is_rare: bool(formData, "is_rare"),
    is_secret: bool(formData, "is_secret"),
    is_boxa_approved: bool(formData, "is_boxa_approved"),
    boxa_score: num(formData, "boxa_score"),
    location: str(formData, "location"),
    delivery_available: bool(formData, "delivery_available"),
    instant_delivery_available: bool(formData, "instant_delivery_available"),
    cta_type: str(formData, "cta_type") ?? "WHATSAPP",
    shopee_url: str(formData, "shopee_url"),
    whatsapp_url: str(formData, "whatsapp_url"),
    external_order_url: str(formData, "external_order_url"),
    warranty_type: str(formData, "warranty_type"),
    warranty_description: str(formData, "warranty_description"),
    pros: linesToArray(formData.get("pros")),
    cons: linesToArray(formData.get("cons")),
    what_is_included: linesToArray(formData.get("what_is_included")),
    what_is_not_included: linesToArray(formData.get("what_is_not_included")),
    status: str(formData, "status") ?? "draft",
  };

  let productId = id;

  if (id) {
    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase.from("products").insert(payload).select("id").single();
    if (error) throw new Error(error.message);
    productId = data.id;
  }

  // Replace images: simplest consistent approach for a textarea-driven form.
  const imageUrls = linesToArray(formData.get("images"));
  await supabase.from("product_images").delete().eq("product_id", productId!);
  if (imageUrls.length > 0) {
    const rows = imageUrls.map((url, i) => ({
      product_id: productId,
      url,
      is_primary: i === 0,
      sort_order: i,
    }));
    const { error } = await supabase.from("product_images").insert(rows);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/admin/products");
}

export interface QuickProductInput {
  name: string;
  category_id: string | null;
  brand_id: string | null;
  price: number;
  local_price: number | null;
  stock_quantity: number;
  image_url: string | null;
  status: "draft" | "published";
}

/**
 * Bulk product creation for the Quick Add page — the whole point is filling
 * in many rows client-side (auto-saved to localStorage as a draft, not the
 * database) and only touching Supabase once, here, when the admin hits the
 * final "Upload" button. cta_type defaults to SHOPEE for every row, matching
 * the affiliate-first setup (see price-comparison.tsx) — edit a product's
 * full details afterwards if any of them need a different link type.
 */
export async function saveProductsBatch(
  items: QuickProductInput[]
): Promise<{ successCount: number; total: number; errors: string[] }> {
  const { supabase } = await requireAdmin();

  let successCount = 0;
  const errors: string[] = [];

  for (const item of items) {
    const name = item.name?.trim();
    if (!name) continue; // skip blank rows silently

    const slug = slugify(`${name}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`);

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        slug,
        price: item.price || 0,
        local_price: item.local_price,
        stock_quantity: item.stock_quantity || 0,
        stock_status: (item.stock_quantity || 0) > 0 ? "in_stock" : "sold_out",
        category_id: item.category_id,
        brand_id: item.brand_id,
        cta_type: "SHOPEE",
        status: item.status,
        description: "",
      })
      .select("id")
      .single();

    if (error || !data) {
      errors.push(`${name}: ${error?.message ?? "gagal disimpan"}`);
      continue;
    }

    if (item.image_url) {
      const { error: imgError } = await supabase
        .from("product_images")
        .insert({ product_id: data.id, url: item.image_url, is_primary: true, sort_order: 0 });
      if (imgError) errors.push(`${name}: foto gagal disimpan (${imgError.message})`);
    }

    successCount++;
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");

  return { successCount, total: items.length, errors };
}

export async function deleteProduct(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData, "id");
  if (!id) throw new Error("Produk tidak ditemukan.");

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function toggleProductStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData, "id");
  const status = str(formData, "status");
  if (!id || !status) throw new Error("Data tidak lengkap.");

  const { error } = await supabase.from("products").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}
