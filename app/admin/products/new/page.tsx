import { getAllBrandsForAdmin, getAllCategoriesForAdmin, getAllMarketplacesForAdmin } from "@/lib/data";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  const [categories, brands, marketplaces] = await Promise.all([
    getAllCategoriesForAdmin(),
    getAllBrandsForAdmin(),
    getAllMarketplacesForAdmin(),
  ]);
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Tambah Produk</h1>
      <div className="mt-5">
        <ProductForm categories={categories} brands={brands} marketplaces={marketplaces} />
      </div>
    </div>
  );
}
