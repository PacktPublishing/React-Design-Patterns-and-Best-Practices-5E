"use client"

import { useActionState, useEffect, useRef } from "react"
import { createProduct, type CreateProductState } from "@/actions/products"

const initialState: CreateProductState = { status: "idle" }

export default function ProductForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(createProduct, initialState)

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 rounded-lg border bg-card p-6"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Wireless headphones"
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-2">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="199.99"
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <input
            id="category"
            name="category"
            placeholder="electronics"
            defaultValue="electronics"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe the product"
          rows={3}
          required
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
          Image URL (optional)
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Create Product"}
      </button>

      {state.status === "error" && (
        <p className="text-sm text-destructive" role="status">
          {state.message}
        </p>
      )}
      {state.status === "success" && (
        <p className="text-sm text-emerald-600" role="status">
          {state.message}
        </p>
      )}
    </form>
  )
}
