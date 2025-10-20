"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number) {
  const lastRun = useRef(Date.now())

  return useRef((...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastRun.current >= delay) {
      callback(...args)
      lastRun.current = now
    }
  }).current
}

export default function SearchInterfacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const debouncedSearch = useDebounce(searchTerm, 500)

  const handleMouseMove = useThrottle((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, 100)

  useEffect(() => {
    if (debouncedSearch) {
      console.log("Searching for:", debouncedSearch)
      // Perform expensive search operation here
    }
  }, [debouncedSearch])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6" onMouseMove={handleMouseMove}>
        <h1 className="text-4xl font-bold mb-4">Search Interface - Debouncing & Throttling</h1>
        <p className="text-gray-600 mb-8">
          This example demonstrates debouncing for search input and throttling for mouse movement tracking to optimize
          performance.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Optimized Search</h2>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>
              Search term: <span className="font-mono">{searchTerm}</span>
            </p>
            <p>
              Debounced search: <span className="font-mono">{debouncedSearch}</span>
            </p>
            <p className="mt-2">
              Mouse position: ({mousePosition.x}, {mousePosition.y})
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              💡 The search only executes 500ms after you stop typing, and mouse position updates are throttled to once
              per 100ms, preventing performance issues.
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Optimization techniques:</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              • <strong>Debouncing:</strong> Delays execution until events stop firing (good for search, form
              validation)
            </li>
            <li>
              • <strong>Throttling:</strong> Limits execution to once per time period (good for scroll, resize, mouse
              events)
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
