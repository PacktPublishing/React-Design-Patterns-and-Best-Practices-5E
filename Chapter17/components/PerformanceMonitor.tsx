"use client"

import { useEffect } from "react"

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined" || process.env.NODE_ENV !== "production") {
      return
    }

    // Web Vitals monitoring
    const reportWebVitals = async () => {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import("web-vitals")

      getCLS((metric) => sendToAnalytics("CLS", metric.value))
      getFID((metric) => sendToAnalytics("FID", metric.value))
      getFCP((metric) => sendToAnalytics("FCP", metric.value))
      getLCP((metric) => sendToAnalytics("LCP", metric.value))
      getTTFB((metric) => sendToAnalytics("TTFB", metric.value))
    }

    reportWebVitals()

    // Monitor for errors
    const errorHandler = (event: ErrorEvent) => {
      sendToAnalytics("error", {
        message: event.message,
        stack: event.error?.stack,
        url: event.filename,
        line: event.lineno,
        column: event.colno,
      })
    }

    window.addEventListener("error", errorHandler)

    return () => window.removeEventListener("error", errorHandler)
  }, [])

  return null
}

function sendToAnalytics(metric: string, value: any) {
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT

  if (!endpoint) return

  // Non-blocking beacon API for better performance
  if (navigator.sendBeacon) {
    const data = JSON.stringify({ metric, value, timestamp: Date.now() })
    navigator.sendBeacon(endpoint, data)
  } else {
    // Fallback for browsers without beacon API
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ metric, value, timestamp: Date.now() }),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => {}) // Silently fail to not disrupt user experience
  }
}
