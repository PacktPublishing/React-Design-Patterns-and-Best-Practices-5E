"use client"

import { useLoaderData, Form, useActionData, useNavigation } from "react-router-dom"
import { useState } from "react"
import { clsx } from "clsx"
import type { Product } from "../types"

interface ActionData {
  success?: boolean
  error?: string
  review?: {
    id: string
    rating: number
    comment: string
  }
}

export function ProductPage() {
  const product = useLoaderData() as Product
  const actionData = useActionData() as ActionData
  const navigation = useNavigation()
  const [selectedImage, setSelectedImage] = useState(0)

  const isSubmitting = navigation.state === "submitting"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <img
          src={product.images[selectedImage] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
        <div className="flex space-x-2 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={clsx(
                "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors",
                selectedImage === index ? "border-blue-500" : "border-gray-200 hover:border-gray-300",
              )}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 mt-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add a Review</h3>
          <Form method="post" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                name="rating"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a rating</option>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} star{rating !== 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                name="comment"
                rows={4}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your thoughts about this product..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                "w-full px-4 py-2 rounded-md font-medium transition-colors",
                isSubmitting
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              )}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </Form>

          {actionData?.success && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800">Review submitted successfully!</p>
            </div>
          )}

          {actionData?.error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{actionData.error}</p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Reviews ({product.reviews.length})</h3>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{review.author}</span>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={clsx("text-sm", i < review.rating ? "text-yellow-400" : "text-gray-300")}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
