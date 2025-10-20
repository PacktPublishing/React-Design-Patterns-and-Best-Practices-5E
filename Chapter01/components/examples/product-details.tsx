import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

type Props = {
  product: Product
}

export default function ProductDetails({ product }: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-auto rounded-lg"
        />
      </CardContent>
    </Card>
  )
}
