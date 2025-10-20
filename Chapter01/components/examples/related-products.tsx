import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Product = {
  id: string
  name: string
  price: number
}

async function fetchRelatedProducts(productId: string): Promise<Product[]> {
  // Simulate database query
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [
    { id: "2", name: "Wireless Earbuds", price: 149.99 },
    { id: "3", name: "Bluetooth Speaker", price: 199.99 },
    { id: "4", name: "USB-C Cable", price: 19.99 },
  ]
}

export default async function RelatedProducts({ productId }: { productId: string }) {
  const products = await fetchRelatedProducts(productId)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xl font-bold">${product.price}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
