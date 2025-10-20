"use client"

import type { FC } from "react"

interface Task {
  id: string
  title: string
  completed: boolean
}

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TaskItem: FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          aria-label={`Toggle ${task.title}`}
        />
        <span className={`text-lg ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
          {task.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </div>
  )
}
