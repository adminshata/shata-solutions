"use client";

import { useEffect, type ReactNode } from "react";

// PostHog is loaded lazily at runtime — never blocks the build
export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = process.env["NEXT_PUBLIC_POSTHOG_KEY"];
    if (!key || typeof window === "undefined") return;

    import("posthog-js")
      .then(({ default: posthog }) => {
        if (posthog.__loaded) return; // already initialised
        posthog.init(key, {
          api_host: process.env["NEXT_PUBLIC_POSTHOG_HOST"] ?? "https://us.i.posthog.com",
          person_profiles: "identified_only",
          capture_pageview: false,
          capture_pageleave: true,
        });
      })
      .catch(() => { /* posthog unavailable — degrade silently */ });
  }, []);

  return <>{children}</>;
}
