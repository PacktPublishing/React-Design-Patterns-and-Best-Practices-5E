"use client"

import { useState, useTransition, useDeferredValue } from "react"

interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
}

export default function ProductCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isPending, startTransition] = useTransition()
  const deferredQuery = useDeferredValue(searchQuery)

  const products: Product[] = Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    name: `Product ${i}`,
    category: ["Electronics", "Clothing", "Home", "Sports"][i % 4],
    price: Math.floor(Math.random() * 1000) + 10,
    description: `Description for product ${i}`,
  }))

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(deferredQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(deferredQuery.toLowerCase()),
  )

  const handleSearch = (value: string) => {
    startTransition(() => {
      setSearchQuery(value)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Product Catalog - useTransition</h1>
        <p className="text-gray-600 mb-8">
          This example demonstrates concurrent rendering with useTransition and useDeferredValue. Search through 5,000
          products while keeping the input responsive.
        </p>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search 5,000 products..."
              className="w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isPending && (
              <div className="absolute right-3 top-3">
                <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">Found {filteredProducts.length} products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.slice(0, 50).map((product) => (
            <div key={product.id} className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>

        {filteredProducts.length > 50 && (
          <p className="text-center text-gray-600 mt-6">Showing first 50 of {filteredProducts.length} results</p>
        )}

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">How concurrent rendering helps:</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              • <strong>useTransition:</strong> Marks the search update as non-urgent, keeping input responsive
            </li>
            <li>
              • <strong>useDeferredValue:</strong> Provides a "lagging" version of the query for expensive operations
            </li>
            <li>• React prioritizes urgent updates (typing) over non-urgent ones (filtering)</li>
            <li>• The input never feels sluggish, even while processing thousands of items</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
