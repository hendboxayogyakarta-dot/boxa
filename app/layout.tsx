import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site-config";
import "./globals.css";

// Self-hosted at build time by Next.js — no external request to Google
// Fonts at runtime, which removes a render-blocking connection and speeds
// up first paint.
const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// No root-level `alternates.canonical` on purpose: metadata fields are
// inherited by any page that doesn't set its own, so a root "/" would
// silently mark such a page as a duplicate of the homepage. Every
// indexable page (home, shop, kategori, product, tentang, pilihan-online)
// sets its own canonical instead.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BOXA.YK — Toko Mainan & Collectibles Yogyakarta",
    template: "%s | BOXA.YK",
  },
  description:
    "BOXA.YK adalah toko mainan dan collectibles di Yogyakarta. Temukan toys, action figure, model kit, blind box, dan collectibles pilihan. Tersedia COD Jogja dan pengiriman.",
  keywords: [
    "toko mainan Jogja",
    "toko mainan Yogyakarta",
    "toko collectibles Jogja",
    "action figure Jogja",
    "model kit Jogja",
    "blind box Jogja",
    "mainan original Jogja",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "BOXA.YK",
    url: SITE_URL,
    title: "BOXA.YK — Toko Mainan & Collectibles Yogyakarta",
    description:
      "Temukan toys & collectibles pilihan di Yogyakarta. COD Jogja, delivery, dan Build Service untuk model kit tertentu.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BOXA.YK — Toko Mainan & Collectibles Yogyakarta",
    description: "Temukan toys & collectibles pilihan di Yogyakarta. COD Jogja, delivery, dan Build Service.",
  },
};

export const viewport = {
  themeColor: "#591C1F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${baloo.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
