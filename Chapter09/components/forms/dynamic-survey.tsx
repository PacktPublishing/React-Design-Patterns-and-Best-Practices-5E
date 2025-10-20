"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

export default function DynamicSurveyForm() {
  const [showOptional, setShowOptional] = useState(false)
  const [rating, setRating] = useState(0)
  const optionalFieldRef = useRef<HTMLTextAreaElement>(null)
  const announcementRef = useRef<HTMLDivElement>(null)

  const announce = (message: string) => {
    if (announcementRef.current) {
      announcementRef.current.textContent = message
    }
  }

  useEffect(() => {
    if (showOptional && optionalFieldRef.current) {
      optionalFieldRef.current.focus()
      announce("Additional feedback field is now available")
    }
  }, [showOptional])

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
    setShowOptional(newRating <= 3)
    announce(
      newRating <= 3
        ? `Rating ${newRating} selected. Please provide additional feedback.`
        : `Rating ${newRating} selected. Thank you!`,
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Feedback submitted!")
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Dynamic Survey (Focus Management)</h2>

      <div ref={announcementRef} role="status" aria-live="polite" aria-atomic="true" className="sr-only" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset>
          <legend className="text-sm font-medium mb-2">Rate your experience from 1 to 5</legend>
          <div role="radiogroup" aria-required="true" className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value} star${value !== 1 ? "s" : ""}`}
                onClick={() => handleRatingChange(value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" && value < 5) handleRatingChange(value + 1)
                  if (e.key === "ArrowLeft" && value > 1) handleRatingChange(value - 1)
                }}
                className={`w-12 h-12 rounded-full font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  rating === value ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </fieldset>

        {showOptional && (
          <div role="region" aria-live="polite" className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <label htmlFor="feedback" className="block text-sm font-medium mb-2">
              What could we improve?
              <span className="text-gray-500 ml-1">(Optional)</span>
            </label>
            <textarea
              ref={optionalFieldRef}
              id="feedback"
              name="feedback"
              rows={4}
              aria-describedby="feedback-help"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your feedback helps us improve..."
            />
            <p id="feedback-help" className="text-sm text-gray-600 mt-1">
              Your feedback will be reviewed by our team
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  )
}
