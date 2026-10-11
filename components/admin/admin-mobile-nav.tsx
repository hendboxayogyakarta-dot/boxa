"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  Menu,
  X,
  Zap,
  Tags,
  Star,
  Palette,
  Settings,
  GalleryHorizontal,
  Award,
  Building2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ALL = [
  { label: "Ringkasan", href: "/admin", icon: LayoutDashboard },
  { label: "Produk", href: "/admin/products", icon: Package },
  { label: "Kategori", href: "/admin/categories", icon: Tags },
  { label: "Brand & Lisensi", href: "/admin/brands", icon: Award },
  { label: "Store Reference", href: "/admin/stores", icon: Building2 },
  { label: "Banner", href: "/admin/banners", icon: GalleryHorizontal },
  { label: "Ulasan", href: "/admin/reviews", icon: Star },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Website / CMS", href: "/admin/cms", icon: Palette },
  { label: "Pengaturan", href: "/admin/settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

/** Phone-only admin navigation: sticky top bar + thumb-reach bottom bar + full menu sheet. */
export function AdminMobileNav({ email, logout }: { email: string | null; logout: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = ALL.find((n) => isActive(pathname, n.href))?.label ?? "Admin";

  const tab = (href: string, label: string, Icon: typeof Package) => (
    <Link
      href={href}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-semibold",
        isActive(pathname, href) ? "text-maroon" : "text-muted"
      )}
    >
      <Icon size={22} />
      {label}
    </Link>
  );

  return (
    <div className="md:hidden">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-white px-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-extrabold text-maroon">BOXA</span>
          <span className="text-sm font-semibold text-ink-soft">{current}</span>
        </div>
        <Link href="/" target="_blank" aria-label="Lihat website" className="flex h-11 w-11 items-center justify-center rounded-full text-muted active:bg-cream-warm">
          <ExternalLink size={18} />
        </Link>
      </header>

      <nav
        aria-label="Navigasi admin"
        className="fixed inset-x-0 bottom-0 z-40 flex items-end border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      >
        {tab("/admin", "Ringkasan", LayoutDashboard)}
        {tab("/admin/products", "Produk", Package)}
        <Link
          href="/admin/products/quick-add"
          className="relative -mt-5 flex flex-1 flex-col items-center gap-0.5 pb-2 text-[11px] font-semibold text-maroon"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-flame text-on-brand shadow-lg ring-4 ring-white">
            <Zap size={26} />
          </span>
          Tambah
        </Link>
        {tab("/admin/media", "Media", ImageIcon)}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-semibold text-muted"
        >
          <Menu size={22} />
          Menu
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <button aria-label="Tutup menu" className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-base font-bold text-ink">Menu Admin</span>
              <button onClick={() => setOpen(false)} aria-label="Tutup" className="flex h-11 w-11 items-center justify-center rounded-full active:bg-cream-warm">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {ALL.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center text-xs font-semibold",
                    isActive(pathname, href) ? "border-maroon bg-maroon/5 text-maroon" : "border-line text-ink-soft"
                  )}
                >
                  <Icon size={22} />
                  {label}
                </Link>
              ))}
            </div>
            {email && (
              <div className="mt-4 border-t border-line pt-3">
                <div className="truncate px-1 text-xs text-muted">{email}</div>
                {logout}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
