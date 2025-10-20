import { type NextRequest, NextResponse } from "next/server"

// Mock product data (same as in route.ts)
const products = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 299,
    image: "/premium-headphones.png",
    category: "electronics",
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: "2",
    name: "Leather Wallet",
    price: 89,
    image: "/leather-wallet.jpg",
    category: "accessories",
    description: "Genuine leather wallet with RFID protection",
  },
  {
    id: "3",
    name: "Smart Watch",
    price: 399,
    image: "/smartwatch-lifestyle.png",
    category: "electronics",
    description: "Feature-rich smartwatch with health tracking",
  },
  {
    id: "4",
    name: "Designer Sunglasses",
    price: 199,
    image: "/designer-sunglasses.png",
    category: "accessories",
    description: "UV protection sunglasses with polarized lenses",
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    price: 179,
    image: "/wireless-earbuds.png",
    category: "electronics",
    description: "True wireless earbuds with premium sound quality",
  },
  {
    id: "6",
    name: "Canvas Backpack",
    price: 129,
    image: "/canvas-backpack.png",
    category: "accessories",
    description: "Durable canvas backpack with laptop compartment",
  },
]

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}
