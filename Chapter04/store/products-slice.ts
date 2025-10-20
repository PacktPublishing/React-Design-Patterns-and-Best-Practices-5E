// Redux Toolkit products slice with async thunks
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types"

interface ProductState {
  items: Product[]
  loading: boolean
  error: string | null
}

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk<Product[]>("products/fetch", async () => {
  const response = await fetch("/api/products")
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
})

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  } as ProductState,
  reducers: {
    updateInventory: (
      state,
      action: PayloadAction<{
        productId: string
        quantity: number
      }>,
    ) => {
      const product = state.items.find((p) => p.id === action.payload.productId)
      if (product) {
        product.inventory = action.payload.quantity
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch"
      })
  },
})

export const { updateInventory } = productsSlice.actions
export default productsSlice.reducer
