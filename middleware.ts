import { NextRequest, NextResponse } from "next/server";

// Handle ?ref=<slug> across the whole site:
//   1. Set first-party cookie (30d)
//   2. Fire-and-forget tracking call to /api/partners/track
//   3. Strip ?ref from the URL so it doesn't pollute analytics / SEO

const REF_COOKIE = "shata_ref";
const REF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (url.pathname === "/compliance") {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/legal";
    return NextResponse.redirect(redirectUrl);
  }
  const ref = url.searchParams.get("ref");

  if (!ref) return NextResponse.next();

  // Build clean URL
  const clean = url.clone();
  clean.searchParams.delete("ref");

  const res = NextResponse.redirect(clean);
  res.cookies.set(REF_COOKIE, ref, {
    path: "/",
    sameSite: "lax",
    maxAge: REF_COOKIE_MAX_AGE,
    httpOnly: false,
  });

  // Fire-and-forget track call (don't await — keep middleware fast)
  const trackUrl = new URL("/api/partners/track", url.origin).toString();
  fetch(trackUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      slug: ref,
      path: url.pathname,
      sessionId: req.cookies.get("shata_session")?.value,
    }),
  }).catch(() => {});

  return res;
}

export const config = {
  matcher: [
    // Run on all routes except static files and API
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
