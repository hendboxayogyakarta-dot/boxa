import { MarketplaceForm } from "@/components/admin/marketplace-form";

export default function NewMarketplacePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Tambah Marketplace</h1>
      <div className="mt-5"><MarketplaceForm /></div>
    </div>
  );
}
