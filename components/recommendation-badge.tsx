import { Flame } from "lucide-react";

/**
 * "Rekomendasi BOXA" needs to feel evaluated, not arbitrary — so it always
 * leads with the boxa_score when the admin has set one (0–10), and only
 * falls back to a plain label when they haven't gotten to scoring it yet.
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
  const textSize = size === "lg" ? "text-2xl" : "text-sm";
  const iconSize = size === "lg" ? 22 : 14;

  return (
    <div className={`flex items-center gap-2 font-display font-extrabold text-flame ${textSize}`}>
      <Flame size={iconSize} />
      {note || "Rekomendasi BOXA"}
      {score != null && (
        <span className="rounded-full bg-flame/10 px-2 py-0.5 text-xs font-bold tracking-wide text-flame">
          {score.toFixed(1)}/10
        </span>
      )}
    </div>
  );
}
