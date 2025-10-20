"use server"

import { cookies } from "next/headers"
import { db } from "@/lib/db"

export async function addToCart(productId: string, quantity: number) {
  // Await cookies access
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_id")?.value

  if (!userId) {
    return { error: "Not authenticated" }
  }

  // In a real app, you'd have a Cart model
  // For now, we'll create an order
  const order = await db.order.create({
    data: {
      userId,
      total: 0, // Calculate based on product price
      items: {
        create: {
          productId,
          quantity,
          price: 0, // Get from product
        },
      },
    },
  })

  return { success: true, order }
}

export async function getCartCount() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_id")?.value

  if (!userId) return 0

  const count = await db.order.count({
    where: { userId },
  })

  return count
}
