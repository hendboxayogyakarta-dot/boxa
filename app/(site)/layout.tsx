import { getSiteSettings } from "@/lib/data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteThemeProvider } from "@/components/site-theme-provider";
import { CartProvider } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <SiteThemeProvider>
      <CartProvider>
        <SiteHeader settings={settings} />
        <main className="pb-16 md:pb-0">{children}</main>
        <SiteFooter settings={settings} />
        <MobileBottomNav settings={settings} />
        <CartDrawer whatsappNumber={settings.whatsapp_number} />
      </CartProvider>
    </SiteThemeProvider>
  );
}
