"use client"

import { useReducer, useState, type ChangeEvent, type FormEvent } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type Note = {
  id: number
  note: string
}

type Action = {
  type: string
  payload?: any
}

type ActionTypes = {
  ADD: "ADD"
  UPDATE: "UPDATE"
  DELETE: "DELETE"
}

const actionType: ActionTypes = {
  ADD: "ADD",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
}

const initialNotes: Note[] = [
  {
    id: 1,
    note: "Note 1",
  },
  {
    id: 2,
    note: "Note 2",
  },
]

const reducer = (state: Note[], action: Action) => {
  switch (action.type) {
    case actionType.ADD:
      return [...state, action.payload]

    case actionType.DELETE:
      return state.filter((note) => note.id !== action.payload)

    case actionType.UPDATE:
      const updatedNote = action.payload
      return state.map((n: Note) => (n.id === updatedNote.id ? updatedNote : n))

    default:
      return state
  }
}

const Notes = () => {
  const [notes, dispatch] = useReducer(reducer, initialNotes)
  const [note, setNote] = useState<string>("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!note.trim()) return

    const newNote = {
      id: Date.now(),
      note,
    }

    dispatch({ type: actionType.ADD, payload: newNote })
    setNote("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-block mb-8 text-primary hover:underline">
          ← Back to Home
        </Link>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Notes App</CardTitle>
              <CardDescription>Managing complex state with useReducer Hook</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  placeholder="New note"
                  value={note}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">Add Note</Button>
              </form>

              <div className="space-y-3">
                {notes.map((n: Note) => (
                  <div
                    key={n.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
                  >
                    <span className="flex-1">{n.note}</span>
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          dispatch({
                            type: actionType.UPDATE,
                            payload: { ...n, note: note || n.note },
                          })
                        }
                        variant="outline"
                        size="sm"
                        disabled={!note}
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => dispatch({ type: actionType.DELETE, payload: n.id })}
                        variant="destructive"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">useReducer Concepts:</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>
                      <strong>State:</strong> Managed by reducer function
                    </li>
                    <li>
                      <strong>Actions:</strong> ADD, UPDATE, DELETE
                    </li>
                    <li>
                      <strong>Dispatch:</strong> Triggers state updates
                    </li>
                    <li>
                      <strong>Reducer:</strong> Pure function that returns new state
                    </li>
                  </ul>
                </div>
                <div className="text-xs">
                  <Badge variant="outline">Total Notes: {notes.length}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Notes
