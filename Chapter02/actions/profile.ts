"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

export async function updateProfile(
  formData: FormData,
): Promise<{ success: boolean; profile: any }> {
  const email = formData.get("email") as string
  const bio = formData.get("bio") as string | null
  const name = (formData.get("name") as string | null)?.trim()

  if (!email) {
    throw new Error("Email is required")
  }

  const user = await db.user.findUnique({
    where: { email: email },
  })

  if (!user) {
    throw new Error("User not found with this email")
  }

  if (name && name !== user.name) {
    await db.user.update({
      where: { id: user.id },
      data: { name },
    })
  }

  const preferences = {
    newsletter: formData.get("newsletter") === "on",
    notifications: formData.get("notifications") === "on",
  }

  const updatedProfile = await db.profile.upsert({
    where: { userId: user.id },
    update: {
      bio,
      preferences,
    },
    create: {
      userId: user.id,
      bio,
      preferences,
    },
  })

  revalidatePath("/examples/profile-form")

  return { success: true, profile: updatedProfile }
}
