"use server"

import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { db } from "@/lib/db"
import { projects } from "@/db/schema"
import { and, eq } from "drizzle-orm"

const projectSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
})

function fdString(v: FormDataEntryValue | null): string | undefined {
  if (v == null) return undefined
  return typeof v === "string" ? v : (v as File).name
}

export async function createProject(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const rawData = {
    name: fdString(formData.get("name")),
    description: fdString(formData.get("description")),
  }

  const validatedData = projectSchema.parse(rawData)

  const inserted = await db
    .insert(projects)
    .values({
      ...validatedData,
      userId: session.user.id,
    })
    .returning({ id: projects.id })

  const project = inserted[0]
  if (!project) {
    throw new Error("Failed to create project")
  }

  revalidatePath("/dashboard")
  return { success: true, projectId: project.id }
}

export async function updateProject(projectId: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const rawData = {
    name: fdString(formData.get("name")),
    description: fdString(formData.get("description")),
  }

  const validatedData = projectSchema.parse(rawData)

  const updated = await db
    .update(projects)
    .set(validatedData)
    .where(and(eq(projects.id, projectId), eq(projects.userId, session.user.id)))
    .returning({ id: projects.id })

  if (updated.length === 0) {
    throw new Error("Forbidden")
  }

  revalidatePath("/dashboard")
  revalidatePath(`/projects/${projectId}`)
  return { success: true }
}

export async function deleteProject(projectId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const deleted = await db
    .delete(projects)
    .where(and(eq(projects.id, projectId), eq(projects.userId, session.user.id)))
    .returning({ id: projects.id })

  if (deleted.length === 0) {
    throw new Error("Forbidden")
  }

  revalidatePath("/dashboard")
  return { success: true }
}
