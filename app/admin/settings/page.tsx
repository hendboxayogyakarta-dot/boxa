import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Pengaturan</h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        Branding, hero, pengiriman, kontak/sosial, dan SEO sekarang semuanya diatur dari satu
        halaman dengan form yang benar-benar tersimpan ke database.
      </p>
      <Link
        href="/admin/cms"
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream"
      >
        Buka Website / CMS <ArrowRight size={15} />
      </Link>
    </div>
  );
}
