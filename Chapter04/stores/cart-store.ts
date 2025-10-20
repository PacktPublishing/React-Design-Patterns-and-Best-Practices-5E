// Zustand shopping cart store
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type { CartItem } from "@/types"

interface CartStore {
  items: CartItem[]
  total: number
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        total: 0,
        addItem: (item) =>
          set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id)

            if (existingItem) {
              return {
                items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
                total: state.total + item.price,
              }
            }

            return {
              items: [...state.items, { ...item, quantity: 1 }],
              total: state.total + item.price,
            }
          }),
        removeItem: (id) =>
          set((state) => {
            const item = state.items.find((i) => i.id === id)
            if (!item) return state

            return {
              items: state.items.filter((i) => i.id !== id),
              total: state.total - item.price * item.quantity,
            }
          }),
        updateQuantity: (id, quantity) =>
          set((state) => {
            if (quantity <= 0) {
              return state
            }

            const item = state.items.find((i) => i.id === id)
            if (!item) return state

            const quantityDiff = quantity - item.quantity

            return {
              items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
              total: state.total + item.price * quantityDiff,
            }
          }),
        clearCart: () => set({ items: [], total: 0 }),
      }),
      {
        name: "cart-storage",
      },
    ),
  ),
)
