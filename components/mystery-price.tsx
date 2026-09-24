/**
 * Shown instead of a real price when the admin hasn't filled one in yet
 * (mainly affiliate/recommendation listings, where price is optional).
 * Styled to invite a click rather than look broken — the whole card is
 * already a link to the product/marketplace, this just makes "find out"
 * feel like part of the draw instead of a missing field.
 */
export function MysteryPrice({ size = "base" }: { size?: "base" | "lg" }) {
  if (size === "lg") {
    return (
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-extrabold tracking-wide text-flame">Rp ???</span>
      </div>
    );
  }
  return (
    <span className="font-display text-base font-bold tracking-wide text-flame">Rp ???</span>
  );
}
