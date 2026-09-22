import { getBrands, getCategories, getProducts, getSiteSettings } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { RequestToyButton } from "@/components/request-toy-button";
import { ShopMobileControls } from "@/components/shop-mobile-controls";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Helps the common no-filter case (/shop with no query) get cached;
// pages hit with search/filter query strings are still rendered fresh.
export const revalidate = 60;

const SORTS: { value: string; label: string }[] = [
  { value: "newest", label: "Terbaru" },
  { value: "price_asc", label: "Harga: Rendah ke Tinggi" },
  { value: "price_desc", label: "Harga: Tinggi ke Rendah" },
  { value: "popularity", label: "Paling Laris" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : undefined;
  const brand = typeof params.brand === "string" ? params.brand : undefined;
  const q = typeof params.q === "string" ? params.q : undefined;
  const sort = (typeof params.sort === "string" ? params.sort : "newest") as
    | "newest"
    | "price_asc"
    | "price_desc"
    | "popularity";
  const rare = params.rare === "1";
  const isNew = params.new === "1";
  const featured = params.featured === "1";

  const [categories, brands, settings, products] = await Promise.all([
    getCategories(),
    getBrands(),
    getSiteSettings(),
    getProducts({
      category,
      brand,
      search: q,
      sort,
      rareOrSecret: rare || undefined,
      isNew: isNew || undefined,
      featured: featured || undefined,
    }),
  ]);

  function hrefFor(next: Record<string, string | undefined>) {
    const merged = { category, brand, q, sort, ...next };
    const search = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => v && search.set(k, v));
    const qs = search.toString();
    return qs ? `/shop?${qs}` : "/shop";
  }

  // Plain serializable data for the mobile bottom sheets (client component
  // — can't receive the hrefFor function itself across the boundary).
  const categoryLinks = [
    { label: "Semua", href: hrefFor({ category: undefined }), active: !category },
    ...categories.map((c) => ({ label: c.name, href: hrefFor({ category: c.slug }), active: category === c.slug })),
  ];
  const brandLinks = [
    { label: "Semua Brand", href: hrefFor({ brand: undefined }), active: !brand },
    ...brands.map((b) => ({ label: b.name, href: hrefFor({ brand: b.slug }), active: brand === b.slug })),
  ];
  const quickLinks = [
    { label: "Rare / Secret", href: "/shop?rare=1", active: rare },
    { label: "Baru Datang", href: "/shop?new=1", active: isNew },
    { label: "Pilihan BOXA", href: "/shop?featured=1", active: featured },
  ];
  const sortLinks = SORTS.map((s) => ({ label: s.label, href: hrefFor({ sort: s.value }), active: sort === s.value }));
  const activeSortLabel = SORTS.find((s) => s.value === sort)?.label ?? "Urutkan";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Semua Produk</h1>
          <p className="mt-1 text-sm text-muted">
            {q ? `Hasil pencarian untuk "${q}"` : "Mainan dan collectible pilihan BOXA.YK"}
          </p>
        </div>
        <RequestToyButton whatsappNumber={settings.whatsapp_number} className="hidden sm:inline-flex" />
      </div>

      {/* Always-visible search — Shopee-style, not tucked in a header menu.
          Hidden inputs keep whatever filters are already active. */}
      <form action="/shop" className="mt-4 flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5">
        <Search size={16} className="shrink-0 text-muted" />
        <input
          name="q"
          defaultValue={q}
          placeholder="Cari mainan, brand, seri..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
        {category && <input type="hidden" name="category" value={category} />}
        {brand && <input type="hidden" name="brand" value={brand} />}
        {sort !== "newest" && <input type="hidden" name="sort" value={sort} />}
      </form>

      {/* Mobile filter/sort bottom sheets — sidebar below is desktop-only */}
      <div className="mt-3">
        <ShopMobileControls
          categoryLinks={categoryLinks}
          brandLinks={brandLinks}
          quickLinks={quickLinks}
          sortLinks={sortLinks}
          activeSortLabel={activeSortLabel}
          resultCount={products.length}
        />
      </div>

      <RequestToyButton whatsappNumber={settings.whatsapp_number} className="mt-3 flex w-full justify-center sm:hidden" />

      <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="hidden space-y-6 md:block">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-ink">Kategori</h2>
            <ul className="space-y-1">
              {categoryLinks.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className={cn(
                      "block rounded-lg px-2 py-1.5 text-sm",
                      c.active ? "bg-maroon text-on-brand" : "text-ink-soft hover:bg-cream-warm"
                    )}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {brands.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-semibold text-ink">Brand & Lisensi</h2>
              <ul className="space-y-1">
                {brandLinks.map((b) => (
                  <li key={b.href}>
                    <Link
                      href={b.href}
                      className={cn(
                        "block rounded-lg px-2 py-1.5 text-sm",
                        b.active ? "bg-maroon text-on-brand" : "text-ink-soft hover:bg-cream-warm"
                      )}
                    >
                      {b.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="mb-2 text-sm font-semibold text-ink">Cepat</h2>
            <div className="flex flex-col gap-2">
              {quickLinks.map((q) => (
                <Link
                  key={q.href}
                  href={q.href}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium",
                    q.active ? "border-maroon bg-maroon text-on-brand" : "border-line text-ink-soft hover:border-maroon"
                  )}
                >
                  {q.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-4 hidden items-center justify-between md:flex">
            <span className="text-sm text-muted">{products.length} produk</span>
            <div className="flex gap-2">
              {SORTS.map((s) => (
                <Link
                  key={s.value}
                  href={hrefFor({ sort: s.value })}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium",
                    sort === s.value
                      ? "border-maroon bg-maroon text-on-brand"
                      : "border-line text-ink-soft hover:border-maroon"
                  )}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white py-16 text-center">
              <p className="font-display text-lg font-semibold text-ink">Belum ada produk di sini</p>
              <p className="mt-1 text-sm text-muted">Coba kategori lain atau kata kunci berbeda.</p>
              <div className="mt-4 hidden justify-center sm:flex">
                <RequestToyButton whatsappNumber={settings.whatsapp_number} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
