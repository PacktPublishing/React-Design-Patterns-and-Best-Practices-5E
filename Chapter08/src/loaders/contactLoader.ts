import { type ActionFunctionArgs, redirect } from "react-router-dom"
import { mockApi } from "../api/mockApi"

export async function contactLoader() {
  const [departments] = await Promise.all([mockApi.getDepartments()])

  return {
    departments,
    settings: {
      enableNotifications: true,
      responseTime: "24 hours",
    },
  }
}

export async function contactAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const contactData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    department: formData.get("department") as string,
  }

  const errors: Record<string, string> = {}

  if (!contactData.name || contactData.name.length < 2) {
    errors.name = "Name must be at least 2 characters long"
  }

  if (!contactData.email || !contactData.email.includes("@")) {
    errors.email = "Please enter a valid email address"
  }

  if (!contactData.subject || contactData.subject.length < 5) {
    errors.subject = "Subject must be at least 5 characters long"
  }

  if (!contactData.message || contactData.message.length < 10) {
    errors.message = "Message must be at least 10 characters long"
  }

  if (!contactData.department) {
    errors.department = "Please select a department"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: contactData }
  }

  try {
    await mockApi.submitContact(contactData)
    return redirect("/contact/success")
  } catch (error) {
    return {
      errors: { general: "Failed to submit form. Please try again." },
      values: contactData,
    }
  }
}
