"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "./require-admin";

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

export async function updateSettings(formData: FormData) {
  const { supabase } = await requireAdmin();

  const payload = {
    brand_name: str(formData, "brand_name") || "BOXA.YK",
    tagline: str(formData, "tagline"),
    whatsapp_number: str(formData, "whatsapp_number"),
    instagram_url: str(formData, "instagram_url"),
    tiktok_url: str(formData, "tiktok_url"),
    shopee_url: str(formData, "shopee_url"),
    address: str(formData, "address"),
    primary_color: str(formData, "primary_color") || "#591C1F",
    secondary_color: str(formData, "secondary_color") || "#E4590C",
    accent_color: str(formData, "accent_color") || "#F5A924",
    hero: {
      enabled: bool(formData, "hero_enabled"),
      badge: str(formData, "hero_badge"),
      title: str(formData, "hero_title"),
      subtitle: str(formData, "hero_subtitle"),
      cta_text: str(formData, "hero_cta_text"),
      cta_href: str(formData, "hero_cta_href") || "/shop",
      secondary_cta_text: str(formData, "hero_secondary_cta_text") || null,
      secondary_cta_href: str(formData, "hero_secondary_cta_href") || null,
      image_url: null,
      featured_product_id: null,
    },
    delivery: {
      enabled: bool(formData, "delivery_enabled"),
      service_area: str(formData, "delivery_service_area"),
      free_delivery_enabled: bool(formData, "free_delivery_enabled"),
      free_delivery_minimum: Number(str(formData, "free_delivery_minimum") || "0") || null,
      notes: str(formData, "delivery_notes"),
    },
    seo: {
      site_title: str(formData, "seo_title"),
      meta_description: str(formData, "seo_description"),
      og_image: null,
    },
  };

  const { error } = await supabase.from("website_settings").update(payload).eq("id", 1);
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
}

export async function toggleSection(formData: FormData) {
  const { supabase } = await requireAdmin();
  const key = formData.get("key");
  const enabled = formData.get("enabled") === "true";
  if (typeof key !== "string") throw new Error("Section tidak ditemukan.");

  const { error } = await supabase
    .from("homepage_sections")
    .update({ enabled: !enabled })
    .eq("key", key);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/cms");
  revalidatePath("/");
}
