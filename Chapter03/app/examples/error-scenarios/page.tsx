"use client"

import { useState } from "react"
import Link from "next/link"
import AdvancedErrorBoundary from "@/components/error-boundaries/advanced-error-boundary"

function AsyncErrorComponent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const simulateAsyncError = async () => {
    setLoading(true)
    setError(null)

    try {
      await new Promise((_, reject) => setTimeout(() => reject(new Error("Async operation failed")), 1000))
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Async Error Handling</h3>
      <button
        onClick={simulateAsyncError}
        disabled={loading}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Trigger Async Error"}
      </button>
      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-800">Error: {error}</p>
        </div>
      )}
    </div>
  )
}

function EventHandlerErrorComponent() {
  const handleClick = () => {
    try {
      throw new Error("Error in event handler")
    } catch (err) {
      console.error("Caught in event handler:", err)
      alert("Error caught in event handler: " + (err as Error).message)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Event Handler Error</h3>
      <p className="mb-4 text-sm text-gray-600">
        Error boundaries don't catch errors in event handlers. Handle them with try-catch.
      </p>
      <button
        onClick={handleClick}
        className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
      >
        Trigger Event Handler Error
      </button>
    </div>
  )
}

function LifecycleErrorComponent() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error("Error during render phase")
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Lifecycle Error</h3>
      <p className="mb-4 text-sm text-gray-600">
        This error occurs during the render phase and will be caught by the error boundary.
      </p>
      <button
        onClick={() => setShouldError(true)}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Trigger Lifecycle Error
      </button>
    </div>
  )
}

export default function ErrorScenariosPage() {
  const [lifecycleKey, setLifecycleKey] = useState(0)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
          ← Back to Home
        </Link>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">Common Error Scenarios</h1>
        <p className="mb-8 text-gray-600">
          Demonstrates different types of errors and appropriate handling strategies.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">1. Asynchronous Errors</h2>
            <AsyncErrorComponent />
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">2. Event Handler Errors</h2>
            <EventHandlerErrorComponent />
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">3. Component Lifecycle Errors</h2>
              <button
                onClick={() => setLifecycleKey((prev) => prev + 1)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Reset
              </button>
            </div>
            <AdvancedErrorBoundary key={lifecycleKey} level="component">
              <LifecycleErrorComponent />
            </AdvancedErrorBoundary>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-blue-900">Error Handling Strategies</h3>
          <div className="space-y-3 text-sm text-blue-800">
            <div>
              <strong>Async Errors:</strong> Use try-catch blocks and state management to handle Promise rejections
            </div>
            <div>
              <strong>Event Handler Errors:</strong> Wrap event handler code in try-catch since error boundaries don't
              catch these
            </div>
            <div>
              <strong>Lifecycle Errors:</strong> Error boundaries catch these during render, mount, and update phases
            </div>
            <div>
              <strong>Network Errors:</strong> Implement retry logic and show user-friendly messages
            </div>
            <div>
              <strong>Validation Errors:</strong> Validate user input and provide clear feedback before submission
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
