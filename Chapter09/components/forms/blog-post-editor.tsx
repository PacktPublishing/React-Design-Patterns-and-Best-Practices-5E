"use client"

import { useActionState } from "react"

interface PostState {
  success: boolean
  postId: string | null
}

async function createPost(prevState: PostState, formData: FormData): Promise<PostState> {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const tags = formData.getAll("tags") as string[]
  const image = formData.get("image") as File

  console.log("Creating post:", { title, content, tags, hasImage: image.size > 0 })

  return {
    success: true,
    postId: `post-${Date.now()}`,
  }
}

export function BlogPostEditor() {
  const [state, formAction] = useActionState(createPost, { success: false, postId: null })

  return (
    <form action={formAction} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Blog Post Editor (Server Actions)</h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Post Title
        </label>
        <input
          id="title"
          name="title"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your post title"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Write your post content..."
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-2">
          Featured Image
        </label>
        <input id="image" name="image" type="file" accept="image/*" className="w-full p-2 border rounded-lg" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex flex-wrap gap-2">
          {["React", "TypeScript", "Web Dev", "Tutorial"].map((tag) => (
            <label key={tag} className="flex items-center">
              <input type="checkbox" name="tags" value={tag} className="mr-1" />
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{tag}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Publish Post
      </button>

      {state.success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">Post created successfully! ID: {state.postId}</div>
      )}
    </form>
  )
}
