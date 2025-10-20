"use client"

import type React from "react"

import { useState, useMemo, useCallback, type UIEvent } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react"

interface ListItem {
  id: number
  title: string
  description: string
  timestamp: Date
}

const generateItems = (count: number): ListItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}. It contains some sample text to make the items more realistic.`,
    timestamp: new Date(Date.now() - Math.random() * 10000000000),
  }))

// Anti-pattern: Rendering all items
const LargeListBad: React.FC<{ items: ListItem[] }> = ({ items }) => {
  return (
    <div className="h-96 overflow-auto border rounded">
      <div className="p-2">
        <Badge variant="destructive" className="mb-2">
          Rendering {items.length} DOM nodes!
        </Badge>
        {items.map((item) => (
          <div key={item.id} className="p-4 border-b last:border-b-0 hover:bg-muted/50">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            <small className="text-xs text-muted-foreground">{item.timestamp.toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

// Best practice: Virtual scrolling
const ITEM_HEIGHT = 100
const CONTAINER_HEIGHT = 384 // h-96 in pixels
const VISIBLE_ITEMS = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT)
const BUFFER_SIZE = 5

const VirtualizedList: React.FC<{ items: ListItem[] }> = ({ items }) => {
  const [scrollTop, setScrollTop] = useState(0)

  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / ITEM_HEIGHT)
    const endIndex = Math.min(items.length - 1, startIndex + VISIBLE_ITEMS + BUFFER_SIZE)
    const visibleStartIndex = Math.max(0, startIndex - BUFFER_SIZE)

    return { startIndex: visibleStartIndex, endIndex }
  }, [scrollTop, items.length])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1)
  }, [items, visibleRange])

  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  const totalHeight = items.length * ITEM_HEIGHT
  const offsetY = visibleRange.startIndex * ITEM_HEIGHT

  return (
    <div className="h-96 overflow-auto border rounded" onScroll={handleScroll}>
      <div className="p-2">
        <Badge variant="default" className="mb-2 sticky top-0 z-10">
          Rendering {visibleItems.length} of {items.length} items
        </Badge>
        <div style={{ height: totalHeight, position: "relative" }}>
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            {visibleItems.map((item, index) => {
              const actualIndex = visibleRange.startIndex + index
              return (
                <div
                  key={item.id}
                  style={{ height: ITEM_HEIGHT }}
                  className="p-4 border-b flex flex-col justify-center hover:bg-muted/50"
                >
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  <small className="text-xs text-muted-foreground">
                    #{actualIndex} - {item.timestamp.toLocaleString()}
                  </small>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VirtualScrollPage() {
  const [itemCount, setItemCount] = useState(100)
  const items = useMemo(() => generateItems(itemCount), [itemCount])

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
          <h1 className="text-4xl font-bold mb-4">Virtual Scrolling</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Rendering massive lists without virtualization becomes catastrophic with thousands of items, choking the
            browser's main thread.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>List Size Controls</CardTitle>
            <CardDescription>Increase the item count to see the performance difference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={() => setItemCount(100)} variant="outline">
                100 Items
              </Button>
              <Button onClick={() => setItemCount(1000)} variant="outline">
                1,000 Items
              </Button>
              <Button onClick={() => setItemCount(10000)} variant="outline">
                10,000 Items
              </Button>
              <Badge variant="secondary">Current: {itemCount} items</Badge>
            </div>
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
                  Render All Items
                </CardTitle>
                <CardDescription>
                  All items are rendered upfront. Try scrolling with 10,000 items - notice the lag and memory usage!
                </CardDescription>
              </CardHeader>
              <CardContent>
                {itemCount <= 1000 ? (
                  <LargeListBad items={items} />
                ) : (
                  <div className="p-8 border rounded text-center">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-destructive" />
                    <p className="text-muted-foreground">Rendering {itemCount} items would freeze your browser!</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Reduce to 1,000 or fewer items to see the anti-pattern in action.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="good">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Best Practice</Badge>
                  Virtual Scrolling
                </CardTitle>
                <CardDescription>
                  Only visible items plus a buffer are rendered. Smooth scrolling even with 10,000+ items!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VirtualizedList items={items} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• Virtual scrolling renders only visible items plus a small buffer</p>
            <p>• Memory usage remains constant regardless of list size</p>
            <p>• Initial render is instant, scrolling stays smooth</p>
            <p>• Consider libraries like react-window or react-virtuoso for production</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
