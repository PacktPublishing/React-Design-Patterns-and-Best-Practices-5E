"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { likeProduct } from "@/lib/actions/products"

type Props = {
  productId: string
}

export default function LikeButton({ productId }: Props) {
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      await likeProduct(productId)
      setLiked(true)
    } catch (error) {
      console.error("Failed to like product:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading || liked}
      variant={liked ? "default" : "outline"}
      className="w-full"
    >
      <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-current" : ""}`} />
      {liked ? "Liked!" : "Like this product"}
    </Button>
  )
}
