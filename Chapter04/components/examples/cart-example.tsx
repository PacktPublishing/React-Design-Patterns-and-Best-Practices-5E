// Zustand cart store example
"use client"

import { useCartStore } from "@/stores/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CartExample() {
  const { items, total, addItem, removeItem, updateQuantity, clearCart } = useCartStore()

  const sampleProducts = [
    { id: "1", name: "Product 1", price: 29.99 },
    { id: "2", name: "Product 2", price: 49.99 },
    { id: "3", name: "Product 3", price: 19.99 },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Zustand Cart Example</h2>

      <Card>
        <CardHeader>
          <CardTitle>Available Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sampleProducts.map((product) => (
            <div key={product.id} className="flex justify-between items-center p-2 bg-muted rounded">
              <span>
                {product.name} - ${product.price}
              </span>
              <Button onClick={() => addItem(product)} size="sm">
                Add to Cart
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Shopping Cart</CardTitle>
            <Button onClick={clearCart} variant="destructive" size="sm">
              Clear Cart
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {items.length === 0 ? (
            <p className="text-muted-foreground">Cart is empty</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-2">
                    <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} size="sm" variant="outline">
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} size="sm" variant="outline">
                      +
                    </Button>
                    <Button onClick={() => removeItem(item.id)} size="sm" variant="destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
