import { notFound } from "next/navigation";
import { getAllCategoriesForAdmin } from "@/lib/data";
import { CategoryForm } from "@/components/admin/category-form";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categories = await getAllCategoriesForAdmin();
  const category = categories.find((c) => c.id === id);
  if (!category) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Edit Kategori</h1>
      <div className="mt-5"><CategoryForm category={category} /></div>
    </div>
  );
}
