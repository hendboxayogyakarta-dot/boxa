import { StoreForm } from "@/components/admin/store-form";

export default function NewStorePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Tambah Toko / Store Reference</h1>
      <div className="mt-5"><StoreForm /></div>
    </div>
  );
}
