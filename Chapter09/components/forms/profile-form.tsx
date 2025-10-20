"use client"

import { useActionState } from "react"

interface FormState {
  message?: string
  errors?: Record<string, string>
}

async function updateProfile(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get("name") as string
  const bio = formData.get("bio") as string

  // Validation happens on the server
  if (!name || name.length < 2) {
    return {
      errors: { name: "Name must be at least 2 characters" },
    }
  }

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // Server-side database update would happen here
    console.log("Updating profile:", { name, bio })
    return { message: "Profile updated successfully!" }
  } catch (error) {
    return {
      errors: { general: "Failed to update profile" },
    }
  }
}

export function ProfileForm() {
  const [state, formAction] = useActionState(updateProfile, { message: undefined, errors: undefined })

  return (
    <form action={formAction} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Profile Form (useActionState)</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          name="bio"
          placeholder="Tell us about yourself"
          className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {state.message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{state.message}</div>}

      <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Update Profile
      </button>
    </form>
  )
}
