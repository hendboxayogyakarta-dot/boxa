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
