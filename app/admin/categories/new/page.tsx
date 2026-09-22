import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Tambah Kategori</h1>
      <div className="mt-5"><CategoryForm /></div>
    </div>
  );
}
