import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { users } from "@/db/schema"

interface ProviderProfile {
  email: string
  name?: string
  image?: string
  emailVerified?: boolean
}

export async function syncProviderProfile(userId: string, provider: string, profile: ProviderProfile) {
  const updateData: Partial<{
    name: string
    image: string
    emailVerified: Date | null
  }> = {}

  if (profile.name) updateData.name = profile.name
  if (profile.image) updateData.image = profile.image
  if (profile.emailVerified) updateData.emailVerified = new Date()

  if (Object.keys(updateData).length > 0) {
    await db.update(users).set(updateData).where(eq(users.id, userId))
  }
}

export async function normalizeOAuthProfile(provider: string, rawProfile: any): Promise<ProviderProfile> {
  switch (provider) {
    case "github":
      return {
        email: rawProfile.email,
        name: rawProfile.name || rawProfile.login,
        image: rawProfile.avatar_url,
        emailVerified: true,
      }

    case "google":
      return {
        email: rawProfile.email,
        name: rawProfile.name,
        image: rawProfile.picture,
        emailVerified: rawProfile.email_verified,
      }

    default:
      return {
        email: rawProfile.email,
        name: rawProfile.name,
        image: rawProfile.image,
        emailVerified: false,
      }
  }
}

export async function mergeProfileData(
  existingUser: {
    name?: string | null
    image?: string | null
    emailVerified?: Date | null
  },
  newProfile: ProviderProfile,
) {
  return {
    name: newProfile.name ?? existingUser.name ?? null,
    image: newProfile.image ?? existingUser.image ?? null,
    emailVerified: newProfile.emailVerified ? new Date() : (existingUser.emailVerified ?? null),
  }
}
