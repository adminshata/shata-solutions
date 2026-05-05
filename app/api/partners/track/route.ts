import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { ipFromRequest } from "@/lib/rateLimit";

export const runtime = "nodejs";

// Called by middleware when a visitor lands with ?ref=<slug>.
// Logs the click and issues a first-party attribution cookie (30d).
// POST body: { slug, sessionId, path }

export async function POST(req: Request) {
  const ip = ipFromRequest(req);
  let body: { slug?: string; sessionId?: string; path?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const slug = (body.slug || "").toLowerCase().trim();
  if (!slug) return NextResponse.json({ ok: false }, { status: 400 });

  const db = supabaseAdmin();
  const { data: partner } = await db
    .from("partners")
    .select("id, active")
    .eq("slug", slug)
    .maybeSingle();

  if (!partner || !partner.active) {
    return NextResponse.json({ ok: false, reason: "unknown-slug" }, { status: 404 });
  }

  const userAgent = req.headers.get("user-agent") || null;

  await db.from("referral_clicks").insert({
    partner_id: partner.id,
    session_id: body.sessionId || null,
    ip_address: ip,
    user_agent: userAgent,
    landing_path: body.path || null,
  });

  const res = NextResponse.json({ ok: true, partnerId: partner.id });
  // 30-day first-party cookie for attribution
  res.cookies.set("shata_ref", slug, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  res.cookies.set("shata_ref_pid", partner.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
