import type { Category, Product, Review, SiteSettings } from "./types";
import { mockCategories, mockProducts, mockReviews, mockSettings } from "./mock-data";
import { createClient } from "./supabase/server";

/**
 * This module is the single seam between the UI and the data source.
 *
 * If NEXT_PUBLIC_SUPABASE_URL is unset, every function below returns the
 * typed mock data from lib/mock-data.ts so the site still renders fully.
 * Once it's set, these run real Supabase queries against the schema in
 * db/schema.sql. Component code never has to change either way.
 */

const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

function mapSettingsRow(row: any): SiteSettings {
  return {
    brand_name: row.brand_name,
    tagline: row.tagline,
    logo_url: row.logo_url,
    favicon_url: row.favicon_url,
    primary_color: row.primary_color,
    secondary_color: row.secondary_color,
    accent_color: row.accent_color,
    whatsapp_number: row.whatsapp_number,
    instagram_url: row.instagram_url,
    tiktok_url: row.tiktok_url,
    shopee_url: row.shopee_url,
    address: row.address,
    hero: row.hero ?? mockSettings.hero,
    delivery: row.delivery ?? mockSettings.delivery,
    seo: row.seo ?? mockSettings.seo,
    homepage_sections: mockSettings.homepage_sections, // overwritten by getHomepageSections() below
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!SUPABASE_CONFIGURED) return mockSettings;

  const supabase = await createClient();
  const [{ data: settingsRow }, sections] = await Promise.all([
    supabase.from("website_settings").select("*").eq("id", 1).single(),
    getHomepageSections(),
  ]);

  if (!settingsRow) return mockSettings;
  return { ...mapSettingsRow(settingsRow), homepage_sections: sections };
}

async function getHomepageSections() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("homepage_sections")
    .select("*")
    .order("sort_order");
  return (data as SiteSettings["homepage_sections"]) ?? mockSettings.homepage_sections;
}

export async function getCategories(): Promise<Category[]> {
  if (!SUPABASE_CONFIGURED) return mockCategories;

  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("status", "active")
    .order("sort_order");
  return (data as Category[]) ?? [];
}

export async function getProducts(filters?: {
  category?: string;
  featured?: boolean;
  isNew?: boolean;
  rareOrSecret?: boolean;
  search?: string;
  sort?: "newest" | "price_asc" | "price_desc" | "popularity" | "featured";
}): Promise<Product[]> {
  if (!SUPABASE_CONFIGURED) {
    return filterAndSortMock(filters);
  }

  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*, category:categories(*), images:product_images(*)")
    .eq("status", "published");

  if (filters?.category) {
    query = query.eq("category.slug", filters.category);
  }
  if (filters?.featured) query = query.eq("is_featured", true);
  if (filters?.isNew) query = query.eq("is_new", true);
  if (filters?.rareOrSecret) query = query.or("is_rare.eq.true,is_secret.eq.true");
  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,series.ilike.%${filters.search}%`
    );
  }
  switch (filters?.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "popularity":
      query = query.order("sold_count", { ascending: false });
      break;
    case "featured":
      query = query.order("is_featured", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data } = await query;
  return (data as Product[]) ?? [];
}

function filterAndSortMock(filters?: Parameters<typeof getProducts>[0]): Product[] {
  let items = [...mockProducts];
  if (filters?.category) {
    items = items.filter((p) => {
      const cat = mockCategories.find((c) => c.id === p.category_id);
      return cat?.slug === filters.category;
    });
  }
  if (filters?.featured) items = items.filter((p) => p.is_featured);
  if (filters?.isNew) items = items.filter((p) => p.is_new);
  if (filters?.rareOrSecret) items = items.filter((p) => p.is_rare || p.is_secret);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.brand ?? "").toLowerCase().includes(q) ||
        (p.series ?? "").toLowerCase().includes(q)
    );
  }
  switch (filters?.sort) {
    case "price_asc":
      items.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      items.sort((a, b) => b.price - a.price);
      break;
    case "popularity":
      items.sort((a, b) => b.sold_count - a.sold_count);
      break;
    case "featured":
      items.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
      break;
    default:
      items.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  }
  return items;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!SUPABASE_CONFIGURED) {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*, category:categories(*), images:product_images(*)")
    .eq("slug", slug)
    .single();
  return (data as Product) ?? null;
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  if (!SUPABASE_CONFIGURED) {
    return mockProducts
      .filter((p) => p.id !== product.id && p.category_id === product.category_id)
      .slice(0, 4);
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*, category:categories(*), images:product_images(*)")
    .eq("category_id", product.category_id)
    .eq("status", "published")
    .neq("id", product.id)
    .limit(4);
  return (data as Product[]) ?? [];
}

export async function getApprovedReviews(productId: string): Promise<Review[]> {
  if (!SUPABASE_CONFIGURED) {
    return mockReviews.filter((r) => r.product_id === productId && r.status === "approved");
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  return (data as Review[]) ?? [];
}

export async function getAllApprovedReviews(): Promise<Review[]> {
  if (!SUPABASE_CONFIGURED) {
    return mockReviews.filter((r) => r.status === "approved");
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(12);
  return (data as Review[]) ?? [];
}
