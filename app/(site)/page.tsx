import { getAllApprovedReviews, getBanners, getCategories, getProducts, getSiteSettings, getStores } from "@/lib/data";
import { StoreLogoStrip } from "@/components/sections/store-logo-strip";
import { BannerCarousel } from "@/components/sections/banner-carousel";
import { CategoryIconStrip } from "@/components/sections/category-icon-strip";
import { UspStrip } from "@/components/sections/usp-strip";
import { JourneyStrip } from "@/components/sections/journey-strip";
import { ProductRail } from "@/components/sections/product-rail";
import { CategoryShowcase } from "@/components/sections/category-showcase";
import { CurationSection } from "@/components/sections/curation-section";
import { ReviewsSection, DeliveryBanner } from "@/components/sections/misc-sections";
import type { Product } from "@/lib/types";

// Cache the rendered page for 60s (ISR) instead of hitting Supabase on
// every single visit — a product catalog doesn't need to be live to the
// second, and this cuts homepage load time dramatically under traffic.
export const revalidate = 60;

export default async function HomePage() {
  const [settings, banners, categories, stores, allProducts, featured, newArrivals, rareSecret, reviews] = await Promise.all([
    getSiteSettings(),
    getBanners(),
    getCategories(),
    getStores(),
    getProducts(),
    getProducts({ featured: true }),
    getProducts({ isNew: true }),
    getProducts({ rareOrSecret: true }),
    getAllApprovedReviews(),
  ]);

  const sectionEnabled = (key: string) =>
    settings.homepage_sections.find((s) => s.key === key)?.enabled ?? true;

  const productsByCategory = new Map<string, Product>();
  for (const p of allProducts) {
    if (!productsByCategory.has(p.category_id)) productsByCategory.set(p.category_id, p);
  }

  return (
    <>
      <BannerCarousel banners={banners} settings={settings} />
      <UspStrip
        tagline={settings.tagline}
        subtitle={settings.copy.usp_subtitle}
        primaryCtaText={settings.hero.cta_text}
        primaryCtaHref={settings.hero.cta_href}
        secondaryCtaText={settings.hero.secondary_cta_text ?? "Cari Local Price"}
        secondaryCtaHref={settings.hero.secondary_cta_href ?? "/shop?local=1"}
      />
      <JourneyStrip />
      <CategoryIconStrip categories={categories} />

      {sectionEnabled("featured") && (
        <ProductRail title="Pilihan BOXA" subtitle="Produk yang lagi kami rekomendasikan" products={featured} viewAllHref="/shop?featured=1" />
      )}

      {sectionEnabled("new_arrivals") && (
        <ProductRail title="Baru Datang" products={newArrivals} viewAllHref="/shop?new=1" />
      )}

      {sectionEnabled("rare_secret") && (
        <ProductRail title="Rare & Secret Finds" subtitle="Stok terbatas, kadang gak akan ada lagi" products={rareSecret} viewAllHref="/shop?rare=1" />
      )}

      {sectionEnabled("categories") && (
        <CategoryShowcase categories={categories} productsByCategory={productsByCategory} />
      )}
      {sectionEnabled("why_boxa") && (
        <CurationSection title={settings.copy.curation_title} subtitle={settings.copy.curation_subtitle} />
      )}
      <StoreLogoStrip stores={stores} />
      {sectionEnabled("reviews") && <ReviewsSection reviews={reviews} />}
      {sectionEnabled("delivery") && <DeliveryBanner settings={settings} />}
    </>
  );
}
