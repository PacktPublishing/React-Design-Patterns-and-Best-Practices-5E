"use client"

import { useState } from "react"

interface User {
  name: string
  email: string
  preferences: { theme: string; notifications: boolean }
}

export default function UserProfilePage() {
  const [user, setUser] = useState<User>({
    name: "Carlos Santana",
    email: "carlos@example.com",
    preferences: { theme: "dark", notifications: true },
  })

  const updatePreferences = () => {
    // These updates are batched automatically since React 18
    setUser((prev) => ({ ...prev, preferences: { ...prev.preferences, theme: "light" } }))
    setUser((prev) => ({ ...prev, preferences: { ...prev.preferences, notifications: false } }))
    // Only one re-render occurs despite two state updates
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">User Profile - Automatic Batching</h1>
        <p className="text-gray-600 mb-8">
          This example demonstrates React 18's automatic batching. Two state updates occur in the same function, but
          React batches them into a single re-render.
        </p>

        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
          <p className="text-gray-600 mb-2">{user.email}</p>
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="text-sm">Theme: {user.preferences.theme}</p>
            <p className="text-sm">Notifications: {user.preferences.notifications ? "On" : "Off"}</p>
          </div>
          <button
            onClick={updatePreferences}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Preferences
          </button>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">How it works:</h3>
          <p className="text-sm text-gray-700">
            When you click the button, two setState calls happen in sequence. In React 18+, these are automatically
            batched together, resulting in only one re-render instead of two. This improves performance by reducing
            unnecessary DOM updates.
          </p>
        </div>
      </div>
    </div>
  )
}
