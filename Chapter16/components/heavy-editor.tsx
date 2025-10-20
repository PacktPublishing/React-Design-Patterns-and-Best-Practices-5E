"use client"

import { useState } from "react"

export default function HeavyEditor() {
  const [content, setContent] = useState("Start typing your content here...")

  return (
    <div className="bg-white p-8 rounded-b-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Editor</h2>
      <div className="border rounded-lg">
        <div className="bg-gray-50 border-b p-2 flex gap-2">
          <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">Bold</button>
          <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">Italic</button>
          <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">Underline</button>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 min-h-[400px] focus:outline-none"
        />
      </div>
      <div className="mt-4 text-sm text-gray-600">Character count: {content.length}</div>
    </div>
  )
}
