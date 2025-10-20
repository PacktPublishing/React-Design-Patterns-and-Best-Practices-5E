"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react"

interface ListItem {
  id: string
  name: string
  description: string
}

// Anti-pattern: Using index as key
const DynamicListBad: React.FC<{ items: ListItem[] }> = ({ items }) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())
  const [notes, setNotes] = useState<string[]>(items.map(() => ""))

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const updateNote = (index: number, value: string) => {
    setNotes((prev) => {
      const newNotes = [...prev]
      newNotes[index] = value
      return newNotes
    })
  }

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        // Using index as key causes problems
        <li key={index} className="border rounded p-4">
          <div onClick={() => toggleExpanded(index)} className="cursor-pointer hover:bg-muted/50 p-2 rounded">
            <h3 className="font-semibold">{item.name}</h3>
            {expandedItems.has(index) && <p className="text-sm text-muted-foreground mt-2">{item.description}</p>}
          </div>
          <Input
            type="text"
            placeholder="Add note..."
            value={notes[index] || ""}
            onChange={(e) => updateNote(index, e.target.value)}
            className="mt-2"
          />
        </li>
      ))}
    </ul>
  )
}

// Best practice: Using stable IDs as keys
const DynamicListGood: React.FC<{ items: ListItem[] }> = ({ items }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [itemNotes, setItemNotes] = useState<Record<string, string>>({})

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const updateNote = (itemId: string, note: string) => {
    setItemNotes((prev) => ({
      ...prev,
      [itemId]: note,
    }))
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        // Using stable ID as key
        <li key={item.id} className="border rounded p-4">
          <div onClick={() => toggleExpanded(item.id)} className="cursor-pointer hover:bg-muted/50 p-2 rounded">
            <h3 className="font-semibold">{item.name}</h3>
            {expandedItems.has(item.id) && <p className="text-sm text-muted-foreground mt-2">{item.description}</p>}
          </div>
          <Input
            type="text"
            placeholder="Add note..."
            value={itemNotes[item.id] || ""}
            onChange={(e) => updateNote(item.id, e.target.value)}
            className="mt-2"
          />
        </li>
      ))}
    </ul>
  )
}

export default function KeysPage() {
  const [items, setItems] = useState<ListItem[]>([
    { id: "1", name: "Item 1", description: "First item description" },
    { id: "2", name: "Item 2", description: "Second item description" },
    { id: "3", name: "Item 3", description: "Third item description" },
  ])

  const addItem = () => {
    const newItem: ListItem = {
      id: Date.now().toString(),
      name: `Item ${items.length + 1}`,
      description: `Description for item ${items.length + 1}`,
    }
    setItems([...items, newItem])
  }

  const removeFirst = () => {
    setItems((prev) => prev.slice(1))
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    setItems((prev) => {
      const newItems = [...prev]
      ;[newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]]
      return newItems
    })
  }

  const moveDown = (index: number) => {
    if (index === items.length - 1) return
    setItems((prev) => {
      const newItems = [...prev]
      ;[newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]]
      return newItems
    })
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
          <h1 className="text-4xl font-bold mb-4">Key and List Handling</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Using array indexes as keys in dynamic lists leads to subtle bugs, incorrect state preservation, and
            performance issues.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>List Controls</CardTitle>
            <CardDescription>
              Try adding items, removing the first item, or reordering to see the difference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={addItem}>Add Item</Button>
              <Button onClick={removeFirst} variant="destructive">
                Remove First
              </Button>
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
                  Using Index as Key
                </CardTitle>
                <CardDescription>
                  Type notes in the inputs, then remove the first item. Notice how the notes get associated with the
                  wrong items!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DynamicListBad items={items} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="good">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Best Practice</Badge>
                  Using Stable IDs as Keys
                </CardTitle>
                <CardDescription>
                  Type notes in the inputs, then remove the first item. The notes stay with their correct items!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DynamicListGood items={items} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• Keys help React identify which items have changed, been added, or removed</p>
            <p>• Using indexes as keys causes state to be associated with positions, not items</p>
            <p>• Keys should be stable, unique, and predictable</p>
            <p>• Use unique IDs from your data, not array indexes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
