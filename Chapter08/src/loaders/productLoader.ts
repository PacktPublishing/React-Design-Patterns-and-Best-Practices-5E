import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom"
import { mockApi } from "../api/mockApi"

export async function productLoader({ params }: LoaderFunctionArgs) {
  const productId = params.id

  if (!productId) {
    throw new Response("Product ID is required", { status: 400 })
  }

  try {
    const product = await mockApi.getProduct(productId)
    return product
  } catch (error) {
    throw new Response("Product not found", { status: 404 })
  }
}

export async function productAction({ params, request }: ActionFunctionArgs) {
  const productId = params.id!
  const formData = await request.formData()

  const rating = Number(formData.get("rating"))
  const comment = formData.get("comment") as string

  if (!rating || !comment) {
    return { error: "Rating and comment are required" }
  }

  try {
    const review = await mockApi.submitReview(productId, rating, comment)
    return { success: true, review }
  } catch (error) {
    return { error: "Failed to submit review. Please try again." }
  }
}
