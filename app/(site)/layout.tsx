import { getSiteSettings } from "@/lib/data";
import { BoxaSidebar } from "@/components/boxa-sidebar";
import { BoxaTopNav } from "@/components/boxa-topnav";
import { BoxaFooter } from "@/components/boxa-footer";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <div className="boxa-site">
      <BoxaSidebar settings={settings} />
      <BoxaTopNav settings={settings} />
      <main className="md:pl-[76px]">{children}</main>
      <BoxaFooter settings={settings} />
    </div>
  );
}
