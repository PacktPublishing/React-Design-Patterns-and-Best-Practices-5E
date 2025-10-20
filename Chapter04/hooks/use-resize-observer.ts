"use client"

// Custom hook for managing ResizeObserver with ref callbacks
import { useCallback, useRef, useState } from "react"

interface ResizeObserverHookReturn {
  ref: (element: HTMLElement | null) => void
  dimensions: { width: number; height: number } | null
}

export function useResizeObserver(): ResizeObserverHookReturn {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const ref = useCallback((element: HTMLElement | null) => {
    // Cleanup previous observer
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect()
    }

    if (element) {
      // Create new observer
      resizeObserverRef.current = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      })

      resizeObserverRef.current.observe(element)

      // Set initial dimensions
      const { width, height } = element.getBoundingClientRect()
      setDimensions({ width, height })
    } else {
      // Element is being unmounted
      resizeObserverRef.current = null
      setDimensions(null)
    }
  }, [])

  return { ref, dimensions }
}
