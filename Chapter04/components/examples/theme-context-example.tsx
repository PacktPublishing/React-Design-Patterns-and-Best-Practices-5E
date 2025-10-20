// Theme context example
"use client"

import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ThemeContextExample() {
  const { colors, mode, toggleMode } = useTheme()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Theme Context Example</h2>

      <Card style={{ backgroundColor: colors.background, color: colors.text }}>
        <CardHeader>
          <CardTitle>Current Theme: {mode}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-70">Primary</p>
              <div className="h-12 rounded" style={{ backgroundColor: colors.primary }} />
            </div>
            <div>
              <p className="text-sm opacity-70">Secondary</p>
              <div className="h-12 rounded" style={{ backgroundColor: colors.secondary }} />
            </div>
          </div>
          <Button onClick={toggleMode}>Toggle Theme</Button>
        </CardContent>
      </Card>
    </div>
  )
}
