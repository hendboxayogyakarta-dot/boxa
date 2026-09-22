import Link from "next/link";
import { Share2, MessageCircle, Camera, Music2, ShoppingBag } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-20 bg-maroon-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="font-display text-xl font-extrabold">{settings.brand_name}</div>
          <p className="mt-2 max-w-xs text-sm text-cream/70">{settings.tagline}</p>
          <div className="mt-4 flex items-center gap-4">
            <a href={settings.instagram_url} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-cream/60 hover:text-cream"><Camera size={16} /></a>
            <a href={settings.tiktok_url} target="_blank" rel="noreferrer" aria-label="TikTok" className="text-cream/60 hover:text-cream"><Music2 size={16} /></a>
            <a href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-cream/60 hover:text-cream"><MessageCircle size={16} /></a>
            <a href={settings.shopee_url} target="_blank" rel="noreferrer" aria-label="Shopee" className="text-cream/60 hover:text-cream"><ShoppingBag size={16} /></a>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-cream/90">Jelajahi</div>
          <ul className="mt-3 space-y-2 text-sm text-cream/70">
            <li><Link href="/shop" className="hover:text-cream">Semua Produk</Link></li>
            <li><Link href="/shop?rare=1" className="hover:text-cream">Rare / Secret</Link></li>
            <li><Link href="/tentang" className="hover:text-cream">Tentang BOXA</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-cream/90">Kontak</div>
          <ul className="mt-3 space-y-2 text-sm text-cream/70">
            <li className="flex items-center gap-2">
              <MessageCircle size={14} />
              <a href={`https://wa.me/${settings.whatsapp_number}`} className="hover:text-cream">WhatsApp</a>
            </li>
            <li className="flex items-center gap-2">
              <Share2 size={14} />
              <a href={settings.instagram_url} className="hover:text-cream">Instagram</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-cream/90">Lokasi</div>
          <p className="mt-3 text-sm text-cream/70">{settings.address}</p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-4 py-4 text-center text-xs text-cream/50 sm:px-6">
        © {new Date().getFullYear()} {settings.brand_name}. Semua hak dilindungi.
      </div>
    </footer>
  );
}
