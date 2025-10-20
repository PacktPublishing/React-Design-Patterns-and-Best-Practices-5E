"use client"

import type React from "react"

import { useState, useRef } from "react"

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
}

function VirtualList<T>({ items, itemHeight, containerHeight, renderItem }: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const visibleStart = Math.floor(scrollTop / itemHeight)
  const visibleEnd = Math.ceil((scrollTop + containerHeight) / itemHeight)
  const visibleItems = items.slice(visibleStart, visibleEnd)

  const offsetY = visibleStart * itemHeight
  const totalHeight = items.length * itemHeight

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="overflow-auto border rounded-lg"
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={visibleStart + index} style={{ height: itemHeight }}>
              {renderItem(item, visibleStart + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
}

export default function MessageListPage() {
  const messages: Message[] = Array.from({ length: 10000 }, (_, i) => ({
    id: `msg-${i}`,
    sender: `User ${i % 50}`,
    content: `Message content ${i} - This is a sample message for testing virtualization.`,
    timestamp: new Date(Date.now() - i * 60000),
  }))

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Virtual Message List</h1>
        <p className="text-gray-600 mb-8">
          This example demonstrates virtualization with 10,000 messages. Only visible items are rendered, making
          scrolling smooth and performant.
        </p>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Total messages:</strong> {messages.length.toLocaleString()} |<strong> Rendering:</strong> Only ~8
            visible items at a time
          </p>
        </div>

        <VirtualList
          items={messages}
          itemHeight={80}
          containerHeight={600}
          renderItem={(message) => (
            <div className="p-4 border-b hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-gray-900">{message.sender}</span>
                <span className="text-xs text-gray-500">{message.timestamp.toLocaleTimeString()}</span>
              </div>
              <p className="text-gray-700 mt-1">{message.content}</p>
            </div>
          )}
        />

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">How virtualization works:</h3>
          <p className="text-sm text-gray-700">
            Instead of rendering all 10,000 messages, we only render the items visible in the viewport plus a small
            buffer. As you scroll, DOM nodes are recycled and reused for different data items. This dramatically reduces
            the number of DOM nodes and makes large lists performant.
          </p>
        </div>
      </div>
    </div>
  )
}
