import { TodoList } from "@/components/forms/todo-list"
import Link from "next/link"

export default function TodoListPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Link href="/" className="block text-center text-blue-600 hover:underline mb-4">
        ← Back to Examples
      </Link>
      <TodoList />
    </div>
  )
}
