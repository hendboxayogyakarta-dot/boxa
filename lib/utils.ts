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

export function stockLabel(status: string): string {
  const map: Record<string, string> = {
    in_stock: "Tersedia",
    low_stock: "Stok Terbatas",
    sold_out: "Habis",
    preorder: "Pre-Order",
  };
  return map[status] ?? status;
}
