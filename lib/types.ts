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
  /** Whether this product can actually be picked up / COD'd locally in
   * Yogyakarta. Matters for affiliate/dropship listings (e.g. a Shopee
   * affiliate link) that BOXA doesn't physically stock — even if
   * local_price is set as a reference, turning this off hides the local
   * pickup option and falls back to the plain online-only experience. */
  offline_available: boolean;
  /** Custom label for the recommendation badge (e.g. "Best Seller",
   * "Favorit Pelanggan"). Only used when offline_available is false —
   * falls back to the default "Rekomendasi BOXA" when empty. */
  recommendation_note: string | null;
  /** Optional reusable brand/license logo (see Brand) — distinct from the
   * free-text `brand` field above so existing products keep working
   * unchanged; this is additive. */
  brand_id: string | null;
  brand_logo?: Brand;
  /** Which marketplace the online purchase link (shopee_url) actually
   * goes to — drives the online button's label/logo in PriceComparison
   * and OrderCta. Defaults to showing a generic label when unset. */
  marketplace_id: string | null;
  marketplace?: Marketplace;
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

/**
 * A reusable logo — either a toy manufacturer/brand (Blokees, Hot Toys,
 * ZD Toy) or a character/franchise license (Transformers, One Piece,
 * Gundam). Upload the logo once here, then attach it to as many products
 * as needed from the product form — no re-uploading per product.
 */
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  status: "active" | "hidden";
  sort_order: number;
}

/** Same shape as Brand — a reusable logo, but for the marketplace a
 * product's online purchase link points to (Shopee, Tokopedia, Lazada,
 * ...). Since this is affiliate-based, different products can point
 * anywhere; the logo + label just need to match wherever admin actually
 * put the link. Kept as its own table/type (not reused as Brand) so
 * "which factory made this toy" and "where do I buy it" stay separate
 * concepts even though the shape is identical. */
export type Marketplace = Brand;

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
  /** Narrative copy used in a few fixed spots around the site — kept
   * editable here instead of hardcoded so nothing needs a code change
   * to reword. Every field has a sensible built-in fallback if left
   * blank (see the components that read them). */
  copy: {
    usp_subtitle: string;
    curation_title: string;
    curation_subtitle: string;
    rekomendasi_intro: string;
    request_toy_message: string;
  };
  seo: {
    site_title: string;
    meta_description: string;
    og_image: string | null;
  };
}
