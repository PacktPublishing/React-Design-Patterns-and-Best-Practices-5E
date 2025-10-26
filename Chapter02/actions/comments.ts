"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

export async function addComment(formData: FormData): Promise<{ success: boolean; comment: any }> {
  const content = formData.get("content") as string
  const postId = formData.get("postId") as string
  const userId = formData.get("userId") as string
  const author = formData.get("author") as string

  if (!content || !postId || !userId) {
    throw new Error("Missing required fields")
  }

  const comment = await db.comment.create({
    data: {
      content,
      author,
      postId,
      userId,
    },
  })

  revalidatePath(`/examples/comments`)

  return { success: true, comment }
}
