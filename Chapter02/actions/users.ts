"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(13).max(120),
})

export type CreateUserState = {
  status: "idle" | "success" | "error"
  message?: string
}

const initialCreateUserState: CreateUserState = { status: "idle" }

export async function createUser(
  prevState: CreateUserState = initialCreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  const name = (formData.get("name") as string | null)?.trim()
  const email = (formData.get("email") as string | null)?.trim().toLowerCase()

  if (!name || !email) {
    return { status: "error", message: "Name and email are required." }
  }

  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { status: "error", message: "This email is already registered." }
  }

  const user = await db.user.create({
    data: { name, email },
  })

  revalidatePath("/examples/user-form")

  return {
    status: "success",
    message: `${user.name} has been added successfully.`,
  }
}

export async function createUserWithValidation(
  formData: FormData,
): Promise<{ success: true; user: any } | { success: false; errors: any }> {
  try {
    const name = formData.get("name") as string | null
    const email = formData.get("email") as string | null
    const ageRaw = formData.get("age") as string | null

    if (!name || !email || !ageRaw) {
      throw new Error("Missing form data")
    }

    const validatedData = userSchema.parse({
      name,
      email,
      age: Number.parseInt(ageRaw, 10),
    })

    const user = await db.user.create({ data: validatedData })

    revalidatePath("/users")

    return { success: true, user }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten() }
    }
    throw error
  }
}

export async function updateUser(formData: FormData): Promise<{ user: any }> {
  const userId = formData.get("userId") as string
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  const user = await db.user.update({
    where: { id: userId },
    data: { name, email },
  })

  revalidatePath("/users")

  return { user }
}
