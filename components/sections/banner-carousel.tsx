"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner, SiteSettings } from "@/lib/types";

export function BannerCarousel({ banners, settings }: { banners: Banner[]; settings: SiteSettings }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => setActive((i) => (i + 1) % banners.length), 4500);
    return () => clearInterval(t);
  }, [banners.length]);

  // Purely visual — never carries a heading. The homepage's actual <h1>
  // lives in <UspStrip> instead, unconditionally, so it's still present
  // whether or not a banner has been uploaded yet (a real banner replaced
  // this whole section before, which meant the homepage had no h1 at all
  // whenever one was live — see the note there).
  if (banners.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
        <div className="flex aspect-[16/6] w-full items-center justify-center rounded-2xl bg-maroon sm:aspect-[16/5]">
          <span className="font-display text-lg font-bold text-on-brand/70">{settings.brand_name}</span>
        </div>
      </section>
    );
  }

  const current = banners[active];

  return (
    <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
      <div className="group relative aspect-[16/6] w-full overflow-hidden rounded-2xl bg-cream-warm sm:aspect-[16/5]">
        {banners.map((b, i) => (
          <Link
            key={b.id}
            href={b.link_url ?? "/shop"}
            className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <Image
              src={b.image_url}
              alt={b.alt_text ?? "BOXA.YK"}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </Link>
        ))}

        {banners.length > 1 && (
          <>
            <button
              aria-label="Sebelumnya"
              onClick={() => setActive((i) => (i - 1 + banners.length) % banners.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-ink/40 p-1.5 text-on-brand opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Berikutnya"
              onClick={() => setActive((i) => (i + 1) % banners.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-ink/40 p-1.5 text-on-brand opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {banners.map((b, i) => (
                <button
                  key={b.id}
                  aria-label={`Banner ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-on-brand" : "w-1.5 bg-on-brand/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
