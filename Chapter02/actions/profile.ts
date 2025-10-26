"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function updateProfile(
  formData: FormData
): Promise<{ success: boolean; profile: any }> {
  const email = formData.get("email") as string;
  const bio = formData.get("bio") as string | null;

  if (!email) {
    throw new Error("Email is required");
  }

  // Find the user by email
  const user = await db.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("User not found with this email");
  }

  const preferences = {
    newsletter: formData.get("newsletter") === "on",
    notifications: formData.get("notifications") === "on",
  };

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
  });

  revalidatePath("/profile");

  return { success: true, profile: updatedProfile };
}
