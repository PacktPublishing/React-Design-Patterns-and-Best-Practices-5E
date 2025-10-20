"use server"

import { redirect } from "next/navigation"

type ContactData = {
  name: string
  email: string
  message: string
}

async function saveContactMessage(data: ContactData) {
  // Simulate saving to database
  console.log("Saving contact message:", data)
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    throw new Error("All fields are required")
  }

  try {
    await saveContactMessage({ name, email, message })
    redirect("/examples/contact/success")
  } catch (error) {
    console.error("Failed to submit form:", error)
    throw new Error("Failed to submit. Please try again.")
  }
}
