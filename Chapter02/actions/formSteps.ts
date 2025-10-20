"use server"

type FormDataShape = Record<string, any>

export async function validateStep(
  step: number,
  data: FormDataShape,
): Promise<{ success: boolean; errors?: Record<string, string> }> {
  // Simulate validation logic
  const errors: Record<string, string> = {}

  if (step === 1) {
    if (!data.name || (data.name as string).length < 2) {
      errors.name = "Name must be at least 2 characters"
    }
    if (!data.email || !(data.email as string).includes("@")) {
      errors.email = "Valid email is required"
    }
  }

  if (step === 2) {
    if (!data.address) {
      errors.address = "Address is required"
    }
    if (!data.city) {
      errors.city = "City is required"
    }
  }

  return Object.keys(errors).length > 0 ? { success: false, errors } : { success: true }
}

export async function submitCompleteForm(data: FormDataShape): Promise<{ success: boolean }> {
  // Simulate form submission
  console.log("Submitting complete form:", data)

  // In a real app, save to database here
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true }
}
