"use client"

import type React from "react"

import { useState, useTransition } from "react"

interface Tab {
  id: string
  title: string
  content: string
}

const HeavyTabContent: React.FC<{ content: string }> = ({ content }) => {
  const items = Array.from({ length: 1000 }, (_, i) => `${content} - Item ${i}`)

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="p-3 bg-gray-50 rounded border">
          {item}
        </div>
      ))}
    </div>
  )
}

export default function TabNavigatorPage() {
  const [activeTab, setActiveTab] = useState("tab1")
  const [isPending, startTransition] = useTransition()

  const tabs: Tab[] = [
    { id: "tab1", title: "Dashboard", content: "Dashboard Data" },
    { id: "tab2", title: "Analytics", content: "Analytics Data" },
    { id: "tab3", title: "Reports", content: "Report Data" },
    { id: "tab4", title: "Settings", content: "Settings Data" },
  ]

  const handleTabChange = (tabId: string) => {
    startTransition(() => {
      setActiveTab(tabId)
    })
  }

  const currentTab = tabs.find((tab) => tab.id === activeTab)!

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Tab Navigator - startTransition</h1>
        <p className="text-gray-600 mb-8">
          This example shows how startTransition keeps tab buttons responsive even when rendering heavy content. Notice
          how clicking tabs feels instant.
        </p>

        <div className="flex border-b mb-6 bg-white rounded-t-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === tab.id ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.title}
              {isPending && activeTab !== tab.id && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        <div className={`transition-opacity ${isPending ? "opacity-50" : "opacity-100"}`}>
          <h2 className="text-2xl font-bold mb-4">{currentTab.title}</h2>
          <div className="max-h-96 overflow-y-auto bg-white rounded-b-lg p-4">
            <HeavyTabContent content={currentTab.content} />
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">What's happening:</h3>
          <p className="text-sm text-gray-700">
            The tab buttons remain instantly responsive when clicked, even though rendering the new tab content is
            expensive (1,000 items). React prioritizes the tab button state update over the content rendering, keeping
            the UI feeling snappy. The isPending flag lets us show visual feedback during the transition.
          </p>
        </div>
      </div>
    </div>
  )
}
