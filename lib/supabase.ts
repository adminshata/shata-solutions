import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getSupabasePublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  return { url, key };
}

function getSupabaseServiceEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return { url, key };
}

// Client (browser) — RLS enforced
let _browser: SupabaseClient | null = null;
export function supabaseBrowser(): SupabaseClient {
  if (!_browser) {
    const { url, key } = getSupabasePublicEnv();
    _browser = createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _browser;
}

// Singleton browser client — used by app/dashboard and other client pages.
// Proxy keeps existing call sites working while avoiding createClient at import time.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(supabaseBrowser(), prop, receiver);
  },
});

// Server (admin) — bypasses RLS. NEVER expose to client.
export function supabaseAdmin(): SupabaseClient {
  const { url, key } = getSupabaseServiceEnv();
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
