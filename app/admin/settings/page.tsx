export default function AdminSettingsPage() {
  const groups = [
    { title: "Umum", items: ["Nama toko", "Deskripsi", "Lokasi"] },
    { title: "Kontak", items: ["WhatsApp", "Instagram", "TikTok", "Shopee"] },
    { title: "Pengiriman", items: ["Antar lokal", "Gratis ongkir", "Area layanan", "Catatan"] },
    { title: "Bisnis", items: ["Mata uang", "Zona waktu", "CTA default"] },
    { title: "SEO", items: ["Judul", "Deskripsi", "OG image"] },
  ];
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Pengaturan</h1>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.title} className="rounded-2xl border border-line bg-white p-4">
            <h2 className="font-display text-sm font-bold text-ink">{g.title}</h2>
            <ul className="mt-2 space-y-1 text-sm text-ink-soft">
              {g.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
