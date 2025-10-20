import { Suspense } from "react"
import ProductGrid from "@/components/ProductGrid"
import Hero from "@/components/Hero"
import { getProducts } from "@/lib/api"

export const metadata = {
  title: "Modern Store - Quality Products",
  description: "Discover our curated collection of premium products",
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero />
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid products={products} />
      </Suspense>
    </main>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-slate-200 animate-pulse h-64 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
