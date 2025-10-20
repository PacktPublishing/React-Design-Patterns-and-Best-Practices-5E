"use server"

import { db } from "@/lib/db"
import type { Product, Review, Variant } from "@prisma/client"

type ProductWithDetails = Product & {
  reviews: Review[]
  variants: Variant[]
}

export async function getProductData(productId: string): Promise<ProductWithDetails | null> {
  "use cache"

  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      reviews: true,
      variants: true,
    },
  })

  return product
}

type DateRange = {
  start: Date
  end: Date
}

type ProductAnalytics = {
  _sum: { total: number | null }
  _count: { id: number }
}

export async function getProductAnalytics(dateRange: DateRange): Promise<ProductAnalytics> {
  "use cache"

  const analytics = await db.order.aggregate({
    where: {
      createdAt: {
        gte: dateRange.start,
        lte: dateRange.end,
      },
    },
    _sum: { total: true },
    _count: { id: true },
  })

  return analytics
}
