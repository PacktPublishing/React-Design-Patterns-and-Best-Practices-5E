"use client"

import type React from "react"

import { useState, memo, useCallback, useMemo } from "react"

interface User {
  id: number
  name: string
  email: string
}

interface UserCardProps {
  user: User
  onSelect: (id: number) => void
  settings: { showEmail: boolean; theme: string }
}

const UserCard: React.FC<UserCardProps> = memo(({ user, onSelect, settings }) => {
  console.log(`UserCard rendered for ${user.name}`)

  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg">{user.name}</h3>
      {settings.showEmail && <p className="text-gray-600 text-sm mt-1">{user.email}</p>}
      <button
        onClick={() => onSelect(user.id)}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
      >
        Select
      </button>
    </div>
  )
})

UserCard.displayName = "UserCard"

export default function UserListPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [showOptimized, setShowOptimized] = useState(false)

  const users: User[] = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Carol Williams", email: "carol@example.com" },
  ]

  // Optimized version with useCallback
  const handleSelectOptimized = useCallback((id: number) => {
    setSelectedId(id)
  }, [])

  // Unoptimized version - new function every render
  const handleSelectUnoptimized = (id: number) => {
    setSelectedId(id)
  }

  // Optimized settings with useMemo
  const settingsOptimized = useMemo(
    () => ({
      showEmail: true,
      theme: "light",
    }),
    [],
  )

  // Unoptimized settings - new object every render
  const settingsUnoptimized = { showEmail: true, theme: "light" }

  const handleSelect = showOptimized ? handleSelectOptimized : handleSelectUnoptimized
  const settings = showOptimized ? settingsOptimized : settingsUnoptimized

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">User List - Optimization Comparison</h1>
        <p className="text-gray-600 mb-8">
          Toggle between optimized and unoptimized versions to see the difference in re-renders. Check the console to
          see which components re-render.
        </p>

        <div className="mb-6 flex items-center gap-4 p-4 bg-white rounded-lg shadow">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showOptimized}
              onChange={(e) => setShowOptimized(e.target.checked)}
              className="w-5 h-5 text-blue-600 mr-2"
            />
            <span className="font-medium">Use Optimized Version (useCallback + useMemo)</span>
          </label>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onSelect={handleSelect} settings={settings} />
          ))}
        </div>

        {selectedId && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-900">Selected user ID: {selectedId}</p>
          </div>
        )}

        <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold mb-2">What's happening:</h3>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Without optimization:</strong> Every time you select a user, ALL UserCards re-render because the
            onSelect function and settings object are recreated with new references on every render.
          </p>
          <p className="text-sm text-gray-700">
            <strong>With optimization:</strong> useCallback and useMemo maintain stable references, so React.memo can
            prevent unnecessary re-renders. Only the selected user's card updates.
          </p>
        </div>
      </div>
    </div>
  )
}
