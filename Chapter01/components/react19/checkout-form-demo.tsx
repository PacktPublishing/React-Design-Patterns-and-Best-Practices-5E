"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface OrderData {
  email: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

// Simulating performance tracking (not available in React 19.1)
// In React 19.2, you would use defineTrack and startTracking from 'react'
const performanceLog: Array<{ track: string; operation: string; duration: number }> = []

function trackPerformance(track: string, operation: string, fn: () => void) {
  const start = performance.now()
  fn()
  const duration = performance.now() - start

  performanceLog.push({ track, operation, duration })

  if (duration > 100) {
    console.warn(`[Performance] ${track}/${operation} took ${duration.toFixed(2)}ms (threshold: 100ms)`)
  }
}

async function submitOrder(data: OrderData): Promise<void> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log("Order submitted:", data)
}

export function CheckoutFormDemo() {
  const [formData, setFormData] = useState<Partial<OrderData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: keyof OrderData, value: string) => {
    trackPerformance("checkout", "form-input", () => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trackingStart = performance.now()
    setIsSubmitting(true)

    try {
      await submitOrder(formData as OrderData)
      setSubmitted(true)

      const duration = performance.now() - trackingStart
      console.log(`[Performance] checkout/form-submit took ${duration.toFixed(2)}ms`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Order Submitted!</h3>
        <p className="text-muted-foreground">Your order has been processed successfully.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            type="text"
            placeholder="MM/YY"
            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            type="text"
            placeholder="123"
            onChange={(e) => handleInputChange("cvv", e.target.value)}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Processing..." : "Complete Purchase"}
      </Button>

      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Performance Tracking:</strong> Open your browser console to see performance logs. In React 19.2, these
          would be automatically tracked and you could pipe them to your analytics platform.
        </p>
      </div>
    </form>
  )
}
