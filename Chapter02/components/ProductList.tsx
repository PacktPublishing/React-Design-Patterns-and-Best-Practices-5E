import { db } from "@/lib/db"
import type { Product, Review } from "@prisma/client"
import { Card } from "@/components/ui/card"

type ProductWithReviews = Product & {
  reviews: Review[]
}

type ProductListProps = {
  category: string
}

export default async function ProductList({ category }: ProductListProps) {
  const products: ProductWithReviews[] = await db.product.findMany({
    where: { category },
    include: { reviews: true },
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="p-4">
          <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
            {product.images[0] && (
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
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
