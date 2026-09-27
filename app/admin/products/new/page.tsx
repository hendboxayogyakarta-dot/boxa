import { getAllBrandsForAdmin, getAllCategoriesForAdmin, getAllStoresForAdmin } from "@/lib/data";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  const [categories, brands, stores] = await Promise.all([
    getAllCategoriesForAdmin(),
    getAllBrandsForAdmin(),
    getAllStoresForAdmin(),
  ]);
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Tambah Produk</h1>
      <div className="mt-5">
        <ProductForm categories={categories} brands={brands} stores={stores} />
      </div>
    </div>
  );
}
