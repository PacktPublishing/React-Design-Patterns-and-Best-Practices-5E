"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Track page views
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

      trackPageView(url)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}

function trackPageView(url: string) {
  // In production, this would send to your analytics service
  if (process.env.NODE_ENV === "production") {
    console.log("Page view:", url)
    // Example: window.gtag?.('event', 'page_view', { page_path: url });
  }
}
