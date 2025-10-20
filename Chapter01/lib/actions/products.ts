"use server"

export async function likeProduct(productId: string) {
  // Simulate server-side logic to record the like
  console.log("Liking product:", productId)
  await new Promise((resolve) => setTimeout(resolve, 500))
}
