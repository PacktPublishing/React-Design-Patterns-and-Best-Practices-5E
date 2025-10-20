"use client"

import { useEffect, useState } from "react"

export default function RelatedProducts() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    // Simulate async data loading
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Wireless Earbuds", price: 129 },
        { id: 2, name: "Headphone Case", price: 29 },
        { id: 3, name: "Audio Cable", price: 19 },
        { id: 4, name: "Charging Dock", price: 49 },
      ])
    }, 2000)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Related Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="w-full h-24 bg-gray-200 rounded mb-2"></div>
            <h4 className="font-semibold text-sm">{product.name}</h4>
            <p className="text-lg font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
