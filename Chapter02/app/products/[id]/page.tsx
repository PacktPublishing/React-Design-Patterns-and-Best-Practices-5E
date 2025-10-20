interface ProductPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ variant?: string }>
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  // Await params and searchParams (Next.js 16 pattern)
  const { id } = await params
  const { variant } = await searchParams

  // Mock product data
  const product = {
    id,
    name: "Sample Product",
    price: 99.99,
    description: "This is a sample product description showcasing the new async params pattern in Next.js 16.",
    images: ["/placeholder.svg?height=400&width=400"],
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-primary mb-6">${product.price}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>
            {variant && <p className="text-sm text-muted-foreground">Selected variant: {variant}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
