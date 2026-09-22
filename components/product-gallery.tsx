"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
    setActive(index);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== active) setActive(index);
  }

  if (images.length === 0) {
    return <div className="aspect-square w-full rounded-3xl bg-photo-frame" />;
  }

  return (
    <div>
      {/* Swipeable main image — drag/scroll on mobile like a marketplace gallery */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto rounded-3xl bg-photo-frame [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div key={img.id} className="relative w-full shrink-0 snap-center">
            <Image
              src={img.url}
              alt={`${productName} — foto ${i + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots — visible on mobile where thumbnails are cramped */}
      {images.length > 1 && (
        <div className="mt-2 flex justify-center gap-1.5 sm:hidden">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => goTo(i)}
              aria-label={`Foto ${i + 1}`}
              className={cn("h-1.5 rounded-full transition-all", i === active ? "w-5 bg-maroon" : "w-1.5 bg-line")}
            />
          ))}
        </div>
      )}

      {/* Clickable thumbnail strip */}
      {images.length > 1 && (
        <div className="mt-3 hidden grid-cols-5 gap-2 sm:grid">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => goTo(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl bg-photo-frame ring-2 transition-colors",
                i === active ? "ring-maroon" : "ring-transparent hover:ring-line"
              )}
            >
              <Image src={img.url} alt={`${productName} — thumbnail ${i + 1}`} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
