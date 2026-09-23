import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  Star,
  Palette,
  Settings,
  Image as ImageIcon,
  GalleryHorizontal,
  Award,
  Store,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

const NAV = [
  { label: "Ringkasan", href: "/admin", icon: LayoutDashboard },
  { label: "Produk", href: "/admin/products", icon: Package },
  { label: "Kategori", href: "/admin/categories", icon: Tags },
  { label: "Brand & Lisensi", href: "/admin/brands", icon: Award },
  { label: "Marketplace", href: "/admin/marketplaces", icon: Store },
  { label: "Banner", href: "/admin/banners", icon: GalleryHorizontal },
  { label: "Ulasan", href: "/admin/reviews", icon: Star },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Website / CMS", href: "/admin/cms", icon: Palette },
  { label: "Pengaturan", href: "/admin/settings", icon: Settings },
];

const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

/**
 * Auth flow:
 * 1. middleware.ts already blocks unauthenticated visitors from any
 *    /admin/* route and bounces them to /login.
 * 2. Here we do a second, defense-in-depth check: the session must belong
 *    to a `profiles` row with role 'admin' or 'staff' (mirrors the
 *    is_admin() function that every RLS policy in db/schema.sql relies
 *    on) — a valid login alone isn't enough to see admin data.
 * When Supabase isn't connected yet (no env vars), we skip both checks so
 * local development still works against the mock data layer, with a
 * visible banner so nobody mistakes it for a real logged-in session.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let email: string | null = null;

  if (SUPABASE_CONFIGURED) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["admin", "staff"].includes(profile.role)) {
      redirect("/login?error=not_authorized");
    }
    email = user.email ?? null;
  }

  return (
    <div className="flex min-h-screen bg-cream-warm">
      <aside className="hidden w-60 shrink-0 border-r border-line bg-white md:flex md:flex-col">
        <div className="border-b border-line px-5 py-4">
          <span className="font-display text-lg font-extrabold text-maroon">BOXA.YK</span>
          <div className="text-xs text-muted">Admin</div>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
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
        {SUPABASE_CONFIGURED && email && (
          <div className="border-t border-line p-3">
            <div className="truncate px-2 text-xs text-muted">{email}</div>
            <LogoutButton />
          </div>
        )}
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-line bg-white px-6 py-3 md:hidden">
          <span className="font-display text-lg font-extrabold text-maroon">BOXA.YK Admin</span>
        </header>
        {!SUPABASE_CONFIGURED && (
          <div className="border-b border-line bg-ember/20 px-6 py-2 text-xs text-ink-soft">
            Supabase belum disambungkan — admin ini berjalan tanpa login, menampilkan data
            contoh (mock). Lihat README.md.
          </div>
        )}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
