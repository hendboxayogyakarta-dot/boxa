import type { Category, Product, Review, SiteSettings } from "./types";
import { mockCategories, mockProducts, mockReviews, mockSettings } from "./mock-data";

/**
 * This module is the single seam between the UI and the data source.
 *
 * Right now NEXT_PUBLIC_SUPABASE_URL is unset, so every function below
 * returns the typed mock data from lib/mock-data.ts and the site renders
 * fully — nothing is hardcoded into components.
 *
 * Once a real Supabase project exists (see db/schema.sql + README.md),
 * set the env vars and swap each function's body for the commented
 * Supabase query beneath it. Component code never has to change.
 */

const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!SUPABASE_CONFIGURED) return mockSettings;

  // const supabase = await createClient();
  // const { data } = await supabase.from("website_settings").select("*").single();
  // return data as SiteSettings;
  return mockSettings;
}

export async function getCategories(): Promise<Category[]> {
  if (!SUPABASE_CONFIGURED) return mockCategories;

  // const supabase = await createClient();
  // const { data } = await supabase
  //   .from("categories")
  //   .select("*")
  //   .eq("status", "active")
  //   .order("sort_order");
  // return data as Category[];
  return mockCategories;
}

export async function getProducts(filters?: {
  category?: string;
  featured?: boolean;
  isNew?: boolean;
  rareOrSecret?: boolean;
  search?: string;
  sort?: "newest" | "price_asc" | "price_desc" | "popularity" | "featured";
}): Promise<Product[]> {
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

  // Supabase equivalent (once connected):
  // const supabase = await createClient();
  // let query = supabase.from("products").select("*, category:categories(*), images:product_images(*)").eq("status", "published");
  // ...apply .eq/.ilike/.order based on filters, then `return (await query).data`

  return items;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!SUPABASE_CONFIGURED) {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }
  // const supabase = await createClient();
  // const { data } = await supabase
  //   .from("products")
  //   .select("*, category:categories(*), images:product_images(*)")
  //   .eq("slug", slug)
  //   .single();
  // return data as Product | null;
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  return mockProducts
    .filter((p) => p.id !== product.id && p.category_id === product.category_id)
    .slice(0, 4);
}

export async function getApprovedReviews(productId: string): Promise<Review[]> {
  if (!SUPABASE_CONFIGURED) {
    return mockReviews.filter((r) => r.product_id === productId && r.status === "approved");
  }
  // const supabase = await createClient();
  // const { data } = await supabase
  //   .from("reviews")
  //   .select("*")
  //   .eq("product_id", productId)
  //   .eq("status", "approved")
  //   .order("created_at", { ascending: false });
  // return data as Review[];
  return mockReviews.filter((r) => r.product_id === productId && r.status === "approved");
}

export async function getAllApprovedReviews(): Promise<Review[]> {
  return mockReviews.filter((r) => r.status === "approved");
}
