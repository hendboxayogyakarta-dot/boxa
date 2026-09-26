import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import { updateSettings, toggleSection } from "@/lib/actions/settings";
import { LogoUploader } from "@/components/admin/logo-uploader";
import { SubmitButton } from "@/components/admin/submit-button";

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

export default async function AdminCmsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const settings = await getSiteSettings();
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Website / CMS</h1>
      {saved === "1" && (
        <div className="mt-4 rounded-xl bg-flame/10 px-4 py-3 text-sm font-medium text-flame">
          Perubahan tersimpan.
        </div>
      )}
      <p className="mt-1 max-w-xl text-sm text-muted">
        Semua isi di bawah ini tersimpan di tabel <code className="rounded bg-cream-warm px-1 py-0.5 text-xs">website_settings</code>{" "}
        dan langsung tampil di halaman depan setelah disimpan — tidak perlu ubah kode.
      </p>

      <form action={updateSettings} className="mt-6 max-w-2xl space-y-8">
        <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
          <h2 className="font-display text-base font-bold text-ink">Branding</h2>
          <div>
            <span className="text-sm font-medium text-ink">Logo</span>
            <div className="mt-1">
              <LogoUploader currentUrl={settings.logo_url} />
            </div>
          </div>
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
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-ink">Banner Homepage</h2>
            <Link href="/admin/banners" className="flex items-center gap-1 text-xs font-semibold text-maroon hover:text-flame">
              Kelola Banner <ArrowRight size={13} />
            </Link>
          </div>
          <p className="text-sm text-muted">
            Gambar yang bergeser di paling atas halaman depan diatur dari halaman{" "}
            <Link href="/admin/banners" className="font-semibold text-maroon">Banner</Link> — tinggal
            unggah gambar, tidak perlu isi teks manual.
          </p>
          <div className="border-t border-line pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Teks Cadangan</p>
            <p className="mt-1 text-xs text-muted">Dipakai kalau belum ada banner yang diunggah sama sekali.</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Field label="Judul">
                <input name="hero_title" defaultValue={settings.hero.title} className={inputClass} />
              </Field>
              <Field label="Subjudul">
                <input name="hero_subtitle" defaultValue={settings.hero.subtitle} className={inputClass} />
              </Field>
            </div>
          </div>
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
          <h2 className="font-display text-base font-bold text-ink">Narasi Website</h2>
          <p className="text-xs text-muted">Teks-teks kecil yang tersebar di beberapa halaman — ubah sesuka hati, tanpa perlu ubah kode.</p>
          <Field label="Subjudul di bawah slogan beranda">
            <input name="copy_usp_subtitle" defaultValue={settings.copy.usp_subtitle} className={inputClass} />
          </Field>
          <Field label="Judul section 'Kenapa BOXA'">
            <input name="copy_curation_title" defaultValue={settings.copy.curation_title} className={inputClass} />
          </Field>
          <Field label="Paragraf section 'Kenapa BOXA'">
            <textarea name="copy_curation_subtitle" defaultValue={settings.copy.curation_subtitle} rows={3} className={inputClass} />
          </Field>
          <Field label="Intro halaman Pilihan Online">
            <textarea name="copy_rekomendasi_intro" defaultValue={settings.copy.rekomendasi_intro} rows={2} className={inputClass} />
          </Field>
          <Field label="Template pesan WA — Request Mainan">
            <input name="copy_request_toy_message" defaultValue={settings.copy.request_toy_message} className={inputClass} />
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

        <SubmitButton>Simpan Perubahan</SubmitButton>
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
