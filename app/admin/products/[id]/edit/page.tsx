import { notFound } from "next/navigation";
import { getAllBrandsForAdmin, getAllCategoriesForAdmin, getAllMarketplacesForAdmin, getAllStoresForAdmin, getProductByIdForAdmin } from "@/lib/data";
import { ProductForm } from "@/components/admin/product-form";
import { ProductStoreRefs } from "@/components/admin/product-store-refs";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories, brands, marketplaces, stores] = await Promise.all([
    getProductByIdForAdmin(id),
    getAllCategoriesForAdmin(),
    getAllBrandsForAdmin(),
    getAllMarketplacesForAdmin(),
    getAllStoresForAdmin(),
  ]);
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Edit Produk</h1>
      <div className="mt-5 max-w-3xl space-y-8">
        <ProductStoreRefs product={product} stores={stores} />
        <ProductForm product={product} categories={categories} brands={brands} marketplaces={marketplaces} />
      </div>
    </div>
  );
}
