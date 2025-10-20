"use client"

import type React from "react"

import { Suspense, lazy } from "react"

const Comments = lazy(() => import("@/components/product-comments"))
const RelatedProducts = lazy(() => import("@/components/related-products"))
const Reviews = lazy(() => import("@/components/product-reviews"))

const LoadingCard: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center space-x-3">
      <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      <p className="text-gray-600">{title}</p>
    </div>
  </div>
)

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Product Detail - Streaming with Suspense</h1>
        <p className="text-gray-600 mb-8">
          This example demonstrates streaming SSR with Suspense boundaries. The main content loads immediately, while
          secondary content streams in as it becomes ready.
        </p>

        {/* This content loads immediately */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-4">Premium Wireless Headphones</h2>
          <div className="flex items-center mb-6">
            <span className="text-4xl font-bold text-gray-900">$299</span>
            <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">In Stock</span>
          </div>
          <p className="text-gray-700 mb-6">
            Experience audio like never before with our premium wireless headphones featuring active noise cancellation,
            30-hour battery life, and studio-quality sound.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Add to Cart
          </button>
        </div>

        {/* These sections stream in as they become ready */}
        <div className="grid gap-6">
          <Suspense fallback={<LoadingCard title="Loading Reviews..." />}>
            <Reviews />
          </Suspense>

          <Suspense fallback={<LoadingCard title="Loading Comments..." />}>
            <Comments />
          </Suspense>

          <Suspense fallback={<LoadingCard title="Loading Related Products..." />}>
            <RelatedProducts />
          </Suspense>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Streaming benefits:</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Main content appears immediately without waiting for all data</li>
            <li>• Each Suspense boundary can resolve independently</li>
            <li>• Users can start interacting with the page much sooner</li>
            <li>• Progressive loading creates a better perceived performance</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
