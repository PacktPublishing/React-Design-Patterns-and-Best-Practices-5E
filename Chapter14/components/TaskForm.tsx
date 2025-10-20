"use client"

import { type FC, type FormEvent, useState } from "react"

interface TaskFormProps {
  onSubmit: (title: string) => void
}

export const TaskForm: FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setError("Task title cannot be empty")
      return
    }

    if (trimmedTitle.length < 3) {
      setError("Task title must be at least 3 characters")
      return
    }

    onSubmit(trimmedTitle)
    setTitle("")
    setError("")
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setError("")
            }}
            placeholder="Enter a new task..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Task title"
            aria-invalid={!!error}
            aria-describedby={error ? "task-error" : undefined}
          />
          {error && (
            <p id="task-error" className="mt-1 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </div>
    </form>
  )
}
