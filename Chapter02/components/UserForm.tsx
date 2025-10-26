"use client"

import { useActionState, useEffect, useRef } from "react"
import { createUser, type CreateUserState } from "@/actions/users"

const initialState: CreateUserState = { status: "idle" }

export default function UserForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(createUser, initialState)

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 max-w-md mx-auto p-6 bg-card rounded-lg border"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="John Doe"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Creating..." : "Create User"}
      </button>

      {state.status === "error" && (
        <p className="text-sm text-destructive" role="status">
          {state.message}
        </p>
      )}
      {state.status === "success" && (
        <p className="text-sm text-emerald-600" role="status">
          {state.message}
        </p>
      )}
    </form>
  )
}
