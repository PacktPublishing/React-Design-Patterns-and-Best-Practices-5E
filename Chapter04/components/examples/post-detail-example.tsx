// Advanced async state patterns with use hook
"use client"

import { use, useState, Suspense, useCallback } from "react"
import type { Post, Author, Comment } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PostDetailProps {
  postId: number
}

function PostDetail({ postId }: PostDetailProps) {
  const [showComments, setShowComments] = useState(false)

  const postPromise = useCallback(
    () =>
      Promise.resolve({
        id: postId,
        title: "Understanding React 19",
        content: "React 19 introduces powerful new features...",
        authorId: 1,
      } as Post),
    [postId],
  )

  const post = use(postPromise())

  const authorPromise = useCallback(
    () =>
      Promise.resolve({
        id: post.authorId,
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      } as Author),
    [post.authorId],
  )

  const author = use(authorPromise())

  const commentsPromise = useCallback(
    () =>
      showComments
        ? Promise.resolve([
            { id: 1, content: "Great article!", authorId: 2, postId },
            { id: 2, content: "Very informative", authorId: 3, postId },
          ] as Comment[])
        : Promise.resolve([]),
    [postId, showComments],
  )

  const comments = use(commentsPromise())

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <img src={author.avatar || "/placeholder.svg"} alt={author.name} className="w-8 h-8 rounded-full" />
          <span className="text-sm text-muted-foreground">By {author.name}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{post.content}</p>
        <Button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </Button>
        {showComments && (
          <div className="space-y-2 mt-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-3 bg-muted rounded-lg">
                {comment.content}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function PostDetailExample() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Advanced Async Patterns</h2>
      <Suspense fallback={<div className="text-muted-foreground">Loading post...</div>}>
        <PostDetail postId={1} />
      </Suspense>
    </div>
  )
}
