import { useLoaderData, Form, useActionData, Link } from "react-router-dom"
import type { BlogPost } from "../types"

interface LoaderData {
  posts: BlogPost[]
  totalPages: number
  currentPage: number
}

interface ActionData {
  success?: boolean
  message?: string
  error?: string
}

export function BlogPage() {
  const { posts, totalPages, currentPage } = useLoaderData() as LoaderData
  const actionData = useActionData() as ActionData

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p className="text-lg text-gray-600">Insights, tutorials, and updates from our team</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscribe to our newsletter</h2>
        <Form method="post" className="flex gap-4">
          <input type="hidden" name="intent" value="subscribe" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Subscribe
          </button>
        </Form>

        {actionData?.success && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800">{actionData.message}</p>
          </div>
        )}

        {actionData?.error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{actionData.error}</p>
          </div>
        )}
      </div>

      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>

            <p className="text-gray-600 leading-relaxed">{post.content.substring(0, 200)}...</p>

            <Link to={`/blog/${post.id}`} className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium">
              Read more →
            </Link>
          </article>
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            to={`/blog?page=${page}`}
            className={`px-4 py-2 rounded-md transition-colors ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>
    </div>
  )
}
