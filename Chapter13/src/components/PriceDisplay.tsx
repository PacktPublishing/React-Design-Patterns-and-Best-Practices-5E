"use client"

import { useFormatter } from "../hooks/useFormatter"

interface PriceDisplayProps {
  amount: number
  currency?: string
  showChange?: boolean
  changePercent?: number
}

export function PriceDisplay({ amount, currency = "USD", showChange = false, changePercent = 0 }: PriceDisplayProps) {
  const formatter = useFormatter()

  return (
    <div className="flex items-baseline space-x-2">
      <span className="text-3xl font-bold text-gray-900">{formatter.formatCurrency(amount, currency)}</span>

      {showChange && (
        <span className={`text-sm font-medium ${changePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
          {changePercent >= 0 ? "↑" : "↓"} {formatter.formatPercent(Math.abs(changePercent))}
        </span>
      )}
    </div>
  )
}
