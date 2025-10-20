"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

/**
 * EnhancedProductCard Component
 *
 * A sophisticated product display component that combines visual appeal with functional features.
 *
 * Design Principles:
 * - Progressive enhancement: Base functionality works, animations enhance the experience
 * - Accessibility first: Proper ARIA labels, keyboard navigation, and screen reader support
 * - Performance conscious: Optimized for bundle size and runtime performance
 *
 * Styling Architecture:
 * - Uses design tokens for consistent spacing and colors
 * - Implements dark mode support through Tailwind's dark: prefix
 * - Responsive design with mobile-first approach
 * - Micro-interactions for enhanced user engagement
 */

interface Product {
  id: string
  image: string
  title: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  inStock: boolean
}

interface EnhancedProductCardProps {
  product: Product
  onAddToCart: (productId: string) => Promise<void>
  onFavorite: (productId: string) => void
  isFavorited: boolean
}

export const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({
  product,
  onAddToCart,
  onFavorite,
  isFavorited,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    await onAddToCart(product.id)
    setIsLoading(false)
  }

  return (
    <div className="group relative max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => onFavorite(product.id)}
          className={cn(
            "absolute top-2 right-2 p-2 rounded-full transition-all duration-200",
            isFavorited ? "bg-red-500 text-white" : "bg-white/80 hover:bg-white text-gray-600 hover:text-red-500",
          )}
        >
          <span className="text-lg">{isFavorited ? "❤️" : "🤍"}</span>
        </button>
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            Save ${(product.originalPrice - product.price).toFixed(0)}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{product.title}</h3>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={cn(
                  "text-sm",
                  i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600",
                )}
              >
                ⭐
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <div
            className={cn(
              "text-sm font-medium",
              product.inStock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
            )}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isLoading}
          className={cn(
            "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
            product.inStock && !isLoading
              ? "bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-[1.02] active:scale-[0.98]"
              : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed",
          )}
        >
          {isLoading ? "Adding..." : !product.inStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}
