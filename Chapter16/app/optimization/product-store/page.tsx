"use client"

import type React from "react"

import { useState, useMemo, useCallback, memo } from "react"

interface Product {
  id: string
  name: string
  price: number
  category: string
}

interface FilteredProductListProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

const FilteredProductList: React.FC<FilteredProductListProps> = memo(({ products, onProductClick }) => {
  console.log("ProductList rendered")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onProductClick(product)}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition-shadow"
        >
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600">{product.category}</p>
          <p className="text-xl font-bold mt-2">${product.price}</p>
        </div>
      ))}
    </div>
  )
})

FilteredProductList.displayName = "FilteredProductList"

export default function ProductStorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const allProducts: Product[] = [
    { id: "1", name: "Laptop Pro", price: 1299, category: "Electronics" },
    { id: "2", name: "Wireless Mouse", price: 29, category: "Electronics" },
    { id: "3", name: "Office Chair", price: 299, category: "Furniture" },
    { id: "4", name: "Standing Desk", price: 599, category: "Furniture" },
    { id: "5", name: "Mechanical Keyboard", price: 149, category: "Electronics" },
    { id: "6", name: 'Monitor 27"', price: 399, category: "Electronics" },
    { id: "7", name: "Desk Lamp", price: 79, category: "Furniture" },
    { id: "8", name: "Bookshelf", price: 199, category: "Furniture" },
  ]

  const filteredProducts = useMemo(() => {
    console.log("Filtering products...")
    return allProducts.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const handleProductClick = useCallback((product: Product) => {
    console.log("Product clicked:", product.name)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Product Store - useMemo & useCallback</h1>
        <p className="text-gray-600 mb-8">
          This example demonstrates useMemo for expensive calculations and useCallback for stable function references.
          Check the console to see when filtering occurs.
        </p>

        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        <FilteredProductList products={filteredProducts} onProductClick={handleProductClick} />

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Optimization techniques used:</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              • <strong>useMemo:</strong> Caches the filtered products, recalculating only when dependencies change
            </li>
            <li>
              • <strong>useCallback:</strong> Maintains a stable function reference for the click handler
            </li>
            <li>
              • <strong>React.memo:</strong> Prevents FilteredProductList from re-rendering when props are unchanged
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
