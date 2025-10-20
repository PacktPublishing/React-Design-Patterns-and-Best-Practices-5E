"use client"

import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"

export function UserMenu() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  if (status === "loading") {
    return <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
  }

  if (!session?.user) {
    return (
      <Link
        href="/auth/signin"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                   rounded-lg hover:bg-blue-700 transition-colors"
      >
        Sign In
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 
                   transition-colors"
      >
        <img
          src={session.user.image || "/placeholder.svg?height=32&width=32"}
          alt={session.user.name || "User"}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">{session.user.name}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg 
                        border border-gray-200 py-1"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">{session.user.email}</p>
            <p className="text-xs text-gray-400 mt-1">Role: {session.user.role}</p>
          </div>

          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Profile
          </Link>

          <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Settings
          </Link>

          {session.user.role === "admin" && (
            <Link href="/admin" className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50">
              Admin Panel
            </Link>
          )}

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 
                       hover:bg-red-50 border-t border-gray-100 mt-1"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
