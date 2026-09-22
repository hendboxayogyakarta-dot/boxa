import { getAllApprovedReviews } from "@/lib/data";
import { RatingStars } from "@/components/rating-stars";

export default async function AdminReviewsPage() {
  const reviews = await getAllApprovedReviews();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Ulasan</h1>
      <p className="mt-1 text-sm text-muted">Moderasi (approve/reject/hide) perlu Supabase — lihat README.md.</p>
      <div className="mt-5 space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded-2xl border border-line bg-white p-4">
            <div>
              <div className="text-sm font-semibold text-ink">{r.customer_name}</div>
              <p className="mt-1 text-sm text-ink-soft">{r.review}</p>
            </div>
            <RatingStars rating={r.rating} />
          </div>
        ))}
      </div>
    </div>
  );
}
