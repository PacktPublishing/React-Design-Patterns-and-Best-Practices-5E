"use server"

export async function sendMessage(formData: FormData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const email = formData.get("email")
  const message = formData.get("message")

  console.log("Sending message from:", email)
  console.log("Message:", message)

  return { success: true }
}
