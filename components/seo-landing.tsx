import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SITE_URL } from "@/lib/site-config";
import type { Product } from "@/lib/types";

export type Faq = { q: string; a: string };

/** Shared layout for keyword landing pages: H1, honest intro, live product grid, FAQ, JSON-LD. */
export function SeoLanding({
  path,
  title,
  intro,
  products,
  faqs,
  extra,
  related,
}: {
  path: string;
  title: string;
  intro: React.ReactNode;
  products: Product[];
  faqs: Faq[];
  extra?: React.ReactNode;
  related: { href: string; label: string }[];
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: title,
      itemListElement: products.slice(0, 24).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/product/${p.slug}`,
        name: p.name,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: title, item: `${SITE_URL}${path}` },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-xs text-muted">
        <Link href="/" className="hover:text-accent">Beranda</Link>
        {" / "}
        <span className="text-ink-soft">{title}</span>
      </nav>

      <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{title}</h1>
      <div className="mt-3 max-w-2xl space-y-3 text-sm leading-relaxed text-ink-soft sm:text-base">{intro}</div>

      {products.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-white py-14 text-center">
          <p className="font-display text-lg font-semibold text-ink">Produk segera hadir</p>
          <p className="mt-1 text-sm text-muted">
            Sementara itu, lihat <Link href="/shop" className="font-semibold text-accent hover:underline">semua produk</Link>.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {extra}

      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-xl font-bold text-ink">Pertanyaan yang sering ditanyakan</h2>
        <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-flame transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {related.map((r) => (
          <Link key={r.href} href={r.href} className="font-semibold text-accent hover:underline">
            {r.label}
          </Link>
        ))}
      </p>
    </div>
  );
}
