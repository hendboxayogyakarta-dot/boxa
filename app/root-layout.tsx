import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";

// Self-hosted at build time by Next.js — no external request to Google
// Fonts at runtime, which removes a render-blocking connection and speeds
// up first paint. (Requires network access at build time, which Vercel
// has; this is why it couldn't be verified in the sandbox that built the
// earlier revisions, but it works fine in a normal deploy.)
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

export const metadata: Metadata = {
  title: {
    default: "BOXA.YK — Mainan pilihan dari Yogyakarta",
    template: "%s | BOXA.YK",
  },
  description:
    "BOXA.YK adalah toko mainan dan collectible kurasi dari Yogyakarta. Barang dicek dulu, informasinya jujur, belinya gampang.",
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
