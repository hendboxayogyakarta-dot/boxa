import { MapPin } from "lucide-react";

/**
 * A stamp-style "COD Local" mark for anything that can be bought/picked
 * up directly in Yogyakarta. Colors are the fixed brand ones (deep maroon
 * + on-brand text), not the theme-adaptive ink/cream, so it reads the
 * same over a product photo in light and dark mode alike.
 */
export function CodLocalBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  const isMd = size === "md";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md bg-maroon-deep font-extrabold uppercase tracking-wider text-on-brand shadow-md ring-1 ring-white/20 ${
        isMd ? "px-2.5 py-1.5 text-xs" : "px-2 py-1 text-[10px]"
      }`}
    >
      <MapPin size={isMd ? 13 : 11} className="text-flame-light" />
      COD Local
    </span>
  );
}
