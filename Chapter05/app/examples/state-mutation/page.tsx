"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2, Trash2 } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

// Anti-pattern: Directly mutating state
const TodoListBad: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build an app", completed: false },
  ])
  const [newTodo, setNewTodo] = useState("")

  const toggleTodoBad = (id: number) => {
    // This mutates the existing array and objects
    const todo = todos.find((t) => t.id === id)
    if (todo) {
      todo.completed = !todo.completed // Direct mutation!
      setTodos(todos) // Same reference, no re-render
    }
  }

  const addTodoBad = (text: string) => {
    if (!text.trim()) return
    // This mutates the existing array
    todos.push({ id: Date.now(), text, completed: false })
    setTodos(todos) // Same reference, no re-render
    setNewTodo("")
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a todo..."
          onKeyDown={(e) => e.key === "Enter" && addTodoBad(newTodo)}
        />
        <Button onClick={() => addTodoBad(newTodo)}>Add</Button>
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodoBad(todo.id)} />
            <span className={todo.completed ? "line-through text-muted-foreground" : ""}>{todo.text}</span>
          </div>
        ))}
      </div>
      <Badge variant="destructive">UI may not update correctly due to mutations</Badge>
    </div>
  )
}

// Best practice: Immutable state updates
const TodoListGood: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build an app", completed: false },
  ])
  const [newTodo, setNewTodo] = useState("")

  const toggleTodo = (id: number) => {
    // Create a new array with updated objects
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const addTodo = (text: string) => {
    if (!text.trim()) return
    // Create a new array with the new item
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), text, completed: false }])
    setNewTodo("")
  }

  const removeTodo = (id: number) => {
    // Create a new array without the removed item
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const updateTodoText = (id: number, newText: string) => {
    // Complex updates remain immutable
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a todo..."
          onKeyDown={(e) => e.key === "Enter" && addTodo(newTodo)}
        />
        <Button onClick={() => addTodo(newTodo)}>Add</Button>
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
            <span className={todo.completed ? "line-through text-muted-foreground" : ""}>{todo.text}</span>
            <Button variant="ghost" size="sm" onClick={() => removeTodo(todo.id)} className="ml-auto">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Badge variant="default">UI updates correctly with immutable state</Badge>
    </div>
  )
}

export default function StateMutationPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Direct State Mutation</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Direct state mutation violates React's core principle of immutability, leading to components that don't
            re-render when they should.
          </p>
        </div>

        <Tabs defaultValue="bad" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bad">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Anti-Pattern
            </TabsTrigger>
            <TabsTrigger value="good">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Best Practice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bad">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="destructive">Anti-Pattern</Badge>
                  Direct State Mutation
                </CardTitle>
                <CardDescription>
                  Mutating state directly prevents React from detecting changes. Try toggling todos - they may not
                  update visually!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TodoListBad />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="good">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Best Practice</Badge>
                  Immutable State Updates
                </CardTitle>
                <CardDescription>
                  Creating new arrays and objects ensures React detects changes and triggers re-renders appropriately.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TodoListGood />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• React uses Object.is() comparison to detect state changes</p>
            <p>• Always create new arrays/objects when updating state</p>
            <p>• Use spread operator (...) or array methods like map, filter</p>
            <p>• Never use push, pop, splice, or direct property assignment on state</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
