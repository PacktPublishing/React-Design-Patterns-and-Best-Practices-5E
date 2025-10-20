"use client"

import { useEffect, useState } from "react"

interface MousePosition {
  x: number
  y: number
}

// Simulating cacheSignal behavior (not available in React 19.1)
// In React 19.2, you would import this from 'react'
function createSignal<T>(initialValue: T) {
  let value = initialValue
  const subscribers = new Set<(value: T) => void>()

  return {
    get: () => value,
    set: (newValue: T) => {
      value = newValue
      subscribers.forEach((fn) => fn(value))
    },
    subscribe: (fn: (value: T) => void) => {
      subscribers.add(fn)
      return () => subscribers.delete(fn)
    },
  }
}

const mousePositionSignal = createSignal<MousePosition>({ x: 0, y: 0 })

function useSignal<T>(signal: ReturnType<typeof createSignal<T>>): T {
  const [value, setValue] = useState(signal.get())

  useEffect(() => {
    return signal.subscribe(setValue)
  }, [signal])

  return value
}

function MouseTracker() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionSignal.set({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return null
}

function MouseFollower() {
  const position = useSignal(mousePositionSignal)

  return (
    <div
      className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  )
}

function MouseDisplay() {
  const position = useSignal(mousePositionSignal)

  return (
    <div className="bg-white px-4 py-2 rounded-lg shadow-lg border font-mono text-sm">
      <div className="text-slate-600 text-xs mb-1">Mouse Position</div>
      <div className="text-slate-900">
        X: {position.x} Y: {position.y}
      </div>
    </div>
  )
}

export function MouseTrackerDemo() {
  const [renderCount, setRenderCount] = useState(0)

  return (
    <div className="relative min-h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-8">
      <MouseTracker />
      <MouseFollower />

      <div className="space-y-4">
        <MouseDisplay />

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-semibold mb-2">Static Content</h3>
          <p className="text-sm text-muted-foreground mb-3">
            This content never re-renders, even though the mouse position updates hundreds of times per second.
          </p>
          <button
            onClick={() => setRenderCount((c) => c + 1)}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Force Re-render (Count: {renderCount})
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Try this:</strong> Move your mouse around and click the button. Notice how the mouse follower and
            display update smoothly, but the button click is the only thing that causes this section to re-render.
          </p>
        </div>
      </div>
    </div>
  )
}
