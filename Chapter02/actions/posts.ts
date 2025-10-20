"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

export async function toggleFavorite(
  postId: string,
  isFavorited: boolean,
): Promise<{ success: boolean; isFavorited: boolean; favoriteCount: number }> {
  const updatedPost = await db.post.update({
    where: { id: postId },
    data: {
      favoriteCount: isFavorited ? { decrement: 1 } : { increment: 1 },
    },
  })

  revalidatePath("/posts")

  return {
    success: true,
    isFavorited: !isFavorited,
    favoriteCount: updatedPost.favoriteCount,
  }
}

export async function updatePost(postId: string, formData: FormData): Promise<{ success: true; post: any }> {
  const title = formData.get("title") as string | null
  const content = formData.get("content") as string | null

  const updatedPost = await db.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      updatedAt: new Date(),
    },
  })

  // Tag-based cache invalidation
  revalidatePath("/posts")
  revalidatePath(`/posts/${postId}`)

  return { success: true, post: updatedPost }
}
