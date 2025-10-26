"use client"

import { useFormStatus } from "react-dom"
import { useMemo } from "react"
import { updateProfile } from "@/actions/profile"
import { Loader2 } from "lucide-react"

type ProfileFormProps = {
  users: { id: string; name: string; email: string }[]
}

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

export default function ProfileForm({ users }: ProfileFormProps) {
  const hasUsers = users.length > 0
  const defaultEmail = useMemo(() => users[0]?.email ?? "", [users])

  async function handleSubmit(formData: FormData) {
    await updateProfile(formData)
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-6 bg-card rounded-lg border"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Full Name"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Select User Email
        </label>
        <select
          id="email"
          name="email"
          defaultValue={defaultEmail}
          disabled={!hasUsers}
          className="w-full px-3 py-2 border rounded-md bg-background"
          required
        >
          <option value="" disabled>
            {hasUsers ? "Choose an email" : "Create a user first"}
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.email}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          placeholder="Bio"
          rows={4}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <SubmitButton />
    </form>
  )
}
