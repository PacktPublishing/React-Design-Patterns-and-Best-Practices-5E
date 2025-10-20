"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { z } from "zod"
import { debounce } from "lodash"

// Simulate API call to check username availability
async function checkUsernameAvailable(username: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const taken = ["admin", "root", "user123"]
  return !taken.includes(username.toLowerCase())
}

const UsernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be at most 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Invalid characters")

export function UsernameField() {
  const [username, setUsername] = useState("")
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [available, setAvailable] = useState<boolean | null>(null)

  const checkUsername = useCallback(
    debounce(async (value: string) => {
      setChecking(true)
      setError(null)

      try {
        // First, validate format
        UsernameSchema.parse(value)

        // Then check availability
        const isAvailable = await checkUsernameAvailable(value)
        setAvailable(isAvailable)

        if (!isAvailable) {
          setError("Username is already taken")
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          setError(err.errors[0].message)
        }
        setAvailable(null)
      } finally {
        setChecking(false)
      }
    }, 500),
    [],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)

    if (value.length >= 3) {
      checkUsername(value)
    } else {
      setError(null)
      setAvailable(null)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Username Field (Async Validation)</h2>
      <p className="text-sm text-gray-600 mb-4">Try: admin, root, user123 (taken) or any other username</p>

      <div className="relative">
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Choose a username"
          className={`w-full p-3 pr-10 border rounded-lg ${
            error ? "border-red-500" : available ? "border-green-500" : "border-gray-300"
          }`}
        />

        {/* Status indicator */}
        <div className="absolute right-3 top-3.5">
          {checking && (
            <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          )}
          {!checking && available && <span className="text-green-500 text-xl">✓</span>}
          {!checking && error && <span className="text-red-500 text-xl">✕</span>}
        </div>
      </div>

      {/* Error or success message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {available && !checking && <p className="text-green-500 text-sm mt-1">Username is available!</p>}
    </div>
  )
}
