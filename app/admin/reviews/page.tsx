import { getAllReviewsForAdmin } from "@/lib/data";
import { RatingStars } from "@/components/rating-stars";
import { moderateReview, deleteReview } from "@/lib/actions/reviews";

const STATUS_LABEL: Record<string, string> = {
  pending: "Menunggu",
  approved: "Disetujui",
  rejected: "Ditolak",
  hidden: "Disembunyikan",
};

export default async function AdminReviewsPage() {
  const reviews = await getAllReviewsForAdmin();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Ulasan</h1>
      <p className="mt-1 text-sm text-muted">Setujui, tolak, sembunyikan, atau hapus ulasan pembeli.</p>

      <div className="mt-5 space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-line bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-sm font-semibold text-ink">{r.customer_name}</span>
                <span className="ml-2 rounded-full bg-cream-warm px-2 py-0.5 text-xs font-medium text-ink-soft">
                  {STATUS_LABEL[r.status] ?? r.status}
                </span>
              </div>
              <RatingStars rating={r.rating} />
            </div>
            <p className="mt-2 text-sm text-ink-soft">{r.review}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {r.status !== "approved" && (
                <form action={moderateReview}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="status" value="approved" />
                  <button type="submit" className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-flame hover:border-flame">
                    Setujui
                  </button>
                </form>
              )}
              {r.status !== "rejected" && (
                <form action={moderateReview}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="status" value="rejected" />
                  <button type="submit" className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft hover:border-maroon">
                    Tolak
                  </button>
                </form>
              )}
              {r.status !== "hidden" && (
                <form action={moderateReview}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="status" value="hidden" />
                  <button type="submit" className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft hover:border-maroon">
                    Sembunyikan
                  </button>
                </form>
              )}
              <form action={deleteReview}>
                <input type="hidden" name="id" value={r.id} />
                <button type="submit" className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-coral hover:border-coral">
                  Hapus
                </button>
              </form>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-sm text-muted">Belum ada ulasan.</p>}
      </div>
    </div>
  );
}
