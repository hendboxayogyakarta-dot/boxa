import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Tags,
  Star,
  Palette,
  Settings,
  Image as ImageIcon,
} from "lucide-react";

const NAV = [
  { label: "Ringkasan", href: "/admin", icon: LayoutDashboard },
  { label: "Produk", href: "/admin/products", icon: Package },
  { label: "Kategori", href: "/admin/categories", icon: Tags },
  { label: "Ulasan", href: "/admin/reviews", icon: Star },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Website / CMS", href: "/admin/cms", icon: Palette },
  { label: "Pengaturan", href: "/admin/settings", icon: Settings },
];

/**
 * TODO before this route is safe to expose:
 * 1. Wrap this layout with a server-side Supabase Auth session check
 *    (redirect to /admin/login when there's no session or the user's
 *    `profiles.role` isn't 'admin'). See db/schema.sql for the profiles
 *    table + RLS policies this depends on.
 * 2. Never rely on hiding this sidebar as the only protection — every
 *    admin route handler / server action must re-check the session and
 *    role itself, per RLS.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-cream-warm">
      <aside className="hidden w-60 shrink-0 border-r border-line bg-white md:block">
        <div className="border-b border-line px-5 py-4">
          <span className="font-display text-lg font-extrabold text-maroon">BOXA.YK</span>
          <div className="text-xs text-muted">Admin</div>
        </div>
        <nav className="flex flex-col gap-0.5 p-3">
          {NAV.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-cream-warm hover:text-maroon"
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-line bg-white px-6 py-3 md:hidden">
          <span className="font-display text-lg font-extrabold text-maroon">BOXA.YK Admin</span>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
