"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

  // Merge into the existing hero JSON rather than overwrite it — the CMS
  // form only edits title/subtitle now (the banner carousel replaced the
  // rest), so badge/CTA fields from earlier setup are preserved as-is.
  const { data: existing } = await supabase.from("website_settings").select("hero").eq("id", 1).single();
  const currentHero = existing?.hero ?? {};

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
      ...currentHero,
      title: str(formData, "hero_title"),
      subtitle: str(formData, "hero_subtitle"),
    },
    delivery: {
      enabled: bool(formData, "delivery_enabled"),
      service_area: str(formData, "delivery_service_area"),
      free_delivery_enabled: bool(formData, "free_delivery_enabled"),
      free_delivery_minimum: Number(str(formData, "free_delivery_minimum") || "0") || null,
      notes: str(formData, "delivery_notes"),
    },
    copy: {
      usp_subtitle: str(formData, "copy_usp_subtitle"),
      curation_title: str(formData, "copy_curation_title"),
      curation_subtitle: str(formData, "copy_curation_subtitle"),
      rekomendasi_intro: str(formData, "copy_rekomendasi_intro"),
      request_toy_message: str(formData, "copy_request_toy_message"),
    },
    about: {
      headline: str(formData, "about_headline"),
      paragraph1: str(formData, "about_paragraph1"),
      paragraph2: str(formData, "about_paragraph2"),
      paragraph3: str(formData, "about_paragraph3"),
      pillar1_title: str(formData, "about_pillar1_title"),
      pillar1_text: str(formData, "about_pillar1_text"),
      pillar2_title: str(formData, "about_pillar2_title"),
      pillar2_text: str(formData, "about_pillar2_text"),
      pillar3_title: str(formData, "about_pillar3_title"),
      pillar3_text: str(formData, "about_pillar3_text"),
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
  redirect("/admin/cms?saved=1");
}

/**
 * Called directly from a client component (not bound to a <form> action),
 * so it takes a plain argument rather than FormData — used right after a
 * logo file finishes uploading to Storage.
 */
export async function updateLogoUrl(url: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("website_settings").update({ logo_url: url }).eq("id", 1);
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
