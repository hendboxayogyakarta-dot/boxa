export default function AdminCmsPage() {
  const sections = [
    "Branding (logo, favicon, warna)",
    "Navigasi (label & urutan menu)",
    "Hero (judul, subjudul, gambar, CTA)",
    "Section Homepage (aktif/nonaktif, urutan)",
    "Kenapa BOXA (kartu fitur)",
    "Footer (kontak, sosial media)",
    "SEO (judul situs, meta description, OG image)",
  ];
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Website / CMS</h1>
      <p className="mt-1 max-w-xl text-sm text-muted">
        Semua teks dan pengaturan tampilan di halaman ini disimpan di tabel{" "}
        <code className="rounded bg-cream-warm px-1 py-0.5 text-xs">website_settings</code> dan{" "}
        <code className="rounded bg-cream-warm px-1 py-0.5 text-xs">homepage_sections</code> (lihat
        db/schema.sql) — bukan di-hardcode di komponen. Form edit untuk tiap bagian di bawah
        tinggal disambungkan ke Server Actions setelah Supabase aktif.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {sections.map((s) => (
          <div key={s} className="rounded-2xl border border-line bg-white p-4 text-sm font-medium text-ink-soft">
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
