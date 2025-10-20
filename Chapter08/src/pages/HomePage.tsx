import { useLoaderData, Link } from "react-router-dom"

export function HomePage() {
  const { message } = useLoaderData() as { message: string }

  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{message}</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore the power of React Router 7 with server-side rendering, advanced data loading, and more.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/products/1" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
            View Products
          </Link>
          <Link
            to="/blog"
            className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-50 font-medium"
          >
            Read Blog
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-3xl mb-3">🚀</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Server-Side Rendering</h3>
          <p className="text-gray-600">Built-in SSR support for better SEO and faster initial page loads.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Data Loading</h3>
          <p className="text-gray-600">Powerful loaders and actions for efficient data fetching and mutations.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Type-Safe Routing</h3>
          <p className="text-gray-600">Full TypeScript support with type-safe route parameters and loaders.</p>
        </div>
      </div>
    </div>
  )
}
