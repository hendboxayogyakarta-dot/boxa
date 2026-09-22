import { getCategories, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
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
  const q = typeof params.q === "string" ? params.q : undefined;
  const sort = (typeof params.sort === "string" ? params.sort : "newest") as
    | "newest"
    | "price_asc"
    | "price_desc"
    | "popularity";
  const rare = params.rare === "1";
  const isNew = params.new === "1";
  const featured = params.featured === "1";

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ category, search: q, sort, rareOrSecret: rare || undefined, isNew: isNew || undefined, featured: featured || undefined }),
  ]);

  function hrefFor(next: Record<string, string | undefined>) {
    const merged = { category, q, sort, ...next };
    const search = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => v && search.set(k, v));
    const qs = search.toString();
    return qs ? `/shop?${qs}` : "/shop";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink">Semua Produk</h1>
      <p className="mt-1 text-sm text-muted">
        {q ? `Hasil pencarian untuk "${q}"` : "Mainan dan collectible pilihan BOXA.YK"}
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="space-y-6">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-ink">Kategori</h2>
            <ul className="space-y-1">
              <li>
                <Link
                  href={hrefFor({ category: undefined })}
                  className={cn(
                    "block rounded-lg px-2 py-1.5 text-sm",
                    !category ? "bg-maroon text-cream" : "text-ink-soft hover:bg-cream-warm"
                  )}
                >
                  Semua
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={hrefFor({ category: c.slug })}
                    className={cn(
                      "block rounded-lg px-2 py-1.5 text-sm",
                      category === c.slug ? "bg-maroon text-cream" : "text-ink-soft hover:bg-cream-warm"
                    )}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold text-ink">Cepat</h2>
            <div className="flex flex-wrap gap-2 md:flex-col">
              <Link href="/shop?rare=1" className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft hover:border-maroon">
                Rare / Secret
              </Link>
              <Link href="/shop?new=1" className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft hover:border-maroon">
                Baru Datang
              </Link>
              <Link href="/shop?featured=1" className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft hover:border-maroon">
                Pilihan BOXA
              </Link>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-muted">{products.length} produk</span>
            <div className="flex gap-2">
              {SORTS.map((s) => (
                <Link
                  key={s.value}
                  href={hrefFor({ sort: s.value })}
                  className={cn(
                    "hidden rounded-full border px-3 py-1.5 text-xs font-medium sm:inline-block",
                    sort === s.value
                      ? "border-maroon bg-maroon text-cream"
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
