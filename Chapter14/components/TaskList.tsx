"use client"

import { type FC, useState } from "react"
import { TaskItem } from "./TaskItem"
import { TaskForm } from "./TaskForm"

interface Task {
  id: string
  title: string
  completed: boolean
}

export const TaskList: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    }
    setTasks((prev) => [...prev, newTask])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Manager</h1>
      <p className="text-gray-600 mb-6">
        {completedCount} of {totalCount} tasks completed
      </p>

      <TaskForm onSubmit={addTask} />

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No tasks yet. Add one above to get started!</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))}
        </div>
      )}
    </div>
  )
}
