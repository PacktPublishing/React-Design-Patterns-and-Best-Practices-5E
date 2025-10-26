"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(13).max(120),
});

export async function createUser(
  formData: FormData
): Promise<{ success: boolean; user: any }> {
  console.log("formData", formData);
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;

  // Server-side validation
  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  // Database operation
  const user = await db.user.create({
    data: { name, email },
  });

  revalidatePath("/users");

  return { success: true, user };
}

export async function createUserWithValidation(
  formData: FormData
): Promise<
  | { success: true; user: any }
  | { success: false; errors: ReturnType<typeof userSchema.flatten> }
> {
  try {
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const ageRaw = formData.get("age") as string | null;

    if (!name || !email || !ageRaw) {
      throw new Error("Missing form data");
    }

    const validatedData = userSchema.parse({
      name,
      email,
      age: Number.parseInt(ageRaw, 10),
    });

    const user = await db.user.create({ data: validatedData });

    revalidatePath("/users");

    return { success: true, user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten() };
    }
    throw error;
  }
}

export async function updateUser(formData: FormData): Promise<{ user: any }> {
  const userId = formData.get("userId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const user = await db.user.update({
    where: { id: userId },
    data: { name, email },
  });

  revalidatePath("/users");

  return { user };
}
