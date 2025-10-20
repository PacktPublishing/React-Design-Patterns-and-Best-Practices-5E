import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom"
import { mockApi } from "../api/mockApi"

export async function blogLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const page = Number.parseInt(url.searchParams.get("page") || "1", 10)

  const { posts, totalPages } = await mockApi.getBlogPosts(page)

  return {
    posts,
    totalPages,
    currentPage: page,
  }
}

export async function blogAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")

  if (intent === "subscribe") {
    const email = formData.get("email") as string

    if (!email || !email.includes("@")) {
      return { error: "Valid email is required" }
    }

    try {
      await mockApi.subscribeNewsletter(email)
      return { success: true, message: "Successfully subscribed!" }
    } catch {
      return { error: "Failed to subscribe" }
    }
  }

  return { error: "Invalid action" }
}
