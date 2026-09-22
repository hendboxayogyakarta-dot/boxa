import { saveBanner } from "@/lib/actions/banners";
import { BannerImageField } from "@/components/admin/banner-image-field";
import type { Banner } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-maroon";

export function BannerForm({ banner }: { banner?: Banner }) {
  return (
    <form action={saveBanner} className="max-w-lg space-y-4 rounded-2xl border border-line bg-white p-5">
      {banner && <input type="hidden" name="id" value={banner.id} />}

      <BannerImageField initialUrl={banner?.image_url} />

      <label className="block">
        <span className="text-sm font-medium text-ink">Link Tujuan</span>
        <input
          name="link_url"
          defaultValue={banner?.link_url ?? ""}
          placeholder="/shop?featured=1"
          className={inputClass}
        />
        <span className="mt-1 block text-xs text-muted">Ke mana pembeli diarahkan kalau banner ini diklik.</span>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Teks Alternatif</span>
        <input name="alt_text" defaultValue={banner?.alt_text ?? ""} className={inputClass} />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-ink">Urutan</span>
          <input type="number" name="sort_order" defaultValue={banner?.sort_order ?? 0} className={inputClass} />
        </label>
        <label className="mt-6 flex items-center gap-2 text-sm text-ink-soft">
          <input type="checkbox" name="enabled" defaultChecked={banner?.enabled ?? true} className="rounded border-line" />
          Tampilkan
        </label>
      </div>

      <button type="submit" className="rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-deep">
        Simpan Banner
      </button>
    </form>
  );
}
