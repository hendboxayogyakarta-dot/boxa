import Link from "next/link";
import { Flame, Camera, Music2, MessageCircle, ShoppingBag } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export function BoxaFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-site-border bg-site-bg-raised md:pl-[76px]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-extrabold text-site-text">
            <Flame size={18} className="text-flame" />
            {settings.brand_name}
          </div>
          <p className="mt-2 text-sm text-site-text-muted">Toys &amp; Collectibles</p>
          <p className="mt-1 text-sm text-site-text-faint">{settings.address}</p>
          <div className="mt-4 flex items-center gap-4">
            <a href={settings.instagram_url} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-site-text-muted hover:text-flame"><Camera size={16} /></a>
            <a href={settings.tiktok_url} target="_blank" rel="noreferrer" aria-label="TikTok" className="text-site-text-muted hover:text-flame"><Music2 size={16} /></a>
            <a href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-site-text-muted hover:text-flame"><MessageCircle size={16} /></a>
            <a href={settings.shopee_url} target="_blank" rel="noreferrer" aria-label="Shopee" className="text-site-text-muted hover:text-flame"><ShoppingBag size={16} /></a>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-site-text-faint">Navigasi</div>
          <ul className="mt-3 space-y-2 text-sm text-site-text-muted">
            <li><Link href="/shop" className="hover:text-site-text">Semua Produk</Link></li>
            <li><Link href="/shop?rare=1" className="hover:text-site-text">Rare / Secret</Link></li>
            <li><Link href="/tentang" className="hover:text-site-text">Tentang BOXA</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-site-text-faint">Kontak</div>
          <ul className="mt-3 space-y-2 text-sm text-site-text-muted">
            <li><a href={`https://wa.me/${settings.whatsapp_number}`} className="hover:text-site-text">WhatsApp</a></li>
            <li><a href={settings.instagram_url} className="hover:text-site-text">Instagram</a></li>
            <li><a href={settings.shopee_url} className="hover:text-site-text">Shopee</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-site-text-faint">Info</div>
          <ul className="mt-3 space-y-2 text-sm text-site-text-muted">
            <li><Link href="/tentang" className="hover:text-site-text">Syarat &amp; Ketentuan</Link></li>
            <li><Link href="/tentang" className="hover:text-site-text">Privasi</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-site-border px-5 py-4 text-center text-xs text-site-text-faint sm:px-8">
        © {new Date().getFullYear()} {settings.brand_name}. Semua hak dilindungi.
      </div>
    </footer>
  );
}
