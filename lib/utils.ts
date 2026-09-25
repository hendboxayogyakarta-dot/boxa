import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function conditionLabel(condition: string): string {
  const map: Record<string, string> = {
    new_sealed: "Baru, Segel",
    new_built: "Baru, Sudah Dirakit",
    pre_owned_like_new: "Preloved, Sangat Baik",
    pre_owned_good: "Preloved, Baik",
  };
  return map[condition] ?? condition;
}

/**
 * Builds a pre-filled WhatsApp message for a product enquiry/order, so an
 * admin never has to hand-craft a chat link per product — just the site's
 * one WhatsApp number plus whatever the product record already has (name,
 * condition, the price being asked about) is enough.
 */
export function buildWhatsAppOrderLink(
  whatsappNumber: string,
  product: { name: string; condition: string },
  priceLabel: string,
  price: number
): string {
  const lines = [
    "Halo BOXA, saya mau tanya/pesan produk ini:",
    "",
    product.name,
    `Kondisi: ${conditionLabel(product.condition)}`,
    `${priceLabel}: ${formatIDR(price)}`,
    "",
    "Apakah masih tersedia?",
  ];
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * For affiliate listings added in a hurry — price left blank (0) shows a
 * recommendation badge instead of "Rp 0", so an unfinished product still
 * looks intentional rather than broken.
 */
export function hasPrice(price: number): boolean {
  return price > 0;
}

/**
 * A product with offline_available = false is a pure affiliate listing —
 * no COD/local pickup, so its price display is replaced by a
 * recommendation instead (see getFallbackDescription and the product
 * card/detail page). Backed by boxa_score where set, so it reads as an
 * actual evaluation rather than a generic "we recommend everything" badge.
 */
export function isRecommendationProduct(product: { offline_available: boolean }): boolean {
  return !product.offline_available;
}

/** Whether the product page should show the "Tempat Beli" (StoreOptions)
 * section — local pickup, linked stores, or the legacy single online
 * link — instead of falling back to the plain <OrderCta>. */
export function hasStoreOptions(product: {
  local_price: number | null;
  offline_available: boolean;
  store_refs?: { id: string }[];
  shopee_url: string | null;
}): boolean {
  const showLocal = product.local_price != null && product.offline_available;
  const hasStores = (product.store_refs?.length ?? 0) > 0 || Boolean(product.shopee_url);
  return showLocal || hasStores;
}

/**
 * Builds a generic-but-relevant description from whatever fields ARE
 * filled in (category, brand, condition), for products where the admin
 * hasn't had time to write a real one yet — always points shoppers to
 * the marketplace link for the actual details/photos.
 */
export function getFallbackDescription(product: {
  category?: { name: string } | null;
  condition: string;
  brand?: string | null;
  marketplace?: { name: string } | null;
}): string {
  const bits: string[] = [];
  if (product.category?.name) bits.push(product.category.name);
  if (product.brand) bits.push(`dari ${product.brand}`);
  const lead = bits.length > 0 ? bits.join(" ") + ". " : "";
  const marketplaceName = product.marketplace?.name ?? "marketplace kami";
  return `${lead}Kondisi: ${conditionLabel(product.condition)}. Cek detail lengkap dan foto asli produk via ${marketplaceName}.`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function linesToArray(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== "string") return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function stockLabel(status: string): string {
  const map: Record<string, string> = {
    in_stock: "Tersedia",
    low_stock: "Stok Terbatas",
    sold_out: "Habis",
    preorder: "Pre-Order",
  };
  return map[status] ?? status;
}
