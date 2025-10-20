"use client"

import { createUser } from "@/actions/users"

export default function UserForm() {
  return (
    <form action={createUser} className="space-y-4 max-w-md mx-auto p-6 bg-card rounded-lg border">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input id="name" name="name" placeholder="John Doe" required className="w-full px-3 py-2 border rounded-md" />
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
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Create User
      </button>
    </form>
  )
}
