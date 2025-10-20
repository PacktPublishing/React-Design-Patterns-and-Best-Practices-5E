"use client"

import { useState } from "react"
import Link from "next/link"
import ErrorBoundary from "@/components/error-boundaries/basic-error-boundary"

function ProblematicComponent() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error("This is a simulated error from ProblematicComponent!")
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Working Component</h3>
      <p className="mb-4 text-sm text-gray-600">
        This component is working fine. Click the button below to trigger an error.
      </p>
      <button
        onClick={() => setShouldError(true)}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Trigger Error
      </button>
    </div>
  )
}

export default function BasicErrorBoundaryPage() {
  const [key, setKey] = useState(0)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
          ← Back to Home
        </Link>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">Basic Error Boundary</h1>
        <p className="mb-8 text-gray-600">
          Demonstrates a simple error boundary that catches errors and displays a fallback UI.
        </p>

        <div className="mb-4">
          <button
            onClick={() => setKey((prev) => prev + 1)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reset Component
          </button>
        </div>

        <ErrorBoundary key={key}>
          <ProblematicComponent />
        </ErrorBoundary>

        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-blue-900">How It Works</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-blue-800">
            <li>The ErrorBoundary uses getDerivedStateFromError to catch errors</li>
            <li>componentDidCatch logs the error for debugging</li>
            <li>A fallback UI is displayed when an error occurs</li>
            <li>The rest of the application continues to work normally</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
