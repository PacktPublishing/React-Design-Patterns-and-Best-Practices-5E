"use client"

import { useState, useEffect } from "react"

interface WebVital {
  name: string
  value: number
  rating: "good" | "needs-improvement" | "poor"
  description: string
  threshold: string
}

export default function WebVitalsPage() {
  const [vitals, setVitals] = useState<WebVital[]>([])

  useEffect(() => {
    // In a real application, you'd import from 'web-vitals' library
    // This is a simulation for demonstration
    const simulatedVitals: WebVital[] = [
      {
        name: "LCP",
        value: 2.1,
        rating: "good",
        description: "Largest Contentful Paint",
        threshold: "< 2.5s",
      },
      {
        name: "FID",
        value: 45,
        rating: "good",
        description: "First Input Delay",
        threshold: "< 100ms",
      },
      {
        name: "CLS",
        value: 0.05,
        rating: "good",
        description: "Cumulative Layout Shift",
        threshold: "< 0.1",
      },
      {
        name: "FCP",
        value: 1.8,
        rating: "good",
        description: "First Contentful Paint",
        threshold: "< 1.8s",
      },
      {
        name: "TTFB",
        value: 0.6,
        rating: "good",
        description: "Time to First Byte",
        threshold: "< 0.8s",
      },
    ]
    setVitals(simulatedVitals)
  }, [])

  const getRatingColor = (rating: WebVital["rating"]) => {
    const colors = {
      good: "bg-green-100 text-green-800",
      "needs-improvement": "bg-yellow-100 text-yellow-800",
      poor: "bg-red-100 text-red-800",
    }
    return colors[rating]
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Core Web Vitals Monitor</h1>
        <p className="text-gray-600 mb-8">
          Web Vitals are essential metrics for measuring user experience. These metrics directly correlate with how
          users perceive your application's speed and responsiveness.
        </p>

        <div className="grid gap-4">
          {vitals.map((vital) => (
            <div key={vital.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{vital.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRatingColor(vital.rating)}`}>
                      {vital.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{vital.description}</p>
                  <p className="text-3xl font-bold">{vital.value.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Target</p>
                  <p className="text-lg font-semibold">{vital.threshold}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-3">Understanding Web Vitals:</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              • <strong>LCP (Largest Contentful Paint):</strong> Measures loading performance. Should occur within 2.5s
              of page load.
            </li>
            <li>
              • <strong>FID (First Input Delay):</strong> Measures interactivity. Should be less than 100ms.
            </li>
            <li>
              • <strong>CLS (Cumulative Layout Shift):</strong> Measures visual stability. Should be less than 0.1.
            </li>
            <li>
              • <strong>FCP (First Contentful Paint):</strong> Time until first content is rendered.
            </li>
            <li>
              • <strong>TTFB (Time to First Byte):</strong> Time until first byte is received from server.
            </li>
          </ul>
        </div>

        <div className="mt-6 p-6 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold mb-2">Measuring in production:</h3>
          <p className="text-sm text-gray-700">
            To measure real Web Vitals in your application, install the{" "}
            <code className="bg-white px-2 py-1 rounded">web-vitals</code> package and use it with your analytics
            provider. Tools like Google Lighthouse can also measure these metrics and provide specific recommendations
            for improvement.
          </p>
        </div>
      </div>
    </div>
  )
}
