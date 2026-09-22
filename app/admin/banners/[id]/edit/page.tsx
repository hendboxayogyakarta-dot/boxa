import { notFound } from "next/navigation";
import { getAllBannersForAdmin } from "@/lib/data";
import { BannerForm } from "@/components/admin/banner-form";

export default async function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const banners = await getAllBannersForAdmin();
  const banner = banners.find((b) => b.id === id);
  if (!banner) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Edit Banner</h1>
      <div className="mt-5"><BannerForm banner={banner} /></div>
    </div>
  );
}
