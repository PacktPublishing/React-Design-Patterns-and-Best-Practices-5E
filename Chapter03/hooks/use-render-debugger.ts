"use client"

import { useEffect, useRef } from "react"

export const useRenderDebugger = (componentName: string, props: any) => {
  const prevProps = useRef(props)
  const renderCount = useRef(0)

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      renderCount.current += 1
      console.log(`[${componentName}] Render #${renderCount.current}`)

      if (prevProps.current) {
        const changedProps = Object.keys(props).filter((key) => props[key] !== prevProps.current[key])
        if (changedProps.length) {
          console.log(`[${componentName}] Props changed:`, changedProps.join(", "))
          changedProps.forEach((key) => {
            console.log(`  ${key}:`, prevProps.current[key], "->", props[key])
          })
        } else {
          console.log(`[${componentName}] Re-rendered without prop changes`)
        }
      }
      prevProps.current = props
    }
  })
}
