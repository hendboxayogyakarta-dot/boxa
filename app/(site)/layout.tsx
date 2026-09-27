import { getSiteSettings } from "@/lib/data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteThemeProvider } from "@/components/site-theme-provider";
import { CartProvider } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { SITE_URL } from "@/lib/site-config";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  // Store, not a generic Organization — matches what BOXA actually is
  // (a toy & collectibles shop, not a broad company/brand). Only real
  // values go in; sameAs only lists accounts that are actually set.
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: settings.brand_name,
    url: SITE_URL,
    logo: settings.logo_url ?? `${SITE_URL}/icon.png`,
    description: settings.seo.meta_description,
    areaServed: { "@type": "City", name: "Yogyakarta" },
    sameAs: [settings.instagram_url, settings.tiktok_url, settings.shopee_url].filter(Boolean),
  };

  return (
    <SiteThemeProvider>
      <CartProvider>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader settings={settings} />
        <main className="pb-16 md:pb-0">{children}</main>
        <SiteFooter settings={settings} />
        <MobileBottomNav settings={settings} />
        <CartDrawer whatsappNumber={settings.whatsapp_number} />
      </CartProvider>
    </SiteThemeProvider>
  );
}
