import { notFound } from "next/navigation";
import { getAllBrandsForAdmin } from "@/lib/data";
import { BrandForm } from "@/components/admin/brand-form";

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brands = await getAllBrandsForAdmin();
  const brand = brands.find((b) => b.id === id);
  if (!brand) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Edit Brand / Lisensi</h1>
      <div className="mt-5"><BrandForm brand={brand} /></div>
    </div>
  );
}
