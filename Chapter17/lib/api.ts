const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

interface ApiProduct {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export async function getProducts(): Promise<ApiProduct[]> {
  try {
    const res = await fetch(`${API_URL}/products`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!res.ok) throw new Error("Failed to fetch products")

    return res.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProduct(id: string): Promise<ApiProduct | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return null

    return res.json()
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    return null
  }
}
