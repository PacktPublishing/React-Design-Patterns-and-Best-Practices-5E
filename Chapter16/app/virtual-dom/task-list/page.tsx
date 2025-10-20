"use client"

import type React from "react"

import { useState } from "react"

interface Task {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
}

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const getPriorityColor = (priority: Task["priority"]) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }
    return colors[priority]
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <input type="checkbox" checked={task.completed} className="w-5 h-5 text-blue-600" readOnly />
            <span className={task.completed ? "line-through text-gray-400" : "text-gray-900"}>{task.title}</span>
          </div>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function TaskListPage() {
  const [tasks] = useState<Task[]>([
    { id: "1", title: "Complete project documentation", completed: false, priority: "high" },
    { id: "2", title: "Review pull requests", completed: true, priority: "medium" },
    { id: "3", title: "Update dependencies", completed: false, priority: "low" },
    { id: "4", title: "Fix critical bug", completed: false, priority: "high" },
    { id: "5", title: "Write unit tests", completed: true, priority: "medium" },
  ])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Task List - Key Prop Importance</h1>
        <p className="text-gray-600 mb-8">
          This example demonstrates the importance of the key prop in lists. Keys help React identify which items have
          changed, been added, or removed.
        </p>

        <TaskList tasks={tasks} />

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Why keys matter:</h3>
          <p className="text-sm text-gray-700 mb-2">
            The key prop isn't just a formality—it's critical for performance. When a task's completed status changes,
            React can identify exactly which DOM element corresponds to that task and update only that element, rather
            than recreating the entire list.
          </p>
          <p className="text-sm text-gray-700">
            Without proper keys, React would have to re-render all items in the list, which becomes expensive with large
            datasets.
          </p>
        </div>
      </div>
    </div>
  )
}
