// Mock API route for posts
import { NextResponse } from "next/server"
import type { Post } from "@/types"

export async function GET() {
  const posts: Post[] = [
    {
      id: 1,
      title: "Getting Started with React 19",
      content: "React 19 introduces many new features...",
      authorId: 1,
    },
    {
      id: 2,
      title: "Advanced State Management",
      content: "Learn about the use hook and more...",
      authorId: 2,
    },
  ]

  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newPost: Post = {
    id: Date.now(),
    ...body,
  }

  return NextResponse.json(newPost)
}
