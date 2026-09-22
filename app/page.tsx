import { getAllApprovedReviews, getCategories, getProducts, getSiteSettings } from "@/lib/data";
import { Hero } from "@/components/sections/hero";
import { ProductRail } from "@/components/sections/product-rail";
import { CategoriesGrid, DeliveryBanner, ReviewsSection, WhyBoxa } from "@/components/sections/misc-sections";

export default async function HomePage() {
  const [settings, categories, featured, newArrivals, rareSecret, reviews] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getProducts({ featured: true }),
    getProducts({ isNew: true }),
    getProducts({ rareOrSecret: true }),
    getAllApprovedReviews(),
  ]);

  const sectionEnabled = (key: string) =>
    settings.homepage_sections.find((s) => s.key === key)?.enabled ?? true;

  return (
    <>
      <Hero hero={settings.hero} spotlightProducts={featured} />

      {sectionEnabled("featured") && (
        <ProductRail title="Pilihan BOXA" subtitle="Produk yang lagi kami rekomendasikan" products={featured} viewAllHref="/shop?featured=1" />
      )}

      {sectionEnabled("new_arrivals") && featured.length > 0 && (
        <ProductRail title="Baru Datang" products={newArrivals} viewAllHref="/shop?new=1" />
      )}

      {sectionEnabled("rare_secret") && (
        <ProductRail title="Rare & Secret Finds" subtitle="Stok terbatas, kadang gak akan ada lagi" products={rareSecret} viewAllHref="/shop?rare=1" />
      )}

      {sectionEnabled("categories") && <CategoriesGrid categories={categories} />}
      {sectionEnabled("why_boxa") && <WhyBoxa />}
      {sectionEnabled("reviews") && <ReviewsSection reviews={reviews} />}
      {sectionEnabled("delivery") && <DeliveryBanner settings={settings} />}
    </>
  );
}
