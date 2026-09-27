import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "BOXA.YK — Toko Mainan & Collectibles Yogyakarta", template: "%s | BOXA.YK" },
  description: "test",
};
export const viewport = { themeColor: "#591C1F" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="id"><body className="antialiased">{children}</body></html>);
}
