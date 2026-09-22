export type CtaType = "SHOPEE" | "WHATSAPP" | "EXTERNAL_URL";
export type StockStatus = "in_stock" | "low_stock" | "sold_out" | "preorder";
export type Condition = "new_sealed" | "new_built" | "pre_owned_like_new" | "pre_owned_good";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  icon: string | null;
  status: "active" | "hidden";
  sort_order: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  is_primary: boolean;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  short_description: string;
  description: string; // rich text (markdown-ish)
  price: number;
  compare_price: number | null;
  /** Optional cheaper price for local pickup in Yogyakarta — BOXA's
   * "Original Toys, Local Prices" USP. Null/undefined means this product
   * only has the one (online) price, and the product page shows the
   * existing single-price experience unchanged. */
  local_price: number | null;
  stock_quantity: number;
  stock_status: StockStatus;
  category_id: string;
  category?: Category;
  brand: string | null;
  series: string | null;
  condition: Condition;
  sealed_or_built: "sealed" | "built" | "n/a";
  rarity: "common" | "rare" | "secret" | "limited" | null;
  is_featured: boolean;
  is_new: boolean;
  is_rare: boolean;
  is_secret: boolean;
  is_boxa_approved: boolean;
  boxa_score: number | null; // 0-10
  location: string | null;
  delivery_available: boolean;
  instant_delivery_available: boolean;
  cta_type: CtaType;
  shopee_url: string | null;
  whatsapp_url: string | null;
  external_order_url: string | null;
  warranty_type: string | null;
  warranty_description: string | null;
  pros: string[];
  cons: string[];
  what_is_included: string[];
  what_is_not_included: string[];
  sold_count: number;
  view_count: number;
  images: ProductImage[];
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number; // 1-5
  review: string;
  image_url: string | null;
  verified_purchase: boolean;
  status: "pending" | "approved" | "rejected" | "hidden";
  created_at: string;
}

export interface Banner {
  id: string;
  image_url: string;
  link_url: string | null;
  alt_text: string | null;
  enabled: boolean;
  sort_order: number;
}

export interface HeroSettings {
  enabled: boolean;
  badge: string;
  title: string;
  subtitle: string;
  image_url: string | null;
  cta_text: string;
  cta_href: string;
  secondary_cta_text: string | null;
  secondary_cta_href: string | null;
  /**
   * When set, the hero pulls name/image/price/category live from this
   * product (admin picks a product as the hero — see spec section 4);
   * title/subtitle/cta above act as manual overrides on top of it.
   * The homepage cycles through the featured-products list either way,
   * this just anchors slide 1.
   */
  featured_product_id: string | null;
}

export interface HomepageSection {
  key: string;
  title: string | null;
  subtitle: string | null;
  enabled: boolean;
  sort_order: number;
}

export interface SiteSettings {
  brand_name: string;
  tagline: string;
  logo_url: string | null;
  favicon_url: string | null;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  whatsapp_number: string;
  instagram_url: string;
  tiktok_url: string;
  shopee_url: string;
  address: string;
  hero: HeroSettings;
  delivery: {
    enabled: boolean;
    service_area: string;
    free_delivery_enabled: boolean;
    free_delivery_minimum: number | null;
    notes: string;
  };
  homepage_sections: HomepageSection[];
  seo: {
    site_title: string;
    meta_description: string;
    og_image: string | null;
  };
}
