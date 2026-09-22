import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getApprovedReviews, getProductBySlug, getRelatedProducts } from "@/lib/data";
import { formatIDR, conditionLabel, stockLabel } from "@/lib/utils";
import { ProductBadges } from "@/components/badges";
import { OrderCta } from "@/components/order-cta";
import { RatingStars } from "@/components/rating-stars";
import { ProductCard } from "@/components/product-card";
import { CheckCircle2, MapPin, ShieldCheck, XCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.short_description,
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: product.images[0] ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [reviews, related] = await Promise.all([
    getApprovedReviews(product.id),
    getRelatedProducts(product),
  ]);

  const avgRating =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : null;

  return (
    <div className="relative">
      <div aria-hidden className="site-glow pointer-events-none absolute inset-x-0 top-0 h-[600px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-site-surface">
              {product.images[0] && (
                <Image src={product.images[0].url} alt={product.name} fill className="object-cover" priority />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {product.images.map((img) => (
                  <div key={img.id} className="relative aspect-square overflow-hidden rounded-xl bg-site-surface">
                    <Image src={img.url} alt={product.name} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-flame">
              {product.category?.name ?? "BOXA Collectible"}
            </span>
            <h1 className="mt-2 font-display text-3xl font-extrabold uppercase leading-[1.02] tracking-tight text-site-text sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <ProductBadges product={product} />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-site-text-muted">
              {product.brand && <span>{product.brand}</span>}
              {product.series && <span>· {product.series}</span>}
              {avgRating && (
                <span className="flex items-center gap-1">
                  <RatingStars rating={avgRating} /> ({reviews.length})
                </span>
              )}
            </div>

            <div className="mt-5 font-display text-4xl font-extrabold text-site-text">
              {formatIDR(product.price)}
              {product.compare_price && (
                <span className="ml-3 text-lg font-normal text-site-text-faint line-through">
                  {formatIDR(product.compare_price)}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-site-text-muted">{product.short_description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-site-border bg-site-surface p-3">
                <dt className="text-xs text-site-text-faint">Kondisi</dt>
                <dd className="mt-0.5 font-semibold text-site-text">{conditionLabel(product.condition)}</dd>
              </div>
              <div className="rounded-xl border border-site-border bg-site-surface p-3">
                <dt className="text-xs text-site-text-faint">Ketersediaan</dt>
                <dd className="mt-0.5 font-semibold text-site-text">{stockLabel(product.stock_status)}</dd>
              </div>
              {product.location && (
                <div className="rounded-xl border border-site-border bg-site-surface p-3">
                  <dt className="flex items-center gap-1 text-xs text-site-text-faint"><MapPin size={12} /> Lokasi</dt>
                  <dd className="mt-0.5 font-semibold text-site-text">{product.location}</dd>
                </div>
              )}
              {product.warranty_type && (
                <div className="rounded-xl border border-site-border bg-site-surface p-3">
                  <dt className="flex items-center gap-1 text-xs text-site-text-faint"><ShieldCheck size={12} /> Garansi</dt>
                  <dd className="mt-0.5 font-semibold text-site-text">{product.warranty_type}</dd>
                </div>
              )}
            </dl>

            <div className="mt-7">
              <OrderCta product={product} />
              {product.delivery_available && (
                <p className="mt-2.5 text-center text-xs text-site-text-faint sm:text-left">
                  {product.instant_delivery_available ? "Pengiriman instan tersedia · " : ""}Antar area Yogyakarta
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Editorial details */}
        <div className="mt-16 grid gap-10 border-t border-site-border pt-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-site-text">Detail Produk</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-site-text-muted">
              {product.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {product.warranty_description && (
              <div className="mt-6 rounded-2xl border border-site-border bg-site-surface p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-flame">Catatan BOXA</h3>
                <p className="mt-1.5 text-sm text-site-text-muted">{product.warranty_description}</p>
              </div>
            )}

            {(product.pros.length > 0 || product.cons.length > 0) && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {product.pros.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-site-text-faint">Kelebihan</h3>
                    <ul className="mt-3 space-y-2">
                      {product.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-site-text-muted">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-flame" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.cons.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-site-text-faint">Perlu Diperhatikan</h3>
                    <ul className="mt-3 space-y-2">
                      {product.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-site-text-muted">
                          <XCircle size={15} className="mt-0.5 shrink-0 text-coral" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {(product.what_is_included.length > 0 || product.what_is_not_included.length > 0) && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {product.what_is_included.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-site-text-faint">Yang Didapat</h3>
                    <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-site-text-muted">
                      {product.what_is_included.map((x, i) => <li key={i}>{x}</li>)}
                    </ul>
                  </div>
                )}
                {product.what_is_not_included.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-site-text-faint">Tidak Termasuk</h3>
                    <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-site-text-muted">
                      {product.what_is_not_included.map((x, i) => <li key={i}>{x}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {reviews.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-xl font-bold uppercase tracking-tight text-site-text">Ulasan Pembeli</h2>
                <div className="mt-4 space-y-4">
                  {reviews.map((r) => (
                    <div key={r.id} className="rounded-2xl border border-site-border bg-site-surface p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-site-text">{r.customer_name}</span>
                        <RatingStars rating={r.rating} />
                      </div>
                      <p className="mt-2 text-sm text-site-text-muted">{r.review}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-site-border pt-12">
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-site-text">Produk Terkait</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
