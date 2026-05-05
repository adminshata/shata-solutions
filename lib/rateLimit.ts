// Tiny in-memory rate limiter. For production, swap to Upstash Redis.
// Keyed by IP or session id. Per-key sliding window.

type Bucket = { tokens: number; lastRefill: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { max = 10, windowMs = 60_000 }: { max?: number; windowMs?: number } = {},
): { ok: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const refillRate = max / windowMs;
  const bucket = buckets.get(key) ?? { tokens: max, lastRefill: now };

  const elapsed = now - bucket.lastRefill;
  bucket.tokens = Math.min(max, bucket.tokens + elapsed * refillRate);
  bucket.lastRefill = now;

  if (bucket.tokens < 1) {
    buckets.set(key, bucket);
    return {
      ok: false,
      remaining: 0,
      retryAfterMs: Math.ceil((1 - bucket.tokens) / refillRate),
    };
  }

  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return { ok: true, remaining: Math.floor(bucket.tokens), retryAfterMs: 0 };
}

export function ipFromRequest(req: Request): string {
  const h = req.headers;
  return (
    h.get("cf-connecting-ip") ||
    h.get("x-real-ip") ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "0.0.0.0"
  );
}
