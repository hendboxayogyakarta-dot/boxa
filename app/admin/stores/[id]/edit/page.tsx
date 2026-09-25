import { notFound } from "next/navigation";
import { getAllStoresForAdmin } from "@/lib/data";
import { StoreForm } from "@/components/admin/store-form";

export default async function EditStorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stores = await getAllStoresForAdmin();
  const store = stores.find((s) => s.id === id);
  if (!store) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Edit Toko</h1>
      <div className="mt-5"><StoreForm store={store} /></div>
    </div>
  );
}
