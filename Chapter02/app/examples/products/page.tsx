import ProductList from "@/components/ProductList"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Products</h1>
      <p className="text-muted-foreground mb-8">Server Components with automatic caching</p>

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category="electronics" />
      </Suspense>
    </div>
  )
}
