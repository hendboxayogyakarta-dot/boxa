import { getAllApprovedReviews, getCategories, getProducts, getSiteSettings } from "@/lib/data";
import { HeroShowcase } from "@/components/sections/hero-showcase";
import { ProductRail } from "@/components/sections/product-rail";
import { CategoryShowcase } from "@/components/sections/category-showcase";
import { CurationSection } from "@/components/sections/curation-section";
import { ReviewsSection, DeliveryBanner } from "@/components/sections/misc-sections";
import type { Product } from "@/lib/types";

export default async function HomePage() {
  const [settings, categories, allProducts, featured, newArrivals, rareSecret, reviews] = await Promise.all([
    getSiteSettings(),
    getCategories(),
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
      <HeroShowcase hero={settings.hero} products={featured.length > 0 ? featured : allProducts} />

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
      {sectionEnabled("why_boxa") && <CurationSection />}
      {sectionEnabled("reviews") && <ReviewsSection reviews={reviews} />}
      {sectionEnabled("delivery") && <DeliveryBanner settings={settings} />}
    </>
  );
}
