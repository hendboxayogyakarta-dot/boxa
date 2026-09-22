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
