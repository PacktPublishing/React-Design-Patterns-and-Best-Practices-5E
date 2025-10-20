"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react"

// Anti-pattern: Spreading all props onto DOM elements
interface ButtonWrapperBadProps {
  onClick: () => void
  className?: string
  [key: string]: any // Allowing arbitrary props
}

const ButtonWrapperBad: React.FC<ButtonWrapperBadProps> = (props) => {
  // This spreads ALL props, including non-DOM attributes
  return <button {...props} />
}

// Best practice: Explicitly handle props
interface ButtonWrapperGoodProps {
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  children: React.ReactNode
  variant?: "primary" | "secondary" | "danger"
  size?: "small" | "medium" | "large"
  "data-testid"?: string
  "aria-label"?: string
}

const ButtonWrapperGood: React.FC<ButtonWrapperGoodProps> = ({
  onClick,
  className,
  disabled,
  type = "button",
  children,
  variant = "primary",
  size = "medium",
  "data-testid": dataTestId,
  "aria-label": ariaLabel,
}) => {
  // Explicitly construct className
  const buttonClassName = ["btn", `btn-${variant}`, `btn-${size}`, className].filter(Boolean).join(" ")

  // Only pass valid, explicitly defined DOM props
  return (
    <button
      onClick={onClick}
      className={buttonClassName}
      disabled={disabled}
      type={type}
      data-testid={dataTestId}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default function PropSpreadingPage() {
  const [clickCount, setClickCount] = useState(0)

  const dangerousProps = {
    onClick: () => setClickCount((c) => c + 1),
    className: "px-4 py-2 rounded",
    // These could be dangerous if spread directly
    dangerouslySetInnerHTML: { __html: '<script>alert("XSS")</script>' },
    customData: { internal: "data" },
  }

  const safeProps = {
    onClick: () => setClickCount((c) => c + 1),
    className: "px-4 py-2 rounded bg-primary text-primary-foreground",
    variant: "primary" as const,
    size: "medium" as const,
    "data-testid": "safe-button",
    "aria-label": "Increment counter",
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Prop Spreading Security</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Spreading props directly onto DOM elements is dangerous and can lead to security vulnerabilities, invalid
            DOM attributes, and performance issues.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Click Counter</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">Clicks: {clickCount}</Badge>
          </CardContent>
        </Card>

        <Tabs defaultValue="bad" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bad">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Anti-Pattern
            </TabsTrigger>
            <TabsTrigger value="good">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Best Practice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bad">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="destructive">Anti-Pattern</Badge>
                  Spreading All Props
                </CardTitle>
                <CardDescription>
                  This approach spreads all props including potentially dangerous ones. Check the browser console for
                  React warnings about invalid props.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Security Risk: Props like dangerouslySetInnerHTML could be passed through, and non-DOM props cause
                    React warnings.
                  </AlertDescription>
                </Alert>
                <div>
                  <ButtonWrapperBad
                    onClick={() => setClickCount((c) => c + 1)}
                    className="px-4 py-2 rounded bg-primary text-primary-foreground"
                  >
                    Safe Click (No dangerous props)
                  </ButtonWrapperBad>
                </div>
                <div className="p-4 bg-muted rounded">
                  <p className="text-sm font-mono">{`<ButtonWrapperBad {...props} />`}</p>
                  <p className="text-xs text-muted-foreground mt-2">Spreads ALL props without validation</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="good">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Best Practice</Badge>
                  Explicit Prop Handling
                </CardTitle>
                <CardDescription>
                  Only explicitly defined props are passed to the DOM element, preventing security issues and invalid
                  attributes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>Secure: Only whitelisted props can be passed to the DOM element.</AlertDescription>
                </Alert>
                <div>
                  <ButtonWrapperGood {...safeProps}>Safe Click (Validated Props)</ButtonWrapperGood>
                </div>
                <div className="p-4 bg-muted rounded">
                  <p className="text-sm font-mono text-balance">
                    {`<button onClick={onClick} className={className} ... />`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Only explicitly defined props are forwarded</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• Never spread arbitrary props directly onto DOM elements</p>
            <p>• Explicitly define and validate all props your component accepts</p>
            <p>• Use TypeScript interfaces to enforce prop types</p>
            <p>• Whitelist safe props instead of blacklisting dangerous ones</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
