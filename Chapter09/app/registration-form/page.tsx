import { RegistrationForm } from "@/components/forms/registration-form"
import Link from "next/link"

export default function RegistrationFormPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Link href="/" className="block text-center text-blue-600 hover:underline mb-4">
        ← Back to Examples
      </Link>
      <RegistrationForm />
    </div>
  )
}
