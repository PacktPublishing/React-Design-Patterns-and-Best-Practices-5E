"use client"

import { useState } from "react"
import Link from "next/link"
import AdvancedErrorBoundary from "@/components/error-boundaries/advanced-error-boundary"

function NetworkErrorComponent() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error("Network fetch failed: Unable to connect to server")
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Network Component</h3>
      <button
        onClick={() => setShouldError(true)}
        className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
      >
        Trigger Network Error
      </button>
    </div>
  )
}

function ChunkErrorComponent() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error("ChunkLoadError: Loading chunk 5 failed")
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Chunk Loading Component</h3>
      <button
        onClick={() => setShouldError(true)}
        className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
      >
        Trigger Chunk Error
      </button>
    </div>
  )
}

function RenderingErrorComponent() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error("Cannot read property of undefined")
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Rendering Component</h3>
      <button
        onClick={() => setShouldError(true)}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Trigger Rendering Error
      </button>
    </div>
  )
}

export default function AdvancedErrorBoundaryPage() {
  const [networkKey, setNetworkKey] = useState(0)
  const [chunkKey, setChunkKey] = useState(0)
  const [renderKey, setRenderKey] = useState(0)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
          ← Back to Home
        </Link>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">Advanced Error Boundary</h1>
        <p className="mb-8 text-gray-600">
          Demonstrates error categorization, retry mechanisms, and contextual fallback UIs.
        </p>

        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Network Error Example</h2>
              <button
                onClick={() => setNetworkKey((prev) => prev + 1)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Reset
              </button>
            </div>
            <AdvancedErrorBoundary key={networkKey} level="component">
              <NetworkErrorComponent />
            </AdvancedErrorBoundary>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Chunk Loading Error Example</h2>
              <button
                onClick={() => setChunkKey((prev) => prev + 1)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Reset
              </button>
            </div>
            <AdvancedErrorBoundary key={chunkKey} level="section">
              <ChunkErrorComponent />
            </AdvancedErrorBoundary>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Rendering Error Example</h2>
              <button
                onClick={() => setRenderKey((prev) => prev + 1)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Reset
              </button>
            </div>
            <AdvancedErrorBoundary key={renderKey} level="component">
              <RenderingErrorComponent />
            </AdvancedErrorBoundary>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-blue-900">Features</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-blue-800">
            <li>Automatic error categorization (network, chunk, rendering)</li>
            <li>Context-appropriate retry mechanisms</li>
            <li>Different fallback UIs based on error type</li>
            <li>Integration with error tracking services</li>
            <li>Configurable error boundary levels (page, section, component)</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
