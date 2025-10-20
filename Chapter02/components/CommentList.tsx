"use client"

import { useOptimistic } from "react"
import { addComment } from "@/actions/comments"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Comment = {
  id: string
  content: string
  author: string
  createdAt: string
  pending?: boolean
}

type CommentListProps = {
  comments: Comment[]
  currentUser: { name: string; id: string }
  postId: string
}

function Comment({ comment, isPending }: { comment: Comment; isPending: boolean }) {
  return (
    <Card className={`p-4 ${isPending ? "opacity-50" : ""}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="font-semibold">{comment.author}</span>
        <span className="text-sm text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="text-sm">{comment.content}</p>
      {isPending && <span className="text-xs text-muted-foreground mt-2 block">Posting...</span>}
    </Card>
  )
}

export default function CommentList({ comments, currentUser, postId }: CommentListProps) {
  const [optimisticComments, addOptimisticComment] = useOptimistic<Comment[], Comment>(
    comments,
    (state, newComment) => [...state, newComment],
  )

  async function handleAddComment(formData: FormData) {
    const content = formData.get("content") as string

    if (!content) return

    const optimisticComment: Comment = {
      id: `temp-${Date.now()}`,
      content,
      author: currentUser.name,
      createdAt: new Date().toISOString(),
      pending: true,
    }

    addOptimisticComment(optimisticComment)

    // Add hidden fields to formData
    formData.append("postId", postId)
    formData.append("userId", currentUser.id)
    formData.append("author", currentUser.name)

    try {
      await addComment(formData)
    } catch (error) {
      console.error("Failed to add comment:", error)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <div className="space-y-3">
        {optimisticComments.map((comment) => (
          <Comment key={comment.id} comment={comment} isPending={comment.pending ?? false} />
        ))}
      </div>

      <form action={handleAddComment} className="mt-6">
        <textarea
          name="content"
          placeholder="Add a comment..."
          rows={3}
          className="w-full px-3 py-2 border rounded-md mb-2"
          required
        />
        <Button type="submit">Post Comment</Button>
      </form>
    </div>
  )
}
