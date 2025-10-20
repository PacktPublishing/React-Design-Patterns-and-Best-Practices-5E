"use client"

import { useOptimistic, useActionState } from "react"

interface Todo {
  id: string
  text: string
  completed: boolean
  pending?: boolean
}

async function addTodo(todos: Todo[], formData: FormData): Promise<Todo[]> {
  const text = formData.get("todo") as string

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
  }

  return [...todos, newTodo]
}

export function TodoList({ initialTodos = [] }: { initialTodos?: Todo[] }) {
  const [todos, formAction] = useActionState(addTodo, initialTodos)
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, (state: Todo[], newTodo: string) => [
    ...state,
    {
      id: "temp-" + Date.now(),
      text: newTodo,
      completed: false,
      pending: true,
    },
  ])

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Todo List (Optimistic UI)</h2>

      <form
        action={async (formData) => {
          const todo = formData.get("todo") as string
          addOptimisticTodo(todo)
          await formAction(formData)
        }}
        className="flex gap-2 mb-4"
      >
        <input type="text" name="todo" required placeholder="Add a todo..." className="flex-1 p-2 border rounded-lg" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className={`p-3 rounded-lg border ${todo.pending ? "opacity-50 bg-gray-50" : "bg-white"}`}>
            {todo.text}
            {todo.pending && <span className="ml-2 text-sm text-gray-500">(adding...)</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
