import { getSiteSettings } from "@/lib/data";
import { updateSettings, toggleSection } from "@/lib/actions/settings";

const inputClass =
  "mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-maroon";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export default async function AdminCmsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Website / CMS</h1>
      <p className="mt-1 max-w-xl text-sm text-muted">
        Semua isi di bawah ini tersimpan di tabel <code className="rounded bg-cream-warm px-1 py-0.5 text-xs">website_settings</code>{" "}
        dan langsung tampil di halaman depan setelah disimpan — tidak perlu ubah kode.
      </p>

      <form action={updateSettings} className="mt-6 max-w-2xl space-y-8">
        <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
          <h2 className="font-display text-base font-bold text-ink">Branding</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nama Brand">
              <input name="brand_name" defaultValue={settings.brand_name} className={inputClass} />
            </Field>
            <Field label="Tagline">
              <input name="tagline" defaultValue={settings.tagline} className={inputClass} />
            </Field>
            <Field label="Warna Primer">
              <input type="color" name="primary_color" defaultValue={settings.primary_color} className="mt-1 h-10 w-full rounded-lg border border-line" />
            </Field>
            <Field label="Warna Sekunder">
              <input type="color" name="secondary_color" defaultValue={settings.secondary_color} className="mt-1 h-10 w-full rounded-lg border border-line" />
            </Field>
            <Field label="Warna Aksen">
              <input type="color" name="accent_color" defaultValue={settings.accent_color} className="mt-1 h-10 w-full rounded-lg border border-line" />
            </Field>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
          <h2 className="font-display text-base font-bold text-ink">Hero Homepage</h2>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input type="checkbox" name="hero_enabled" defaultChecked={settings.hero.enabled} className="rounded border-line" />
            Tampilkan hero
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Badge">
              <input name="hero_badge" defaultValue={settings.hero.badge} className={inputClass} />
            </Field>
            <Field label="Judul">
              <input name="hero_title" defaultValue={settings.hero.title} className={inputClass} />
            </Field>
          </div>
          <Field label="Subjudul">
            <textarea name="hero_subtitle" defaultValue={settings.hero.subtitle} rows={2} className={inputClass} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Teks CTA Utama">
              <input name="hero_cta_text" defaultValue={settings.hero.cta_text} className={inputClass} />
            </Field>
            <Field label="Link CTA Utama">
              <input name="hero_cta_href" defaultValue={settings.hero.cta_href} className={inputClass} />
            </Field>
            <Field label="Teks CTA Kedua">
              <input name="hero_secondary_cta_text" defaultValue={settings.hero.secondary_cta_text ?? ""} className={inputClass} />
            </Field>
            <Field label="Link CTA Kedua">
              <input name="hero_secondary_cta_href" defaultValue={settings.hero.secondary_cta_href ?? ""} className={inputClass} />
            </Field>
          </div>
          <p className="text-xs text-muted">
            Hero juga otomatis menampilkan produk-produk berlabel &ldquo;Featured&rdquo; secara bergantian —
            atur label itu lewat halaman Produk.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
          <h2 className="font-display text-base font-bold text-ink">Pengiriman</h2>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input type="checkbox" name="delivery_enabled" defaultChecked={settings.delivery.enabled} className="rounded border-line" />
            Tampilkan section pengiriman
          </label>
          <Field label="Area Layanan">
            <input name="delivery_service_area" defaultValue={settings.delivery.service_area} className={inputClass} />
          </Field>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input type="checkbox" name="free_delivery_enabled" defaultChecked={settings.delivery.free_delivery_enabled} className="rounded border-line" />
            Gratis ongkir aktif
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Minimum Gratis Ongkir (Rp)">
              <input type="number" name="free_delivery_minimum" defaultValue={settings.delivery.free_delivery_minimum ?? ""} className={inputClass} />
            </Field>
          </div>
          <Field label="Catatan Pengiriman">
            <textarea name="delivery_notes" defaultValue={settings.delivery.notes} rows={2} className={inputClass} />
          </Field>
        </section>

        <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
          <h2 className="font-display text-base font-bold text-ink">Kontak & Sosial</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nomor WhatsApp" hint="Format 62xxxxxxxxxx, tanpa spasi atau +.">
              <input name="whatsapp_number" defaultValue={settings.whatsapp_number} className={inputClass} />
            </Field>
            <Field label="Instagram">
              <input name="instagram_url" defaultValue={settings.instagram_url} className={inputClass} />
            </Field>
            <Field label="TikTok">
              <input name="tiktok_url" defaultValue={settings.tiktok_url} className={inputClass} />
            </Field>
            <Field label="Shopee">
              <input name="shopee_url" defaultValue={settings.shopee_url} className={inputClass} />
            </Field>
          </div>
          <Field label="Alamat">
            <input name="address" defaultValue={settings.address} className={inputClass} />
          </Field>
        </section>

        <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
          <h2 className="font-display text-base font-bold text-ink">SEO</h2>
          <Field label="Judul Situs">
            <input name="seo_title" defaultValue={settings.seo.site_title} className={inputClass} />
          </Field>
          <Field label="Meta Description">
            <textarea name="seo_description" defaultValue={settings.seo.meta_description} rows={2} className={inputClass} />
          </Field>
        </section>

        <button type="submit" className="rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-cream hover:bg-maroon-deep">
          Simpan Perubahan
        </button>
      </form>

      <section className="mt-8 max-w-2xl rounded-2xl border border-line bg-white p-5">
        <h2 className="font-display text-base font-bold text-ink">Section Homepage</h2>
        <p className="mt-1 text-sm text-muted">Aktif/nonaktifkan section yang tampil di halaman depan.</p>
        <div className="mt-4 space-y-2">
          {settings.homepage_sections.map((s) => (
            <div key={s.key} className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
              <span className="text-sm font-medium text-ink">{s.title ?? s.key}</span>
              <form action={toggleSection}>
                <input type="hidden" name="key" value={s.key} />
                <input type="hidden" name="enabled" value={String(s.enabled)} />
                <button
                  type="submit"
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    s.enabled ? "bg-flame/10 text-flame" : "bg-cream-warm text-ink-soft"
                  }`}
                >
                  {s.enabled ? "Aktif" : "Nonaktif"}
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
