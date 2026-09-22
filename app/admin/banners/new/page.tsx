import { BannerForm } from "@/components/admin/banner-form";

export default function NewBannerPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Tambah Banner</h1>
      <div className="mt-5"><BannerForm /></div>
    </div>
  );
}
