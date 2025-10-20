// Ref callbacks for cleanup and side effects
"use client"

import { useResizeObserver } from "@/hooks/use-resize-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ResizableComponent() {
  const { ref, dimensions } = useResizeObserver()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Resize Observer Example</h2>
      <Card>
        <CardHeader>
          <CardTitle>Resizable Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={ref}
            className="resize overflow-hidden border-2 border-dashed border-border min-w-[200px] min-h-[100px] p-4"
          >
            <h3 className="font-semibold mb-2">Drag the corner to resize</h3>
            {dimensions && (
              <p className="text-muted-foreground">
                Size: {Math.round(dimensions.width)}x{Math.round(dimensions.height)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
