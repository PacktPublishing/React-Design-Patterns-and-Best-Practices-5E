"use client"

import { useState } from "react"
import ThemeSwitcher from "@/components/theme-switcher"
import Card from "@/components/ui/enhanced-card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { AccessibleModal } from "@/components/ui/accessible-modal"
import { AccessibleDropdown } from "@/components/ui/accessible-dropdown"
import { EnhancedProductCard } from "@/components/ui/product-card"
import { NotificationSystem } from "@/components/ui/notification-system"
import { designTokens } from "@/lib/design-tokens"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const dropdownOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3", disabled: true },
    { value: "option4", label: "Option 4" },
  ]

  const sampleProduct = {
    id: "1",
    image: "/premium-headphones.png",
    title: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.5,
    reviews: 128,
    inStock: true,
  }

  const handleAddToCart = async (productId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Added to cart:", productId)
  }

  const handleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className={designTokens.spacing.section}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className={designTokens.typography.heading}>Design System Showcase</h1>
            <ThemeSwitcher />
          </div>

          {/* Cards Section */}
          <section className={designTokens.spacing.loose}>
            <h2 className={designTokens.typography.subheading}>Card Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card variant="default">
                <h3 className="font-semibold mb-2">Default Card</h3>
                <p className={designTokens.typography.body}>This is a default card with shadow and hover effects.</p>
              </Card>
              <Card variant="outlined">
                <h3 className="font-semibold mb-2">Outlined Card</h3>
                <p className={designTokens.typography.body}>This card has a transparent background with border.</p>
              </Card>
              <Card variant="filled">
                <h3 className="font-semibold mb-2">Filled Card</h3>
                <p className={designTokens.typography.body}>This card has a filled background with inner shadow.</p>
              </Card>
            </div>
          </section>

          {/* Buttons Section */}
          <section className={designTokens.spacing.loose}>
            <h2 className={designTokens.typography.subheading}>Button Variants</h2>
            <div className="flex flex-wrap gap-4 mt-6">
              <EnhancedButton variant="default">Default</EnhancedButton>
              <EnhancedButton variant="destructive">Destructive</EnhancedButton>
              <EnhancedButton variant="outline">Outline</EnhancedButton>
              <EnhancedButton variant="secondary">Secondary</EnhancedButton>
              <EnhancedButton variant="ghost">Ghost</EnhancedButton>
              <EnhancedButton variant="link">Link</EnhancedButton>
              <EnhancedButton variant="gradient">Gradient</EnhancedButton>
              <EnhancedButton loading loadingText="Processing...">
                Loading
              </EnhancedButton>
            </div>
          </section>

          {/* Dialog Section */}
          <section className={designTokens.spacing.loose}>
            <h2 className={designTokens.typography.subheading}>Dialog Component</h2>
            <div className="mt-6">
              <Dialog>
                <DialogTrigger>
                  <EnhancedButton>Open Dialog</EnhancedButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>
                      This is a compound component dialog with proper accessibility.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Dialog content goes here. This component demonstrates the compound component pattern.
                    </p>
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <EnhancedButton variant="outline">Cancel</EnhancedButton>
                    </DialogClose>
                    <DialogClose>
                      <EnhancedButton>Confirm</EnhancedButton>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </section>

          {/* Accessible Modal Section */}
          <section className={designTokens.spacing.loose}>
            <h2 className={designTokens.typography.subheading}>Accessible Modal</h2>
            <div className="mt-6">
              <EnhancedButton onClick={() => setIsModalOpen(true)}>Open Accessible Modal</EnhancedButton>
              <AccessibleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Accessible Modal">
                <p className="text-gray-600 dark:text-gray-300">
                  This modal includes proper focus management, keyboard navigation, and ARIA attributes.
                </p>
              </AccessibleModal>
            </div>
          </section>

          {/* Dropdown Section */}
          <section className={designTokens.spacing.loose}>
            <h2 className={designTokens.typography.subheading}>Accessible Dropdown</h2>
            <div className="mt-6 max-w-xs">
              <AccessibleDropdown
                options={dropdownOptions}
                value={selectedValue}
                placeholder="Select an option"
                onChange={setSelectedValue}
              />
              {selectedValue && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Selected: {selectedValue}</p>
              )}
            </div>
          </section>

          {/* Product Card Section */}
          <section className={designTokens.spacing.loose}>
            <h2 className={designTokens.typography.subheading}>Product Card</h2>
            <div className="mt-6 max-w-sm">
              <EnhancedProductCard
                product={sampleProduct}
                onAddToCart={handleAddToCart}
                onFavorite={handleFavorite}
                isFavorited={favorites.has(sampleProduct.id)}
              />
            </div>
          </section>

          {/* Notification System */}
          <NotificationSystem />
        </div>
      </div>
    </main>
  )
}
