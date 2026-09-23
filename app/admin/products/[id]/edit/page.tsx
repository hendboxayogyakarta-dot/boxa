import { notFound } from "next/navigation";
import { getAllBrandsForAdmin, getAllCategoriesForAdmin, getAllMarketplacesForAdmin, getProductByIdForAdmin } from "@/lib/data";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories, brands, marketplaces] = await Promise.all([
    getProductByIdForAdmin(id),
    getAllCategoriesForAdmin(),
    getAllBrandsForAdmin(),
    getAllMarketplacesForAdmin(),
  ]);
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Edit Produk</h1>
      <div className="mt-5">
        <ProductForm product={product} categories={categories} brands={brands} marketplaces={marketplaces} />
      </div>
    </div>
  );
}
