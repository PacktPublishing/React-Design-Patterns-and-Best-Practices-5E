import CommentList from "@/components/CommentList"

export default function CommentsPage() {
  // Mock data - in a real app, fetch from database
  const mockComments = [
    {
      id: "1",
      content: "Great article! Very informative.",
      author: "Alice Johnson",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      content: "Thanks for sharing this.",
      author: "Bob Smith",
      createdAt: new Date().toISOString(),
    },
  ]

  const currentUser = {
    id: "user-123",
    name: "Current User",
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Comments Demo</h1>
        <p className="text-muted-foreground mb-8">Optimistic UI updates with useOptimistic hook</p>
        <CommentList comments={mockComments} currentUser={currentUser} postId="post-123" />
      </div>
    </div>
  )
}
