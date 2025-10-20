"use client"

import { type FC, useState, useEffect, useMemo, useCallback, type ChangeEvent, memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export type Todo = {
  id: number
  task: string
}

const initialTodos: Todo[] = [
  { id: 1, task: "Go shopping" },
  { id: 2, task: "Pay the electricity bill" },
]

// Memoized Task component
const Task: FC<{ id: number; task: string; handleDelete: (id: number) => void }> = memo(
  ({ id, task, handleDelete }) => {
    useEffect(() => {
      console.log("Rendering <Task />", task)
    })

    return (
      <li className="flex items-center justify-between p-3 bg-muted rounded-lg">
        <span>{task}</span>
        <Button onClick={() => handleDelete(id)} variant="destructive" size="sm">
          X
        </Button>
      </li>
    )
  },
)

Task.displayName = "Task"

// Memoized List component
const List: FC<{ todoList: Todo[]; handleDelete: (id: number) => void }> = memo(({ todoList, handleDelete }) => {
  useEffect(() => {
    console.log("Rendering <List />")
  })

  return (
    <ul className="space-y-2">
      {todoList.map((todo: Todo) => (
        <Task key={todo.id} id={todo.id} task={todo.task} handleDelete={handleDelete} />
      ))}
    </ul>
  )
})

List.displayName = "List"

const TodoPage: FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>(initialTodos)
  const [task, setTask] = useState<string>("")
  const [term, setTerm] = useState("")

  useEffect(() => {
    console.log("Rendering <App />")
  })

  const handleCreate = () => {
    const newTodo = {
      id: Date.now(),
      task,
    }

    setTodoList([...todoList, newTodo])
    setTask("")
  }

  const handleSearch = () => {
    setTerm(task)
  }

  // Memoized delete function with useCallback
  const handleDelete = useCallback(
    (taskId: number) => {
      const newTodoList = todoList.filter((todo: Todo) => todo.id !== taskId)
      setTodoList(newTodoList)
    },
    [todoList],
  )

  // Memoized filtered list with useMemo
  const filteredTodoList = useMemo(
    () =>
      todoList.filter((todo: Todo) => {
        console.log("Filtering...")
        return todo.task.toLowerCase().includes(term.toLowerCase())
      }),
    [term, todoList],
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-block mb-8 text-primary hover:underline">
          ← Back to Home
        </Link>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Todo List</CardTitle>
              <CardDescription>
                Demonstrating memo, useMemo, and useCallback for performance optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={task}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
                    placeholder="Enter a task..."
                    className="flex-1"
                  />
                  <Button onClick={handleCreate}>Create</Button>
                  <Button onClick={handleSearch} variant="secondary">
                    Search
                  </Button>
                </div>

                {term && (
                  <div className="text-sm text-muted-foreground">
                    Searching for: <span className="font-semibold">{term}</span>
                  </div>
                )}

                <List todoList={filteredTodoList} handleDelete={handleDelete} />
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Performance Optimizations:</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>
                      <strong>memo:</strong> Memoizes Task and List components
                    </li>
                    <li>
                      <strong>useMemo:</strong> Memoizes filtered todo list calculation
                    </li>
                    <li>
                      <strong>useCallback:</strong> Memoizes handleDelete function
                    </li>
                  </ul>
                </div>
                <div className="text-xs text-muted-foreground">💡 Open browser console to see render logs</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TodoPage
