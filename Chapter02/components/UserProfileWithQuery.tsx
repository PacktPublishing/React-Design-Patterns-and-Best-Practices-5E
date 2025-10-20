"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "@/actions/users"
import { Button } from "@/components/ui/button"

type UserProfileProps = {
  userId: string
}

export default function UserProfile({ userId }: UserProfileProps) {
  const queryClient = useQueryClient()

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data: { user: any }) => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] })
      queryClient.setQueryData(["user", userId], data.user)
    },
    onError: (error: unknown) => {
      console.error("Update failed:", error)
    },
  })

  const handleSubmit = async (formData: FormData) => {
    formData.append("userId", userId)
    try {
      await updateUserMutation.mutateAsync(formData)
    } catch (error) {
      // Error handling
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-card rounded-lg border">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input id="name" name="name" placeholder="Name" className="w-full px-3 py-2 border rounded-md" />
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

      <Button type="submit" disabled={updateUserMutation.isPending} className="w-full">
        {updateUserMutation.isPending ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  )
}
