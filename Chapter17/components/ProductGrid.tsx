"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [filter, setFilter] = useState<string>("all")

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter)

  const categories = ["all", ...new Set(products.map((p) => p.category))]

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === cat ? "bg-blue-600 text-white shadow-lg" : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group bg-white rounded-lg shadow-sm hover:shadow-xl 
                     transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative h-48 bg-slate-100">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform 
                         duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-slate-900 mb-2">{product.name}</h3>
              <p className="text-blue-600 font-bold">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
