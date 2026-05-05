import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { rateLimit, ipFromRequest } from "@/lib/rateLimit";

export const runtime = "nodejs";

interface Body {
  name: string;
  email: string;
  website?: string;
  audience: string;
  channels: string[];
  pitch: string;
  sessionId?: string;
}

export async function POST(req: Request) {
  const ip = ipFromRequest(req);
  const limit = rateLimit(`apply:${ip}`, { max: 5, windowMs: 60 * 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many applications, try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)) } },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // validation
  const errors: string[] = [];
  if (!body.name || body.name.trim().length < 2) errors.push("Name is required");
  if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) errors.push("Valid email required");
  if (!body.audience || body.audience.trim().length === 0) errors.push("Audience size required");
  if (!Array.isArray(body.channels) || body.channels.length === 0)
    errors.push("Pick at least one channel");
  if (!body.pitch || body.pitch.trim().length < 20) errors.push("Pitch must be at least 20 characters");
  if (errors.length) return NextResponse.json({ error: errors.join(". ") }, { status: 400 });

  const db = supabaseAdmin();

  // prevent duplicate pending applications from same email
  const { data: existing } = await db
    .from("partner_applications")
    .select("id, status")
    .eq("email", body.email.toLowerCase())
    .in("status", ["pending", "more_info"])
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { ok: true, duplicate: true, message: "Application already on file — we'll be in touch." },
      { status: 200 },
    );
  }

  const userAgent = req.headers.get("user-agent") || null;

  const { data, error } = await db
    .from("partner_applications")
    .insert({
      full_name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      website: body.website?.trim() || null,
      audience_size: body.audience.trim(),
      channels: body.channels,
      pitch: body.pitch.trim(),
      session_id: body.sessionId || null,
      ip_address: ip,
      user_agent: userAgent,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[partners/apply]", error);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }

  // TODO in Part 5.5: trigger email to partners@shata.io + confirmation to applicant
  // via Resend or Postmark. For now, admins poll /admin/partners.

  return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
}
