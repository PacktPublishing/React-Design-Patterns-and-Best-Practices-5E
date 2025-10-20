"use client"

import { useFormStatus } from "react-dom"
import { updateProfile } from "@/actions/profile"
import { Loader2 } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center px-4 py-2 rounded bg-primary text-primary-foreground ${
        pending ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Saving...
        </>
      ) : (
        "Save Changes"
      )}
    </button>
  )
}

export default function ProfileForm({ userId }: { userId: string }) {
  return (
    <form action={updateProfile} className="space-y-4 max-w-md mx-auto p-6 bg-card rounded-lg border">
      <input type="hidden" name="userId" value={userId} />

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <input id="name" name="name" placeholder="Full Name" className="w-full px-3 py-2 border rounded-md" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium mb-2">
          Bio
        </label>
        <textarea id="bio" name="bio" placeholder="Bio" rows={4} className="w-full px-3 py-2 border rounded-md" />
      </div>

      <SubmitButton />
    </form>
  )
}
