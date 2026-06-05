"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;
    import("posthog-js")
      .then(({ default: posthog }) => {
        if (!posthog.__loaded) return;
        let url = window.location.origin + pathname;
        const params = searchParams.toString();
        if (params) url += `?${params}`;
        posthog.capture("$pageview", { $current_url: url });
      })
      .catch(() => {});
  }, [pathname, searchParams]);

  return null;
}

export function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
}
