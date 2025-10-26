import CommentList from "@/components/CommentList"
import { db } from "@/lib/db"

async function ensureDefaultPost(userId: string) {
  const existingPost = await db.post.findFirst({
    where: { title: "Getting Started with Comments" },
  })

  if (existingPost) {
    return existingPost
  }

  return db.post.create({
    data: {
      title: "Getting Started with Comments",
      content: "This demo post is created automatically so you can try the comments form.",
      category: "general",
      authorId: userId,
    },
  })
}

export default async function CommentsPage() {
  const users = await db.user.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true },
  })

  if (users.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold mb-2">Comments Demo</h1>
          <p className="text-muted-foreground">
            Create a user from the User Form example to start posting comments.
          </p>
        </div>
      </div>
    )
  }

  const defaultPost = await ensureDefaultPost(users[0].id)

  const comments = await db.comment.findMany({
    where: { postId: defaultPost.id },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  })

  const formattedComments = comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    author: comment.user.name,
    createdAt: comment.createdAt.toISOString(),
  }))

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Comments Demo</h1>
        <p className="text-muted-foreground mb-8">
          Optimistic UI updates with useOptimistic hook
        </p>
        <CommentList comments={formattedComments} users={users} postId={defaultPost.id} />
      </div>
    </div>
  )
}
