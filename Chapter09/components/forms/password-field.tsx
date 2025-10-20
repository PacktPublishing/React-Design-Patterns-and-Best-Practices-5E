"use client"

import { useState, useId } from "react"

export function AccessiblePasswordField() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)

  const fieldId = useId()
  const helpId = useId()
  const errorId = useId()

  const requirements = [
    { test: (p: string) => p.length >= 8, message: "At least 8 characters" },
    { test: (p: string) => /[A-Z]/.test(p), message: "One uppercase letter" },
    { test: (p: string) => /[a-z]/.test(p), message: "One lowercase letter" },
    { test: (p: string) => /[0-9]/.test(p), message: "One number" },
    { test: (p: string) => /[^A-Za-z0-9]/.test(p), message: "One special character" },
  ]

  const failedRequirements = requirements.filter((req) => !req.test(password))
  const isValid = password.length > 0 && failedRequirements.length === 0

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Accessible Password Field</h2>

      <div className="space-y-4">
        <label htmlFor={fieldId} className="block text-sm font-medium mb-1">
          Create Password
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        </label>

        <div className="relative">
          <input
            id={fieldId}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-required="true"
            aria-invalid={password.length > 0 && !isValid}
            aria-describedby={`${helpId} ${failedRequirements.length > 0 ? errorId : ""}`}
            className={`w-full pr-10 p-2 border rounded
              ${password.length > 0 ? (isValid ? "border-green-500" : "border-red-500") : "border-gray-300"}
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-2 p-1 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>

        {(focused || failedRequirements.length > 0) && (
          <div id={helpId} role="region" aria-live="polite" className="mt-2 p-3 bg-gray-50 rounded text-sm">
            <p className="font-medium mb-1">Password must contain:</p>
            <ul className="space-y-1">
              {requirements.map((req, index) => {
                const met = req.test(password)
                return (
                  <li key={index} className={`flex items-center ${met ? "text-green-600" : "text-gray-600"}`}>
                    <span aria-hidden="true" className="mr-2">
                      {met ? "✓" : "○"}
                    </span>
                    {req.message}
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {password.length > 0 && failedRequirements.length > 0 && (
          <div id={errorId} className="sr-only" role="alert">
            Password does not meet {failedRequirements.length} requirement(s):
            {failedRequirements.map((req) => req.message).join(", ")}
          </div>
        )}
      </div>
    </div>
  )
}
