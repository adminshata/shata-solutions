"use client";

import { useEffect, useState } from "react";

const API = process.env["NEXT_PUBLIC_API_URL"] ?? "";
const RID = "REPLACE_WITH_RESTAURANT_ID";

interface Review {
  id: string;
  orderId: string;
  rating: number;
  comment?: string;
  tags: string[];
  restaurantReply?: string;
  createdAt: string;
  isPublic: boolean;
}
interface ReviewData {
  reviews: Review[];
  total: number;
  avg: number;
  thisWeek: number;
  breakdown: { rating: number; count: number; pct: number }[];
}

export default function ReviewsPage() {
  const [data, setData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [replying, setReplying] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/api/dashboard/reviews?restaurantId=${RID}`)
      .then(r => r.ok ? r.json() : null)
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  async function sendReply(reviewId: string) {
    const reply = replyInputs[reviewId];
    if (!reply) return;
    setReplying(reviewId);
    const res = await fetch(`${API}/api/dashboard/reviews/${reviewId}/reply?restaurantId=${RID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    });
    if (res.ok && data) {
      setData({ ...data, reviews: data.reviews.map(r => r.id === reviewId ? { ...r, restaurantReply: reply } : r) });
      setReplyInputs(ri => ({ ...ri, [reviewId]: "" }));
    }
    setReplying(null);
  }

  if (loading) return <div className="flex h-32 items-center justify-center text-sm text-slate-400">Loading…</div>;
  if (!data) return null;

  const stars = (n: number) => "⭐".repeat(n);

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center border-b bg-white px-6">
        <h1 className="font-bold text-slate-900">Reviews</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Average Rating</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{data.avg} <span className="text-xl">⭐</span></p>
            <p className="text-xs text-slate-400">{data.total} total reviews</p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">This Week</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{data.thisWeek}</p>
            <p className="text-xs text-slate-400">new reviews</p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Low Ratings</p>
            <p className={`mt-2 text-3xl font-black ${data.breakdown.filter(b => b.rating <= 2).reduce((s, b) => s + b.count, 0) > 0 ? "text-red-500" : "text-slate-900"}`}>
              {data.breakdown.filter(b => b.rating <= 2).reduce((s, b) => s + b.count, 0)}
            </p>
            <p className="text-xs text-slate-400">1–2 star reviews</p>
          </div>
        </div>

        {/* Rating breakdown */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">Rating Breakdown</h2>
          <div className="space-y-2">
            {data.breakdown.map(b => (
              <div key={b.rating} className="flex items-center gap-3">
                <span className="w-8 text-right text-sm text-slate-600">{b.rating}★</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${b.pct}%` }} />
                </div>
                <span className="w-12 text-right text-xs text-slate-400">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low-rating alert section */}
        {data.reviews.filter(r => r.rating <= 2).length > 0 && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700 mb-3">⚠️ Low Rating Alerts</p>
            <div className="space-y-2">
              {data.reviews.filter(r => r.rating <= 2).map(r => (
                <div key={r.id} className="text-xs text-red-600">
                  Order {r.orderId.slice(-6).toUpperCase()} — {stars(r.rating)} — {r.comment ?? "No comment"}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent reviews feed */}
        <div>
          <h2 className="mb-3 text-sm font-semibold text-slate-700">Recent Reviews</h2>
          <div className="space-y-3">
            {data.reviews.map(review => (
              <div key={review.id} className="rounded-2xl border bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{stars(review.rating)}</span>
                      <span className="text-xs text-slate-400">Order #{review.orderId.slice(-6).toUpperCase()}</span>
                      <span className="text-xs text-slate-300">·</span>
                      <span className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString("en", { month: "short", day: "numeric" })}</span>
                    </div>
                    {review.tags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {review.tags.map(tag => (
                          <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">{tag}</span>
                        ))}
                      </div>
                    )}
                    {review.comment && <p className="mt-1.5 text-sm text-slate-600">{review.comment}</p>}
                    {review.restaurantReply && (
                      <div className="mt-2 rounded-xl bg-brand/5 border border-brand/20 p-2">
                        <p className="text-xs font-semibold text-brand">Restaurant reply:</p>
                        <p className="text-xs text-slate-600">{review.restaurantReply}</p>
                      </div>
                    )}
                  </div>
                </div>
                {!review.restaurantReply && (
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      value={replyInputs[review.id] ?? ""}
                      onChange={e => setReplyInputs(ri => ({ ...ri, [review.id]: e.target.value }))}
                      placeholder="Reply to customer…"
                      className="flex-1 rounded-xl border px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand/40"
                    />
                    <button onClick={() => sendReply(review.id)} disabled={!replyInputs[review.id] || replying === review.id}
                      className="rounded-xl bg-brand px-3 py-1.5 text-xs font-bold text-white disabled:opacity-50">
                      {replying === review.id ? "…" : "Reply"}
                    </button>
                  </div>
                )}
              </div>
            ))}
            {data.reviews.length === 0 && <p className="text-center text-sm text-slate-400 py-8">No reviews yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
