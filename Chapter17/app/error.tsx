"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div
          className="w-16 h-16 bg-red-100 rounded-full flex items-center 
                      justify-center mx-auto mb-4"
        >
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 
                     1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 
                     16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>

        <p className="text-slate-600 mb-6">
          We're sorry, but something unexpected happened. Our team has been notified.
        </p>

        <button
          onClick={reset}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium
                   hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
