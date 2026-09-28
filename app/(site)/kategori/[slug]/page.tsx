import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { SITE_URL } from "@/lib/site-config";

export const revalidate = 60;

async function findCategory(slug: string) {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await findCategory(slug);
  if (!category) return {};

  const title = `${category.name} Yogyakarta`;
  const description =
    category.description ||
    `Temukan ${category.name.toLowerCase()} pilihan di BOXA.YK, toko mainan dan collectibles berbasis di Yogyakarta.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/kategori/${category.slug}` },
    openGraph: { type: "website", siteName: "BOXA.YK", locale: "id_ID", title: `${title} | BOXA.YK`, description },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await findCategory(slug);
  if (!category) notFound();

  const products = await getProducts({ category: category.slug, sort: "newest" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="text-xs text-muted">
        <Link href="/" className="hover:text-accent">Beranda</Link>
        {" / "}
        <Link href="/shop" className="hover:text-accent">Semua Produk</Link>
        {" / "}
        <span className="text-ink-soft">{category.name}</span>
      </nav>

      <h1 className="mt-3 font-display text-3xl font-bold text-ink">{category.name} di Yogyakarta</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        {category.description ||
          `Temukan ${category.name.toLowerCase()} pilihan di BOXA.YK, toko mainan dan collectibles berbasis di Yogyakarta.`}
      </p>

      {products.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-white py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink">Belum ada produk di kategori ini</p>
          <p className="mt-1 text-sm text-muted">
            Cek <Link href="/shop" className="font-semibold text-accent hover:underline">semua produk</Link> yang tersedia.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <p className="mt-10 text-sm text-muted">
        Cari yang lain? <Link href="/shop" className="font-semibold text-accent hover:underline">Lihat semua produk BOXA.YK</Link>{" "}
        atau <Link href="/pilihan-online" className="font-semibold text-accent hover:underline">cek Pilihan Online</Link>.
      </p>
    </div>
  );
}
