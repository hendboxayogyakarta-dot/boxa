import { notFound } from "next/navigation";
import { getAllMarketplacesForAdmin } from "@/lib/data";
import { MarketplaceForm } from "@/components/admin/marketplace-form";

export default async function EditMarketplacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const marketplaces = await getAllMarketplacesForAdmin();
  const marketplace = marketplaces.find((m) => m.id === id);
  if (!marketplace) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Edit Marketplace</h1>
      <div className="mt-5"><MarketplaceForm marketplace={marketplace} /></div>
    </div>
  );
}
