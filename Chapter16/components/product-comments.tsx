"use client"

import { useEffect, useState } from "react"

export default function Comments() {
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    // Simulate async data loading
    setTimeout(() => {
      setComments([
        { id: 1, author: "John Doe", text: "Great product! Highly recommended.", date: "2 days ago" },
        { id: 2, author: "Jane Smith", text: "Best purchase I made this year.", date: "1 week ago" },
        { id: 3, author: "Mike Johnson", text: "Excellent quality and fast shipping.", date: "2 weeks ago" },
      ])
    }, 1500)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Customer Comments</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold">{comment.author}</span>
              <span className="text-sm text-gray-500">{comment.date}</span>
            </div>
            <p className="text-gray-700">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
