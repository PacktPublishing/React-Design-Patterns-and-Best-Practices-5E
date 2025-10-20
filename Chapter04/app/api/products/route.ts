// Mock API route for products
import { NextResponse } from "next/server"
import type { Product } from "@/types"

export async function GET() {
  const products: Product[] = [
    {
      id: "1",
      name: "Laptop",
      price: 999.99,
      category: "electronics",
      description: "High-performance laptop",
      inventory: 10,
    },
    {
      id: "2",
      name: "T-Shirt",
      price: 29.99,
      category: "clothing",
      description: "Comfortable cotton t-shirt",
      inventory: 50,
    },
    {
      id: "3",
      name: "Book",
      price: 19.99,
      category: "books",
      description: "Bestselling novel",
      inventory: 30,
    },
  ]

  return NextResponse.json(products)
}
