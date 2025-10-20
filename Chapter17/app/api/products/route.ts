import { NextResponse } from "next/server"

// Mock product data
const products = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 299,
    image: "/premium-headphones.png",
    category: "electronics",
  },
  {
    id: "2",
    name: "Leather Wallet",
    price: 89,
    image: "/leather-wallet.jpg",
    category: "accessories",
  },
  {
    id: "3",
    name: "Smart Watch",
    price: 399,
    image: "/smartwatch-lifestyle.png",
    category: "electronics",
  },
  {
    id: "4",
    name: "Designer Sunglasses",
    price: 199,
    image: "/designer-sunglasses.png",
    category: "accessories",
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    price: 179,
    image: "/wireless-earbuds.png",
    category: "electronics",
  },
  {
    id: "6",
    name: "Canvas Backpack",
    price: 129,
    image: "/canvas-backpack.png",
    category: "accessories",
  },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json(products)
}
