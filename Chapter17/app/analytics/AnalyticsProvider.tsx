"use client";

import React, { Suspense, useEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  // Keep the provider always mounted; run the tracker inside Suspense.
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
}

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Stable string so the effect doesn't re-run on object identity changes.
  const q = useMemo(() => searchParams?.toString() ?? "", [searchParams]);

  useEffect(() => {
    const url = q ? `${pathname}?${q}` : pathname;
    trackPageView(url);
  }, [pathname, q]);

  return null;
}

function trackPageView(url: string) {
  // Replace with your analytics SDK (gtag, Segment, PostHog, etc.)
  if (process.env.NODE_ENV === "production") {
    // Example: window.gtag?.("event", "page_view", { page_path: url });
    console.log("Page view:", url);
  } else {
    // Helpful during dev to verify it fires on client navigations
    console.debug("[DEV] Page view:", url);
  }
}
