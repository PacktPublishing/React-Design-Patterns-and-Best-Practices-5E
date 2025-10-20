"use client"

import { useEffect, useState } from "react"

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    // Simulate async data loading
    setTimeout(() => {
      setReviews([
        { id: 1, author: "Sarah Wilson", rating: 5, text: "Amazing sound quality!", date: "3 days ago" },
        { id: 2, author: "Tom Brown", rating: 4, text: "Very comfortable for long use.", date: "1 week ago" },
        { id: 3, author: "Lisa Anderson", rating: 5, text: "Worth every penny!", date: "2 weeks ago" },
      ])
    }, 1000)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold">{review.author}</span>
                <div className="flex items-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
