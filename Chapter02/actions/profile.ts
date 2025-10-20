"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

export async function updateProfile(formData: FormData): Promise<{ success: boolean; profile: any }> {
  const userId = formData.get("userId")
  const bio = formData.get("bio")

  if (!userId) {
    throw new Error("User ID is required")
  }

  const preferences = {
    newsletter: formData.get("newsletter") === "on",
    notifications: formData.get("notifications") === "on",
  }

  const updatedProfile = await db.profile.update({
    where: { userId: userId as string },
    data: {
      bio: bio as string | null,
      preferences,
    },
  })

  revalidatePath("/profile")

  return { success: true, profile: updatedProfile }
}
