import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

type Review = {
  id: string
  author: string
  rating: number
  text: string
  date: string
}

async function fetchProductReviews(productId: string): Promise<Review[]> {
  // Simulate database query
  await new Promise((resolve) => setTimeout(resolve, 400))

  return [
    {
      id: "1",
      author: "Sarah Johnson",
      rating: 5,
      text: "Amazing sound quality! The noise cancellation is top-notch.",
      date: "2024-01-15",
    },
    {
      id: "2",
      author: "Mike Chen",
      rating: 4,
      text: "Great headphones, very comfortable for long listening sessions.",
      date: "2024-01-10",
    },
  ]
}

export default async function CustomerReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{review.author}</CardTitle>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <CardDescription>{new Date(review.date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{review.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
