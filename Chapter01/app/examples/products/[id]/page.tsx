import ProductDetails from "@/components/examples/product-details";
import LikeButton from "@/components/examples/like-button";
import RelatedProducts from "@/components/examples/related-products";
import CustomerReviews from "@/components/examples/customer-reviews";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

async function fetchProduct(id: string): Promise<Product> {
  // Simulate database query
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id,
    name: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with active noise cancellation and 30-hour battery life.",
    price: 299.99,
    image: "/wireless-headphones.png",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(id);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Product Page</h1>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <ProductDetails product={product} />
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-muted-foreground mb-4">
                {product.description}
              </p>
              <p className="text-3xl font-bold mb-6">${product.price}</p>
              <LikeButton productId={product.id} />
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <RelatedProducts productId={product.id} />
          <CustomerReviews productId={product.id} />
        </div>
      </div>
    </div>
  );
}
