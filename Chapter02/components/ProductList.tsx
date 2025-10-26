import { db } from "@/lib/db"
import type { Product, Review } from "@prisma/client"
import { Card } from "@/components/ui/card"

type ProductWithReviews = Product & {
  reviews: Review[]
}

type ProductListProps = {
  category?: string
}

export default async function ProductList({ category }: ProductListProps) {
  const products: ProductWithReviews[] = await db.product.findMany({
    where: category ? { category } : undefined,
    include: { reviews: true },
    orderBy: { createdAt: "desc" },
  })

  if (products.length === 0) {
    return (
      <Card className="p-6 text-center text-sm text-muted-foreground">
        No products available yet. Use the form above to add one.
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="p-4">
          <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden flex items-center justify-center">
            {product.images[0] ? (
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm text-muted-foreground">No image provided</span>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">${product.price}</span>
            <span className="text-sm text-muted-foreground">{product.reviews.length} reviews</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
