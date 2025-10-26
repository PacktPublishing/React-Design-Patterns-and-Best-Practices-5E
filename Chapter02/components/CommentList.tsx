"use client"

import { useEffect, useMemo, useOptimistic, useRef, useState } from "react"
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

type UserOption = {
  id: string
  name: string
  email: string
}

type CommentListProps = {
  comments: Comment[]
  users: UserOption[]
  postId: string
}

function Comment({ comment, isPending }: { comment: Comment; isPending: boolean }) {
  return (
    <Card className={`p-4 ${isPending ? "opacity-50" : ""}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="font-semibold">{comment.author}</span>
        <span className="text-sm text-muted-foreground">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm">{comment.content}</p>
      {isPending && <span className="text-xs text-muted-foreground mt-2 block">Posting...</span>}
    </Card>
  )
}

export default function CommentList({ comments, users, postId }: CommentListProps) {
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id ?? "")
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (users.length > 0 && !users.find((user) => user.id === selectedUserId)) {
      setSelectedUserId(users[0]?.id ?? "")
    }
  }, [users, selectedUserId])

  const [optimisticComments, addOptimisticComment] = useOptimistic<Comment[], Comment>(
    comments,
    (state, newComment) => [...state, newComment],
  )

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [users, selectedUserId],
  )

  async function handleAddComment(formData: FormData) {
    const content = formData.get("content") as string

    if (!content || !selectedUser) return

    const optimisticComment: Comment = {
      id: `temp-${Date.now()}`,
      content,
      author: selectedUser.name,
      createdAt: new Date().toISOString(),
      pending: true,
    }

    addOptimisticComment(optimisticComment)

    formData.append("postId", postId)
    formData.append("userId", selectedUser.id)
    formData.append("author", selectedUser.name)

    try {
      await addComment(formData)
      formRef.current?.reset()
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
        {optimisticComments.length === 0 && (
          <Card className="p-4 text-sm text-muted-foreground">No comments yet.</Card>
        )}
      </div>

      <form ref={formRef} action={handleAddComment} className="mt-6 space-y-3">
        <div>
          <label htmlFor="comment-user" className="block text-sm font-medium mb-2">
            Comment as
          </label>
          <select
            id="comment-user"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(event.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background"
            disabled={users.length === 0}
            required
            name="comment-user"
          >
            <option value="" disabled>
              {users.length === 0 ? "Create a user first" : "Select a user"}
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <textarea
          name="content"
          placeholder="Add a comment..."
          rows={3}
          className="w-full px-3 py-2 border rounded-md"
          required
          disabled={users.length === 0}
        />
        <Button type="submit" disabled={users.length === 0}>
          Post Comment
        </Button>
      </form>
    </div>
  )
}
