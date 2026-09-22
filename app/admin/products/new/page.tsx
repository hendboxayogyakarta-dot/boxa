import { getAllBrandsForAdmin, getAllCategoriesForAdmin } from "@/lib/data";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([getAllCategoriesForAdmin(), getAllBrandsForAdmin()]);
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Tambah Produk</h1>
      <div className="mt-5">
        <ProductForm categories={categories} brands={brands} />
      </div>
    </div>
  );
}
