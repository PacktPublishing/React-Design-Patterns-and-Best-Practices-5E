"use client"

import type React from "react"

import { useState, useMemo, useCallback, memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  category: string
}

const sampleProducts: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.random() * 100 + 10,
  category: ["Electronics", "Clothing", "Food", "Books"][Math.floor(Math.random() * 4)],
}))

// Anti-pattern: No memoization
const ProductListBad: React.FC<{ products: Product[] }> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "price">("name")
  const [computeCount, setComputeCount] = useState(0)

  // Expensive work on every render - even unrelated state changes
  const processedProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return a.price - b.price
    })
    .map((product) => {
      // Simulate expensive computation
      setComputeCount((c) => c + 1)
      return {
        ...product,
        formattedPrice: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price),
      }
    })

  // New function instance every render
  const handleProductClick = (productId: number) => {
    console.log(`Clicked product ${productId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search products..." />
        <Button onClick={() => setSortBy(sortBy === "name" ? "price" : "name")} variant="outline">
          Sort by {sortBy === "name" ? "Price" : "Name"}
        </Button>
      </div>
      <Badge variant="destructive">Computations: {computeCount} (Runs on every render!)</Badge>
      <div className="grid gap-2 max-h-96 overflow-auto">
        {processedProducts.slice(0, 10).map((product) => (
          <div
            key={product.id}
            className="p-3 border rounded cursor-pointer hover:bg-muted/50"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="text-muted-foreground">{product.formattedPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Best practice: Strategic memoization
const ProductListGood: React.FC<{ products: Product[] }> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "price">("name")
  const [computeCount, setComputeCount] = useState(0)

  // Expensive computation only runs when inputs actually change
  const processedProducts = useMemo(() => {
    return products
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name)
        return a.price - b.price
      })
      .map((product) => {
        setComputeCount((c) => c + 1)
        return {
          ...product,
          formattedPrice: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.price),
        }
      })
  }, [products, searchTerm, sortBy])

  // Stable function reference prevents child re-renders
  const handleProductClick = useCallback((productId: number) => {
    console.log(`Clicked product ${productId}`)
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={searchTerm} onChange={handleSearchChange} placeholder="Search products..." />
        <Button onClick={() => setSortBy(sortBy === "name" ? "price" : "name")} variant="outline">
          Sort by {sortBy === "name" ? "Price" : "Name"}
        </Button>
      </div>
      <Badge variant="default">Computations: {computeCount} (Only when needed!)</Badge>
      <div className="grid gap-2 max-h-96 overflow-auto">
        {processedProducts.slice(0, 10).map((product) => (
          <ProductCard key={product.id} product={product} onClick={handleProductClick} />
        ))}
      </div>
    </div>
  )
}

const ProductCard = memo<{
  product: Product & { formattedPrice: string }
  onClick: (id: number) => void
}>(({ product, onClick }) => {
  return (
    <div className="p-3 border rounded cursor-pointer hover:bg-muted/50" onClick={() => onClick(product.id)}>
      <div className="flex justify-between">
        <span className="font-medium">{product.name}</span>
        <span className="text-muted-foreground">{product.formattedPrice}</span>
      </div>
    </div>
  )
})

ProductCard.displayName = "ProductCard"

export default function MemoizationPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Memoization Strategies</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Missing memoization for expensive computations transforms smooth interactions into stuttering experiences.
          </p>
        </div>

        <Tabs defaultValue="bad" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bad">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Anti-Pattern
            </TabsTrigger>
            <TabsTrigger value="good">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Best Practice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bad">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="destructive">Anti-Pattern</Badge>
                  No Memoization
                </CardTitle>
                <CardDescription>
                  Watch the computation counter increase rapidly as you type. Every keystroke recalculates everything.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductListBad products={sampleProducts} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="good">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Best Practice</Badge>
                  Strategic Memoization
                </CardTitle>
                <CardDescription>
                  Computations only run when search term or sort order changes. Much more efficient!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductListGood products={sampleProducts} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• Use useMemo for expensive computations that depend on specific values</p>
            <p>• Use useCallback for functions passed to memoized child components</p>
            <p>• Don't over-memoize - simple computations don't need memoization</p>
            <p>• Combine React.memo with useMemo/useCallback for maximum efficiency</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
