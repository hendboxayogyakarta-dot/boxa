import { Flame } from "lucide-react";

/**
 * A compact label, not a price replacement — the product's price still
 * shows normally next to this (see ProductCard / product page), real
 * price if the admin filled one in, or an inviting "Rp ???" placeholder
 * if not. This just marks the item as BOXA-picked, backed by boxa_score
 * when set so it reads as an actual evaluation rather than a generic tag.
 *
 * Default label is "Pilihan BOXA" rather than "Rekomendasi BOXA" —
 * calling out ONE set of products as "the recommendation" implied every
 * other (COD) product wasn't. "Pilihan" (BOXA's pick) doesn't carry that
 * comparison. Override per-product via recommendation_note in the admin
 * form when a specific line fits better.
 */
export function RecommendationBadge({
  score,
  note,
  size = "base",
}: {
  score: number | null;
  note?: string | null;
  size?: "base" | "lg";
}) {
  const textSize = size === "lg" ? "text-sm" : "text-xs";
  const iconSize = size === "lg" ? 14 : 11;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-flame/10 px-2.5 py-1 font-semibold text-flame ${textSize}`}>
      <Flame size={iconSize} />
      {note || "Pilihan BOXA"}
      {score != null && <span className="font-bold">· {score.toFixed(1)}</span>}
    </span>
  );
}
