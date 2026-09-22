import { getCategories, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
    <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8">
      <h1 className="font-display text-3xl font-bold text-site-text">Semua Produk</h1>
      <p className="mt-1 text-sm text-site-text-muted">
        {q ? `Hasil pencarian untuk "${q}"` : "Mainan dan collectible pilihan BOXA.YK"}
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="space-y-6">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-site-text">Kategori</h2>
            <ul className="space-y-1">
              <li>
                <Link
                  href={hrefFor({ category: undefined })}
                  className={cn(
                    "block rounded-lg px-2 py-1.5 text-sm",
                    !category ? "bg-flame text-site-bg" : "text-site-text-muted hover:bg-site-surface"
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
                      category === c.slug ? "bg-flame text-site-bg" : "text-site-text-muted hover:bg-site-surface"
                    )}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold text-site-text">Cepat</h2>
            <div className="flex flex-wrap gap-2 md:flex-col">
              <Link href="/shop?rare=1" className="rounded-full border border-site-border px-3 py-1 text-xs font-medium text-site-text-muted hover:border-flame">
                Rare / Secret
              </Link>
              <Link href="/shop?new=1" className="rounded-full border border-site-border px-3 py-1 text-xs font-medium text-site-text-muted hover:border-flame">
                Baru Datang
              </Link>
              <Link href="/shop?featured=1" className="rounded-full border border-site-border px-3 py-1 text-xs font-medium text-site-text-muted hover:border-flame">
                Pilihan BOXA
              </Link>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-site-text-muted">{products.length} produk</span>
            <div className="flex gap-2">
              {SORTS.map((s) => (
                <Link
                  key={s.value}
                  href={hrefFor({ sort: s.value })}
                  className={cn(
                    "hidden rounded-full border px-3 py-1.5 text-xs font-medium sm:inline-block",
                    sort === s.value
                      ? "border-flame bg-flame text-site-bg"
                      : "border-site-border text-site-text-muted hover:border-flame"
                  )}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-site-border bg-site-surface py-16 text-center">
              <p className="font-display text-lg font-semibold text-site-text">Belum ada produk di sini</p>
              <p className="mt-1 text-sm text-site-text-muted">Coba kategori lain atau kata kunci berbeda.</p>
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
