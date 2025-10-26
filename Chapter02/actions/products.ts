"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

export type CreateProductState = {
  status: "idle" | "success" | "error"
  message?: string
}

const initialState: CreateProductState = { status: "idle" }

export async function createProduct(
  prevState: CreateProductState = initialState,
  formData: FormData,
): Promise<CreateProductState> {
  const name = (formData.get("name") as string | null)?.trim()
  const description = (formData.get("description") as string | null)?.trim()
  const priceRaw = (formData.get("price") as string | null)?.trim()
  const category = (formData.get("category") as string | null)?.trim() || "general"
  const imageUrl = (formData.get("imageUrl") as string | null)?.trim()

  if (!name || !description || !priceRaw) {
    return { status: "error", message: "Name, description, and price are required." }
  }

  const price = Number.parseFloat(priceRaw)

  if (Number.isNaN(price) || price <= 0) {
    return { status: "error", message: "Please enter a valid price greater than zero." }
  }

  await db.product.create({
    data: {
      name,
      description,
      price,
      category,
      images: imageUrl ? [imageUrl] : [],
    },
  })

  revalidatePath("/examples/products")

  return { status: "success", message: `${name} was created successfully.` }
}
