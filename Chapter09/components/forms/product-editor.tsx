"use client"

import type React from "react"

interface Product {
  name: string
  price: number
  categories: string[]
  specifications: {
    weight: number
    dimensions: {
      length: number
      width: number
      height: number
    }
  }
}

export function ProductEditor() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Build nested object from flat FormData
    const product: Product = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      categories: formData.getAll("categories") as string[],
      specifications: {
        weight: Number(formData.get("specs.weight")),
        dimensions: {
          length: Number(formData.get("specs.length")),
          width: Number(formData.get("specs.width")),
          height: Number(formData.get("specs.height")),
        },
      },
    }

    console.log("Structured product data:", product)
    alert("Product saved! Check console for data structure.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Product Editor (Complex Data)</h2>

      <div className="grid grid-cols-2 gap-4">
        <input name="name" placeholder="Product Name" required className="p-2 border rounded" />
        <input name="price" type="number" step="0.01" placeholder="Price" required className="p-2 border rounded" />
      </div>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold">Categories</legend>
        <label className="block">
          <input type="checkbox" name="categories" value="electronics" /> Electronics
        </label>
        <label className="block">
          <input type="checkbox" name="categories" value="computers" /> Computers
        </label>
        <label className="block">
          <input type="checkbox" name="categories" value="accessories" /> Accessories
        </label>
      </fieldset>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold">Specifications</legend>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="specs.weight"
            type="number"
            step="0.01"
            placeholder="Weight (kg)"
            className="p-2 border rounded"
          />
          <div className="grid grid-cols-3 gap-2">
            <input name="specs.length" type="number" placeholder="L" className="p-2 border rounded" />
            <input name="specs.width" type="number" placeholder="W" className="p-2 border rounded" />
            <input name="specs.height" type="number" placeholder="H" className="p-2 border rounded" />
          </div>
        </div>
      </fieldset>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Save Product
      </button>
    </form>
  )
}
