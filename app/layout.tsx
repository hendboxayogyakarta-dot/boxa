import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    default: "BOXA.YK — Mainan pilihan dari Yogyakarta",
    template: "%s | BOXA.YK",
  },
  description:
    "BOXA.YK adalah toko mainan dan collectible kurasi dari Yogyakarta. Barang dicek dulu, informasinya jujur, belinya gampang.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html lang="id">
      <head>
        {/* Loaded as a stylesheet link rather than next/font so the build
            doesn't require build-time network access to fonts.googleapis.com
            (irrelevant on Vercel, which has it — this just keeps local/CI
            builds resilient). Swap for next/font/google any time. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SiteHeader settings={settings} />
        <main>{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
